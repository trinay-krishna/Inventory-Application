const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: String,
  desc: String,
  imgURL: String,
});

CategorySchema.virtual("url").get(function () {
  return `/index/categories/${this._id}`;
});

module.exports = mongoose.model("Category", CategorySchema);
