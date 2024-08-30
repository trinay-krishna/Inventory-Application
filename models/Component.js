const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ComponentSchema = new Schema({
  name: String,
  desc: String,
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  imgURL: String,
  inStock: Number,
});

ComponentSchema.virtual("url").get(function () {
  return `/index/component/${this._id}`;
});

module.exports = mongoose.model("Component", ComponentSchema);
