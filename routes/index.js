var express = require("express");
var router = express.Router();

const category_controller = require("../controllers/CategoryController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/categories/");
});

router.get("/categories", category_controller.index);

router.get("/categories/create/", category_controller.create_category);

router.get("/categories/:id", category_controller.get_category_list);

module.exports = router;
