const AsyncHandler = require("express-async-handler");
var express = require("express");

var Admin = require("../common/adminSchema.js");
var dailylimit = require("../common/dailylimitSchema.js");
const createAdmin = AsyncHandler(async (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    res.status(400);
    throw new Error("Data Missing");
  }

  const newAdmin = new Admin({
    name,
    password,
    email
  });

  newAdmin
    .save()
    .then((savedAdmin) => {
      console.log("Admin created successfully:", savedAdmin);
      res.status(201).json({
        savedAdmin,
      });
    })
    .catch((error) => {
      console.error("Error creating admin:", error);
      res.status(404);
      throw new Error(err);
    });
});


const adminAuth = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email: email });
    if (user ) {
      if ((await user.matchPassword(password))) {
        console.log("Password")
        res.status(200).json({
          user:{
            _id: user._id,
            name: user.name,
            email: user.email,
          }
        });
      } else {
        return res.status(401).json({ message: "invalid password" });
      }
    } else {
        return res.status(401).json({ message: "invalid user" });
    }
  });


  const addDailyLimit = AsyncHandler(async (req, res) => {
try{

  const { dailyLimit } = req.body;
  await dailylimit.deleteMany({});
  const newLimit = new dailylimit({
    dailyLimit
  });

  newLimit
    .save()
    .then((savedLimit) => {
      console.log("data inserted successfully:", savedLimit);
      res.status(201).json({
        savedLimit,
      });
    }).catch((err) => {
      console.log(err)
      console.error("Error adding daily Limit:", err);
      res.status(404);
      throw new Error(err);
    })
 
}catch(err){
  console.log("hey")
  console.log(err)
  console.error("Error adding daily Limit:", err);
  res.status(404);
  throw new Error(err);
}

  })
  

module.exports = { createAdmin,adminAuth,addDailyLimit };
