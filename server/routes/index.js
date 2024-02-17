var express = require("express");
var router = express.Router();
var {
  createAds,
  getAllAds,
  updateAd,
  deleteAd,
} = require("../controller/adsController.js");

var {
  createOffer, getAllOffer, updateOffer, deleteOffer
} = require("../controller/offerController.js");

var {
 createAdmin, adminAuth
} = require("../controller/adminController.js");

var {
  createUser,updateUser,getUserLoginStatus,getUserOffer
 } = require("../controller/userController.js");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//ad section
router.route("/ads").post(createAds).get(getAllAds).patch(updateAd).delete(deleteAd);
router.route("/admin").post(createAdmin)
router.route("/adminLogin").post(adminAuth)
router.route("/user").post(createUser).patch(updateUser)
router.route("/check-login-status").get(getUserLoginStatus)
router.route("/get-user-offer").post(getUserOffer)
router.route("/offer").post(createOffer).get(getAllOffer).patch(updateOffer).delete(deleteOffer);
module.exports = router;
