const Component = require("../models/Component");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Category = require("../models/Category");

exports.get_component_create = asyncHandler(async (req, res, next) => {
  const categoryList = await Category.find({}).sort({ name: 1 }).exec();
  res.render("componentcreate", {
    categoryList: Array.from(categoryList),
    id: req.params.id,
  });
});

exports.post_component_create = [
  body("compName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name cannot be empty"),
  body("compDesc")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Description cannot be empty"),
  body("compInStock").trim(),
  body("compURL").trim(),

  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("componentcreate", {
        id: id,
        name: req.body.compName,
        desc: req.body.compDesc,
        url: req.body.compURL,
        inStock: req.body.compInStock,
        errors: errors.array(),
      });
    } else {
      const categoryID = await Category.findOne({ _id: id });
      const comp = await Component.findOne({ name: req.body.compName });
      if (comp) {
        res.redirect(`/categories/${id}`);
        return;
      }
      const compDetails = {
        name: req.body.compName,
        desc: req.body.compDesc,
        categories: [categoryID._id],
        inStock: req.body.compInStock,
      };
      if (req.body.compURL) {
        compDetails.imgURL = req.body.compURL;
      }

      const component = new Component(compDetails);
      await component.save();
      console.log("SAVED");
      res.redirect(`/categories/${id}`);
    }
  }),
];

exports.delete_component_get = asyncHandler(async (req, res, next) => {
  const component = await Component.findOne({ _id: req.params.id });
  console.log(req.query.category);
  res.render("compdelete", {
    id: req.params.id,
    name: component.name,
  });
});

exports.delete_component_post = asyncHandler(async (req, res, next) => {
  const component = await Component.findOne({ _id: req.params.id });
  const category = component.categories[0].toString();
  await Component.deleteOne({ _id: req.params.id });
  res.redirect(`/categories/${category}`);
});

exports.update_component_get = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const component = await Component.findOne({ _id: id });
  res.render("compupdate", {
    name: component.name,
    desc: component.desc,
    url: component.imgURL,
    inStock: component.inStock,
    id: id,
  });
});

exports.update_component_post = [
  body("compName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Component Name cannot be empty!"),
  body("compDesc")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Component description cannot be emtpy!"),
  body("compInStock").trim(),
  body("compURL").trim(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("compupdate", {
        name: req.body.compName,
        desc: req.body.compDesc,
        inStock: req.body.compInStock,
        url: req.body.compURL,
        id: req.params.id,
        errors: errors.array(),
      });
    } else {
      const component = await Component.findOne({ _id: req.params.id });
      const category = component.categories[0].toString();
      component.name = req.body.compName;
      component.desc = req.body.compDesc;
      component.inStock = req.body.compInStock;
      component.imgURL = req.body.compURL;
      console.log(component);
      await component.save();
      res.redirect(`/categories/${category}`);
    }
  }),
];
