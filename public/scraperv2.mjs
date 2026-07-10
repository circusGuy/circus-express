import dotenv from "dotenv";
import fs from "fs";
import { fromZonedTime } from "date-fns-tz";
import tzlookup from "tz-lookup";
import NodeGeocoder from "node-geocoder";

const startTime = new Date();

dotenv.config();

const TZDB_API_KEY = process.env.TIMEZONE_DB;
const accessToken = process.env.SQUARE_ACCESS_TOKEN;

const geocoder = NodeGeocoder({
  provider: "openstreetmap",
});

async function getLatLng(city, state) {
  const res = await geocoder.geocode(`${city}, ${state}`);

  if (!res.length) {
    throw new Error(`No results for ${city}, ${state}`);
  }

  const lat = res[0].latitude;
  const lng = res[0].longitude;

  console.log(lat, lng);

  return { lat, lng }; // ✅ already numbers
}
const timezoneCache = {};

async function getTimezone(city, state) {
  const key = `${city},${state}`.toLowerCase();

  // ✅ if already in cache (promise OR resolved), reuse it
  if (timezoneCache[key]) {
    console.log(`Using cached timezone for ${key}:`, timezoneCache[key]);
    return timezoneCache[key];
  }

  // 🔥 store promise immediately (prevents parallel duplicates)
  timezoneCache[key] = (async () => {
    try {
      const { lat, lng } = await getLatLng(city, state);

      if (
        typeof lat !== "number" ||
        typeof lng !== "number" ||
        isNaN(lat) ||
        isNaN(lng)
      ) {
        console.warn(`Invalid coords for ${key}:`, lat, lng);
        return null;
      }

      const tz = tzlookup(lat, lng);
      console.log(`Resolved timezone for ${key}: ${tz}`);
      return tz;
    } catch (err) {
      console.warn(`Failed timezone for ${key}:`, err.message);
      return null;
    }
  })();

  return timezoneCache[key];
}

function createUTCDate(localDateString, timeZone) {
  return fromZonedTime(localDateString, timeZone);
}

const url = "https://connect.squareup.com/v2/catalog/list";

let allData = [];
let cursor = null;

const response = await fetch(
  "https://connect.squareup.com/v2/catalog/list?types=category",
  {
    method: "GET",
    headers: {
      "Square-Version": "2026-05-20",
      Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  },
);

const buildParentMap = (categories) => {
  return categories.reduce((map, item) => {
    const id = item.id;
    const parentId =
      item?.category_data?.parent_category?.id ||
      item?.category_data?.name ||
      null;

    map[id] = parentId;
    return map;
  }, {});
};

const parentData = await response.json();
const parentMap = buildParentMap(parentData.objects);

console.log("Parent category map:", parentMap);
function formatDate(input) {
  const date = new Date(input);

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}

function formatTimes(times) {
  let timeString = "";
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    if (i > 0) {
      timeString += "&nbsp; &amp; &nbsp;";
    }
    timeString += time;
  }
  timeString += "<hr />";
  return timeString;
}

function getOrdinalSuffix(date) {
  const datePrefix = date.split(" ")[0].substring(0, 3);
  const day = parseInt(date.split(" ")[1]);

  if (day === 1 || day === 21 || day === 31) return `${datePrefix} ${day}st`;
  if (day === 2 || day === 22) return `${datePrefix} ${day}nd`;
  if (day === 3 || day === 23) return `${datePrefix} ${day}rd`;
  return `${datePrefix} ${day}th`;
}

function transform_item(item) {
  const day_time = item.time.split(", ");
  const weekday = day_time[0];
  const time = day_time[1];

  const address = item.description
    .split("Event Location (link)\n")[1]
    .split("\n");

  return {
    name: item.name,
    date: item.date,
    time: time,
    weekday: weekday.substring(0, 3),
    id: item.categories[0].id,
    category_id: parentMap[item.categories[0].id] || null,
    address: address,
  };
}

function truncate_item(item) {
  const name_data = item.item_data.name.split(" – ");

  const location_name = name_data[0];
  const date = name_data[1];
  const time = name_data[2];

  const city_state = location_name.split(", ");
  const city = city_state[0];
  const state = city_state[1];

  const timeOnly = time?.split(", ")[1] || null; // "6:00 PM"

  const dateReference = new Date(`${date} ${timeOnly}`);

  console.log(
    `Truncating item: ${location_name} on ${date} at ${time} (reference date: ${dateReference})`,
  );

  return {
    date_reference: dateReference,
    name: location_name,
    date,
    time,
    id: item.id,
    description: item.item_data.description,
    categories: item.item_data.categories,
  };
}

console.log("Fetching data from Square...");

do {
  const response = await fetch(url + (cursor ? `?cursor=${cursor}` : ""), {
    method: "GET",
    headers: {
      "Square-Version": "2026-05-20",
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error(
      `Error fetching data: ${response.status} ${response.statusText}`,
    );
    break;
  }

  const data = await response.json();
  const filtered = data.objects.filter((obj) =>
    obj.item_data?.hasOwnProperty("description_plaintext"),
  );

  const mapped = filtered.map((obj) => truncate_item(obj));

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  const todayFiltered = mapped
    .filter((item) => item.date_reference >= yesterday)
    .sort((a, b) => a.date_reference - b.date_reference);

  const now = new Date(); // in UTC

  // local time conversion for filtering

  console.log(
    `Retrieved ${todayFiltered.length} shows from Square, filtering for shows after ${now.toISOString()} UTC...`,
  );

  const cutoff = new Date();
  cutoff.setHours(cutoff.getHours() + 4);

  const dateFiltered = todayFiltered
    .filter((item) => item.date_reference >= cutoff)
    .sort((a, b) => a.date_reference - b.date_reference);

  allData.push(...dateFiltered);
  cursor = data.cursor;
} while (cursor);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

for (const item of allData) {
  console.log(
    `Show: ${item.name} on ${item.date} at ${item.time} (reference date: ${item.date_reference.toISOString()})`,
  );

  const [city, state] = item.name.split(", ");

  item.timezone = await getTimezone(city, state);

  await sleep(3000); // ⏱️ 1 second delay between each request
}

console.log(`Successfully retrieved ${allData.length} shows!`);
console.log("Writing to locations.json...");

const now = new Date(); // in UTC

allData = allData
  .filter((item) => createUTCDate(item.date_reference, item.timezone) >= now)
  .sort((a, b) => a.date_reference - b.date_reference);

allData = allData.map((item) => transform_item(item));

let data = [];

for (let i = 0; i < allData.length; i++) {
  const item = allData[i];

  const link =
    "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop";

  const formattedDate = formatDate(item.date);
  const linkDate = formattedDate.replace(" ", "-").toLowerCase();
  const linkLoc = item.name.replace(", ", "-").toLowerCase();
  const showLink = link + `/${linkDate}-${linkLoc}/${item.id}`;

  if (data.some((d) => d.name === item.name)) {
    const existingItem = data.find((d) => d.name === item.name);

    if (existingItem.shows.some((s) => s.date === formattedDate)) {
      const show = existingItem.shows.find((s) => s.date === formattedDate);
      console.log(
        `Adding time ${item.time} to existing show on ${formattedDate} for ${item.name}`,
      );
      show.times.push(item.time);

      show.formattedTimes = formatTimes(show.times);
    } else {
      existingItem.shows.push({
        date: formattedDate,
        weekday: item.weekday,
        formattedTimes: formatTimes([item.time]),
        times: [item.time],
        link: showLink,
      });
    }
  } else {
    const categoryName = parentMap[item.category_id];
    let categoryLink =
      "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop";
    const categoryDateRange = categoryName.split(":")[0]?.split(" – ");
    const categoryLinkDate =
      categoryDateRange[0].replace("/", "") +
      "-" +
      categoryDateRange[1].replace("/", "");

    const formattedFirstDate = formatDate(categoryDateRange[0]);
    const formattedLastDate = formatDate(categoryDateRange[1]);

    const DateRangeText = `${getOrdinalSuffix(formattedFirstDate)} – ${getOrdinalSuffix(formattedLastDate)}`;

    const newItem = {
      name: item.name,
      link:
        categoryLink +
        `/${categoryLinkDate}-${item.name.replace(", ", "-").toLowerCase()}/${item.category_id}`,
      date_range: `${formattedFirstDate} – ${formattedLastDate}`,
      date_range_text: `${DateRangeText}`,
      address: item.address,
      shows: [
        {
          date: formattedDate,
          weekday: item.weekday,
          formattedTimes: formatTimes([item.time]),
          times: [item.time],
          link: showLink,
        },
      ],
    };

    data.push(newItem);
  }
}

fs.writeFileSync("./public/locations.json", JSON.stringify(data, null, 2));

const endTime = new Date();
console.log(`Scraping completed in ${(endTime - startTime) / 1000} seconds.`);
