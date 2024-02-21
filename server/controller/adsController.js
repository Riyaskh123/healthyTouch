const AsyncHandler = require("express-async-handler");
var express = require("express");

var Ads = require("../common/adsSchema.js");

const createAds = AsyncHandler(async (req, res) => {
  console.log("fdsfaf")
  const { adName, imageURL } = req.body;
  console.log(req.body)
  try{
  if (!adName || !imageURL) {
    res.status(400);
    throw new Error("Data Missing");
  }
  console.log("hey")
  const newAd = new Ads({
    adName,
    imageURL,
  });

  newAd
    .save()
    .then((savedAd) => {
      console.log("Ad inserted successfully:", savedAd);
      res.status(201).json({
        savedAd,
      });
    })
    .catch((error) => {
      console.error("Error inserting ad:", error);
      res.status(404);
      throw new Error(err);
    });
  }catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

const getAllAds = AsyncHandler(async (req, res) => {
  try {
    const ads = await Ads.find({});
    console.log(ads);
    res.status(201).json({
      ads,
    });
  } catch (err) {
    res.status(404);
    throw new Error(err);
  }
});

const updateAd = AsyncHandler(async (req, res) => {
  try {
    if (req.body.status && !["Active", "Inactive"].includes(req.body.status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedAd = await Ads.findByIdAndUpdate(req.body.Id, req.body, {
      new: true,
    });

    if (!updatedAd) {
      return res.status(404).json({ message: "Ad not found" });
    }
    res.json(updatedAd);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

const deleteAd = AsyncHandler(async (req, res) => {
    try {

      const adId = req.params.adId; // Extract adId from URL parameters
      if (!adId) {
        return res.status(400).json({ message: "Invalid Ad Id value" });
      }
  console.log(adId)
      const deletedAd = await Ads.findByIdAndDelete(adId);
  
      if (!deletedAd) {
        return res.status(404).json({ message: "Ad not found" });
      }
      res.json({msg:'Deleted'});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  });
module.exports = { createAds, getAllAds, updateAd,deleteAd };
