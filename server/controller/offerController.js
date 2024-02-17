const AsyncHandler = require("express-async-handler");
var express = require("express");

var Offer = require("../common/offerSchema.js");

const createOffer = AsyncHandler(async (req, res) => {
        console.log("hey")
  const { offerName, imageURL, lowerLimit, upperLimit } = req.body;
  if (!offerName || !imageURL || !lowerLimit || !upperLimit) {
    console.log("error happen")
    res.status(400);
    throw new Error("Data Missing");
  }

  const newOffer = new Offer({
    offerName,
    imageURL,
    lowerLimit,
    upperLimit,
  });
 
  newOffer
    .save()
    .then((savedOffer) => {
      console.log("Offer inserted successfully:", savedOffer);
      res.status(201).json({
        savedOffer,
      });
    })
    .catch((error) => {
      console.error("Error inserting offer:", error);
      res.status(404);
      throw new Error(err);
    });

});

const getAllOffer = AsyncHandler(async (req, res) => {
  try {
    const offers = await Offer.find({});
    console.log(offers);
    res.status(201).json({
        offers,
    });
  } catch (err) {
    res.status(404);
    throw new Error(err);
  }
});

const updateOffer = AsyncHandler(async (req, res) => {
  try {
    if (req.body.status && !["Active", "Inactive"].includes(req.body.status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedOffer = await Offer.findByIdAndUpdate(req.body.Id, req.body, {
      new: true,
    });

    if (!updatedOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    res.json(updatedOffer);
  } catch (err) {
    console.log("heeyheheh")
    console.log(err)
    // console.error(err);
    res.status(500).json({ message: err.message });
  }
});

const deleteOffer = AsyncHandler(async (req, res) => {
  try {
    if (!req.body.Id) {
      return res.status(400).json({ message: "Invalid Offer Id value" });
    }

    const deletedOffer = await Offer.findByIdAndDelete(req.body.Id);

    if (!deletedOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    res.json({ msg: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});
module.exports = { createOffer, getAllOffer, updateOffer, deleteOffer };
