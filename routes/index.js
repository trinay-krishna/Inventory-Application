var express = require("express");
var router = express.Router();

const category_controller = require("../controllers/CategoryController");
const component_controller = require("../controllers/ComponentController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/categories/");
});

router.get("/categories", category_controller.index);

router.get("/categories/create/", category_controller.create_category);

router.post("/categories/create/", category_controller.create_category_post);

router.get("/categories/update/:id", category_controller.update_category_get);

router.post("/categories/update/:id", category_controller.update_category_post);

router.get("/categories/delete/:id", category_controller.delete_category_get);

router.post("/categories/delete/:id", category_controller.delete_category_post);

router.get("/categories/:id", category_controller.get_category_list);

router.get("/component/delete/:id", component_controller.delete_component_get);

router.post(
  "/component/delete/:id",
  component_controller.delete_component_post
);

router.get("/component/update/:id", component_controller.update_component_get);

router.post(
  "/component/update/:id",
  component_controller.update_component_post
);

router.get("/component/:id/create/", component_controller.get_component_create);

router.post(
  "/component/:id/create/",
  component_controller.post_component_create
);

module.exports = router;
