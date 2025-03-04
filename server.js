"use strict";

class orderInfo {
  #totalCost = 0;
  #items;

  constructor(items) {
    this.#items = itemsList.filter((x) => items.includes(x.name));
    this.#items.forEach((x) => (this.#totalCost += x.cost));
  }

  orderTable() {
    let table =
      '<table style="border: 1px solid black"><tr><th style="border: 1px solid black">Item</th><th style="border: 1px solid black">Cost</th></tr>';
    let items = this.#items;
    items.forEach((item) => {
      table += `<tr><td style="border: 1px solid black">${
        item.name
      }</td><td style="border: 1px solid black">${item.cost.toFixed(
        2
      )}</td></tr>`;
    });
    return (table += `<tr><td style="border: 1px solid black">Total Cost:</td><td style="border: 1px solid black">${this.#totalCost.toFixed(
      2
    )}</td><tr></tr></table>`);
  }
}

const express = require("express");
const portNumber = 5000;
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const fileContents = require(`./${process.argv[2]}`);
const itemsList = fileContents.itemsList;

app.use(bodyParser.urlencoded({ extended: false }));
app.set("views", path.resolve(__dirname, "templates"));
app.set("view engine", "ejs");

app.listen(portNumber, (err) => {
  if (err) {
    console.log("Error: Server failed. As lawyers say, you've been served");
  } else if (process.argv.length > 3) {
    console.log("Usage supermarketServer.js jsonFile");
    process.exit(0);
  } else {
    console.log(
      `Web server started and running at http://localhost:${portNumber}`
    );
    process.stdin.setEncoding("utf8");
    process.stdout.write("Type itemsList or stop to shutdown the server: ");
    process.stdin.on("readable", () => {
      let input = process.stdin.read();
      if (input !== null) {
        const command = input.trim();

        if (command === "stop") {
          console.log("Shutting down the server");
          process.exit(0);
        }
        console.log(
          command === "itemsList"
            ? fileContents.itemsList
            : `Invalid command: ${command}`
        );
        process.stdout.write("Type itemsList or stop to shutdown the server: ");
        input = process.stdin.read();
      }
    });
  }
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/catalog", (req, res) => {
  let table =
    '<table style="border: 1px solid black"><tr><th style="border: 1px solid black">Item</th><th style="border: 1px solid black">Cost</th></tr>';
  itemsList.forEach((item) => {
    table += `<tr><td style="border: 1px solid black">${
      item.name
    }</td><td style="border: 1px solid black">${item.cost.toFixed(
      2
    )}</td></tr>`;
  });
  table += "</table>";

  res.render("displayItems", { itemsTable: table });
});

app.get("/order", (req, res) => {
  let options = "";
  itemsList.forEach(
    (x) => (options += `<option value="${x.name}">${x.name}</option>`)
  );
  res.render("placeOrder", { items: options });
});

app.post("/order", (req, res) => {
  let { name, email, delivery, itemsSelected } = req.body;
  let order = new orderInfo(itemsSelected);
  res.render("orderConfirmation", {
    name: name,
    email: email,
    delivery: delivery,
    orderTable: order.orderTable(),
  });
});
