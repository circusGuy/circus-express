import dotenv from "dotenv";
import fs from "fs";

const startTime = new Date();

dotenv.config();

const accessToken = process.env.SQUARE_ACCESS_TOKEN;
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
      timeString += " | ";
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

  return {
    date_reference: new Date(date),
    name: location_name,
    date: date,
    time: time,
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

  const now = new Date();
  now.setHours(0, 0, 0, 0); // Set to midnight for accurate comparison
  const dateFiltered = mapped
    .filter((item) => new Date(item.date_reference).getTime() >= now)
    .sort((a, b) => new Date(a.date_reference) - new Date(b.date_reference));

  allData.push(...dateFiltered);
  cursor = data.cursor;
} while (cursor);

console.log(`Successfully retrieved ${allData.length} shows!`);
console.log("Writing to locations.json...");

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

    if (existingItem.shows.some((s) => s.date === item.date)) {
      const show = existingItem.shows.find((s) => s.date === item.date);
      show.times.push(item.time);

      show.formattedTimes = formatTimes(show.times);
    } else {
      existingItem.shows.push({
        date: formattedDate,
        weekday: item.weekday,
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
