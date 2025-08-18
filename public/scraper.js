import puppeteer from "puppeteer";
import fs from "fs";

const HOME_LINK =
  "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/archived-items/ECUFJ46U6WBV74PK5YWMRHTJ?page=1&limit=30&sort_by=category_order&sort_order=asc&location_id=11efc7a10d854581bd5e3cecef6dbaf0";

async function get_links() {
  let links = [];

  const browser = await puppeteer.launch();
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

  const browser = await puppeteer.launch();
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

const all_links = await get_links();
let all_shows = [];

for (let link of all_links) {
  try {
    let shows = await scrape_location(link);

    const location = shows[0].name;
    const final_address = shows[0].address;

    shows = shows.map((s) => ({
      date: s.date,
      times: s.times,
      link: s.link,
    }));

    console.log(shows);

    const date_range = shows[0].date + " – " + shows[shows.length - 1].date;

    const s = {
      location: location,
      date_range: date_range,
      address: final_address,
      shows: shows,
    };

    all_shows.push(s);
  } catch (e) {
    console.error("shows missing or error");
    continue;
  }
}

fs.writeFileSync("locations.json", JSON.stringify(all_shows, null, 2));
