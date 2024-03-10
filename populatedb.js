console.log("Script running");

const userArgs = process.argv.slice(2);

const Category = require("./models/Category");
const Component = require("./models/Component");

const categoriesList = [];
const components = [];

const mongoose = require("mongoose");

const mongoDB = userArgs[0];

main().catch(console.log);

async function main() {
  console.log("Connecting to Database");
  await mongoose.connect(mongoDB);
  console.log("Connected!");
  await createCategories();
  await createComponents();
}

async function categoryCreate(index, name, desc, imgURL) {
  const categorydetail = { name, desc };
  if (imgURL) {
    categorydetail.imgURL = imgURL;
  }
  const category = new Category(categorydetail);
  await category.save();
  categoriesList[index] = category;
  console.log("Added Category ", name);
}

async function componentCreate(index, name, desc, categories, imgURL) {
  const componentdetail = { name, desc, categories };
  if (imgURL) {
    componentdetail.imgURL = imgURL;
  }
  const component = new Component(componentdetail);
  await component.save();
  components[index] = component;
  console.log("Added Component ", name);
}

async function createCategories() {
  console.log("Adding Categories");
  await Promise.all([
    categoryCreate(0, "GPU", "Graphics Card", false),
    categoryCreate(1, "CPU", "Processor", false),
    categoryCreate(
      2,
      "motherboard",
      "gaming motherboards come with high-quality onboard audio that outperforms the audio on basic motherboards",
      false
    ),
  ]);
}

async function createComponents() {
  console.log("Adding Components");
  await Promise.all([
    componentCreate(
      0,
      "RTX 2060",
      "Integrated with 6GB GDDR6 192-bit memory interface",
      [categoriesList[0]],
      false
    ),
    componentCreate(
      1,
      "RTX 3060",
      "Memory Clock : 15000 MHz; Memory Size : 12 GB",
      [categoriesList[0]],
      false
    ),
    componentCreate(
      2,
      "i5-13600K",
      "Intel Core i5-13600K Processor (24M Cache- up to 5.10 GHz)",
      [categoriesList[1]],
      false
    ),
    componentCreate(
      3,
      "Asus ROG Strix B550-F",
      "Gaming WiFi 6 AMD AM4 Socket for 3rd Gen AMD Ryzen ATX Gaming Motherboard with PCIe 4.0, teamed Power Stages, BIOS Flashback, Dual M.2 SATA 6 Gbps USB & Aura Sync (Ddr4)",
      [categoriesList[2]],
      false
    ),
  ]);
}
