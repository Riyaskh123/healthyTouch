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
 createAdmin, adminAuth, addDailyLimit, getDailyLimit
} = require("../controller/adminController.js");

var {
  createUser,updateUser,getUserLoginStatus,getUserOffer,getAllUser, sendmail
 } = require("../controller/userController.js");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//ad section
router.route("/ads").post(createAds).get(getAllAds).patch(updateAd)
router.delete("/ads/:adId", deleteAd);
router.route("/admin").post(createAdmin)
router.route("/dailyLimit").post(addDailyLimit).get(getDailyLimit)
router.route("/adminLogin").post(adminAuth)
router.route("/user").post(createUser).patch(updateUser).get(getAllUser)
router.route("/check-login-status").get(getUserLoginStatus)
router.route("/get-user-offer").post(getUserOffer)
router.route("/offer").post(createOffer).get(getAllOffer).patch(updateOffer)
router.delete("/offer/:offerId", deleteOffer);
router.get("/sendmail",sendmail);
module.exports = router;
