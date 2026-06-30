
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const accessToken = process.env.SQUARE_ACCESS_TOKEN;

const url = "https://connect.squareup.com/v2/catalog/list?types=item";

const response = await fetch(url, {
    method: "GET",
    headers: {
        "Square-Version": "2026-05-20",
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
    },
});

console.log(response.status);

const data = await response.json();

const filtered = data.objects.filter(obj => obj["item_data"].hasOwnProperty('description_plaintext'));

console.log(`Successfully retrieved ${filtered.length} items with descriptions.`);

fs.writeFileSync("./public/locations.json", JSON.stringify(filtered, null, 2));
