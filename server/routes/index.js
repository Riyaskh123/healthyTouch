var express = require("express");
var router = express.Router();
var {
  createAds,
  getAllAds,
  updateAd,
  deleteAd,
} = require("../controller/adsController.js");

var {
 createAdmin, adminAuth
} = require("../controller/adminController.js");

var {
  createUser
 } = require("../controller/userController.js");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//ad section
router.route("/ads").post(createAds).get(getAllAds).patch(updateAd).delete(deleteAd);
router.route("/admin").post(createAdmin)
router.route("/adminLogin").post(adminAuth)
router.route("/user").post(createUser)
module.exports = router;
