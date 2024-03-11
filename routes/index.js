var express = require("express");
var router = express.Router();

const category_controller = require("../controllers/CategoryController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/categories/");
});

router.get("/categories", category_controller.index);

router.get("/categories/create/", category_controller.create_category);

router.post("/categories/create/", category_controller.create_category_post);

router.get("/categories/update/:id", category_controller.update_category_get);

router.post("/categories/update/:id", category_controller.update_category_post);

router.get("/categories/delete/:id", category_controller.delete_category);

router.get("/categories/:id", category_controller.get_category_list);

module.exports = router;
