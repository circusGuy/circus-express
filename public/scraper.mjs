import puppeteer from "puppeteer";
import fs from "fs";
import { format } from "path";

const HOME_LINK =
  "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/archived-items/ECUFJ46U6WBV74PK5YWMRHTJ";

async function get_links() {
  let links = [];

  // const browser = await puppeteer.launch();
  // Uncomment the line below to run in non-headless mode for debugging
  // Displays browser window
    const browser = await puppeteer.launch({headless: false});

  const page = await browser.newPage();

  await page.goto(HOME_LINK);

  await page.waitForSelector(".category-page-grid a");

  const items = await page.$$(".category-page-grid a");
  for (let i of items) {
    const textContent = (
      await (await i.getProperty("textContent")).jsonValue()
    ).trim();

    const pattern =
      /^(\d{1,2}\/\d{1,2})\s–\s(\d{1,2}\/\d{1,2}):\s([\w\s'.-]+),\s([A-Z]{2})$/;

    if (pattern.test(textContent)) {
      const href = (await (await i.getProperty("href")).jsonValue()).split(
        "?"
      )[0];
      links.push(href);
    }
  }

  await page.close();
  await browser.close();
  return links;
}

async function scrape_address(address_link, addressPage) {
  await addressPage.goto(address_link);
  await addressPage.waitForSelector(".text-component.w-product-description");

  const product_description = await addressPage.$$(
    `.text-component.w-product-description p`
  );

  let toggle_loc = false;
  let address = [];

  for (let i of product_description) {
    const textContent = await (await i.getProperty("textContent")).jsonValue();
    if (textContent === "Event Location") {
      toggle_loc = true;
      continue;
    }

    if (toggle_loc) {
      const cleanedText = textContent.replace("📍", "").trim();
      if (cleanedText !== "") {
        address.push(cleanedText);
      }
    }
  }

  return address;
}

async function scrape_showtimes(date_link, page, addressPage, first) {
  let showtimes = [];
  let address = [];

  await page.goto(date_link);

  await page.waitForSelector(".content-grid");

  const items = await page.$$(".content-grid a");
  for (let i of items) {
    const textContent = await (await i.getProperty("textContent")).jsonValue();

    if (first) {
      const href = await (await i.getProperty("href")).jsonValue();
      address = await scrape_address(href, addressPage);
    }

    const match = textContent.match(/\b\d{1,2}:\d{2}\s?(?:AM|PM)\b/i);
    const time = match ? match[0] : null;

    if (time !== null) {
      showtimes.push(time);
    }
  }
  
  return { times: showtimes, address: address };
}

async function scrape_location(show_link) {
  let shows = [];

  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  const timePage = await browser.newPage();
  const addressPage = await browser.newPage();

  await page.goto(show_link);

  let show_address = [];

  await page.waitForSelector(".content-grid");

  const items = await page.$$(".content-grid a");
  let first = true;
  for (let i of items) {
    const textContent = await (await i.getProperty("textContent")).jsonValue();

    const href = await (await i.getProperty("href")).jsonValue();

    const rawDate = textContent.split(" – ")[0] || "";
    const rawLocation = textContent.split(" – ")[1] || "";

    const date = rawDate.replace(/\s+/g, " ").trim();
    const location = rawLocation.replace(/\s+/g, " ").trim();

    const { times, address } = await scrape_showtimes(
      href,
      timePage,
      addressPage,
      first
    );

    if (address.length > 0) {
      show_address = address;
    }

    if (first) {
      first = false;
    }

    const show = {
      name: location,
      address: show_address,
      date: date,
      times: times,
      link: href,
    };

    if (show.name !== "") {
      shows.push(show);
    }
  }

await timePage.close();
await addressPage.close();
await page.close();
await browser.close();

  return shows;
}

// Helper function to get the ordinal suffix
function getOrdinalSuffix(day) {
    if (day === 1 || day === 21 || day === 31) return `${day}st`;
    if (day === 2 || day === 22) return `${day}nd`;
    if (day === 3 || day === 23) return `${day}rd`;
    return `${day}th`;
}

function formatTimes(times) {
    if (times.length === 0) return "";
    if (times.length === 1) return times[0];
    
    // Extract the shared "AM" or "PM" suffix
    const suffix = times[0].split(" ")[1];
    
    // Remove the "AM" or "PM" part from each time
    const strippedTimes = times.map(time => time.split(" ")[0]);
    
    // Join the times with commas and an ampersand before the last one
    return strippedTimes.slice(0, -1).join(", &nbsp;") + "&nbsp; &amp; &nbsp;" + strippedTimes.slice(-1) + " " + suffix;
}

const all_links = await get_links();
let all_shows = [];

for (let link of all_links) {
  try {
    let shows = await scrape_location(link);

    const location = shows[0].name;
    const final_address = shows[0].address;
    const currentYear = new Date().getFullYear();

    shows = shows.map((s) => ({
      date: s.date,
      weekday: new Date(s.date + `, ${currentYear}`).toLocaleDateString('en-US', { weekday: 'short' }),
      formattedTimes: formatTimes(s.times),
      times: s.times,
      link: s.link.split('?')[0],
    }));

    console.log(shows);

    const date_range = shows[0].date + " – " + shows[shows.length - 1].date;

    const startDate = new Date(shows[0].date + ", " + currentYear);
    const endDate = new Date(shows[shows.length - 1].date + ", " + currentYear);

    const date_range_text = `${startDate.toLocaleString('default', { month: 'long' })} ${getOrdinalSuffix(startDate.getDate())} – ${getOrdinalSuffix(endDate.getDate())}`;

    // // Extract the shared "PM" suffix
    // const suffix = shows.times[0].split(" ")[1];

    // // Remove the "PM" part from each time
    // const strippedTimes = shows.times.map(time => time.split(" ")[0]);

    // // Join the times with commas and an ampersand before the last one
    // const formattedTimes = strippedTimes.slice(0, -1).join(", ") + "&nbsp;&amp;&nbsp;" + strippedTimes.slice(-1) + " " + suffix;



    const s = {
      name: location,
      link: link.split('?')[0],
      date_range: date_range,
      date_range_text: date_range_text,
      // formattedTimes: formattedTimes,
      address: final_address,
      shows: shows,
    };

    all_shows.push(s);
  } catch (e) {
    console.error("shows missing or error");
    continue;
  }
}

fs.writeFileSync("./public/locations.json", JSON.stringify(all_shows, null, 2));
