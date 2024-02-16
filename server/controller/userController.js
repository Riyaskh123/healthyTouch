const AsyncHandler = require("express-async-handler");
var express = require("express");

var User = require("../common/userSchema.js");

const createUser = AsyncHandler(async (req, res) => {
  const { name, phone, email } = req.body;
  if (!name || !phone || !email) {
    res.status(400);
    throw new Error("Data Missing");
  }

  const existingUser = await User.findOne({ phone });


  
  if (existingUser) {
    // Check if last updated date is today
    const today = new Date();
    const lastUpdated = existingUser.updatedAt;
    if (
      lastUpdated.getDate() === today.getDate() &&
      lastUpdated.getMonth() === today.getMonth() &&
      lastUpdated.getFullYear() === today.getFullYear()
    ) {
      // If last updated date is today and dailyCount is 2, return an error
      if (existingUser.dailyCount >= 2) {
        res.status(404).json({
            message: "Daily limit exceeded",
          });
      } else {
        // Increment dailyCount
        existingUser.dailyCount += 1;
        await existingUser.save();
        res.status(200).json({
          message: "Login successful",
          user: existingUser,
        });
        return;
      }
    } else {
      // If last updated date is not today, reset dailyCount to 1
      existingUser.dailyCount = 1;
      await existingUser.save();
      res.status(200).json({
        message: "Login successful",
        user: existingUser,
      });
      return;
    }
  }

  const newUser = new User({
    name,
    phone,
    email
  });

  newUser
    .save()
    .then((newUser) => {
      console.log("user Saved successfully:", newUser);
      res.status(201).json({
        newUser,
      });
    })
    .catch((error) => {
      console.error("Error creating user:", error);
      res.status(404);
      throw new Error(error);
    });
});



  

module.exports = { createUser };
