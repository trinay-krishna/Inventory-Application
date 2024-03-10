const Category = require("../models/Category");
const Component = require("../models/Component");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}).sort({ name: 1 }).exec();

  res.render("categories", {
    allCategories: Array.from(allCategories),
  });
});

exports.get_category_list = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const categoryComponents = await Component.find({
    categories: { $elemMatch: { $eq: id } },
  })
    .sort({ name: 1 })
    .exec();
  res.render("catcomponents", {
    categoryComponents: categoryComponents,
  });
});

exports.create_category = asyncHandler(async (req, res, next) => {
  res.render("categoryform");
});
