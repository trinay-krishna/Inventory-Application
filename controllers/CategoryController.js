const Category = require("../models/Category");
const Component = require("../models/Component");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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

exports.create_category_post = [
  body("categoryName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Category Name Empty!")
    .isAlpha()
    .withMessage("Category name must only contain alphabets"),
  body("categoryDesc")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Description Cannot be Empty"),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const name = req.body.categoryName;
      const desc = req.body.categoryDesc;
      const url = req.body.categoryImgURL;
      res.render("categoryform", {
        name,
        desc,
        url,
        errors: errors.array(),
      });
    } else {
      const categorydetails = {
        name: req.body.categoryName,
        desc: req.body.categoryDesc,
      };
      if (req.body.categoryImgURL) {
        categorydetails.imgURL = req.body.categoryImgURL;
      }
      const catRes = await Category.findOne({ name: req.body.categoryName });
      if (catRes) {
        res.render("categoryform", {
          exists: true,
        });
        return;
      }
      const category = new Category(categorydetails);
      console.log(category);
      res.redirect("/categories/");
    }
  }),
];

exports.update_category_get = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const category = await Category.findOne({ _id: id });
  res.render("categoryupdate", {
    name: category.name,
    desc: category.desc,
    imgURL: category.imgURL,
    id: id,
  });
});

exports.update_category_post = [
  body("categoryName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name Cannot be Empty!")
    .isAlpha()
    .withMessage("Name must only contain alphabets"),
  body("categoryDesc")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Description Cannot be empty!"),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = await Category.findOne({ _id: req.params.id });
    if (!errors.isEmpty()) {
      res.render("categoryupdate", {
        id: req.params.id,
        name: category.name,
        desc: category.desc,
        imgURL: category.imgURL,
        errors: errors.array(),
      });
    } else {
      category.name = req.body.categoryName;
      category.desc = req.body.categoryDesc;
      category.imgURL = req.body.categoryImgURL;
      await category.save();
      res.redirect("/categories/");
    }
  }),
];

exports.delete_category = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const category = await Category.findOne({ _id: id });
  res.render("catdelete", {
    id: id,
    name: category.name,
  });
});
