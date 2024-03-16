const AsyncHandler = require("express-async-handler");
var express = require("express");



const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: '9b499bf6a0c51abcc760dec1c601c43d-b02bcf9f-88f2236e'});

var User = require("../common/userSchema.js");

var Offer = require("../common/offerSchema.js");

var dailylimit = require("../common/dailylimitSchema.js");

let isUserLoggedIn = false;

const createUser = AsyncHandler(async (req, res) => {
  const { name, phone, email } = req.body;
  try {
    if (!name || !phone || !email) {
      res.status(400);
      throw new Error("Data Missing");
    }
    if (isUserLoggedIn) {
      res.status(401);
      throw new Error("Only 1 user logged in allowed at a time");
    }
    const today = new Date();
    let formatedDate =
      (today.getDate() > 9 ? today.getDate() : "0" + today.getDate()) +
      "-" +
      (today.getMonth() > 8
        ? today.getMonth() + 1
        : "0" + (today.getMonth() + 1)) +
      "-" +
      today.getFullYear();

    User.aggregate([
      {
        $addFields: {
          updatedAtDayMonthYear: {
            $dateToString: { format: "%d-%m-%Y", date: "$updatedAt" },
          },
          targetDateDayMonthYear: "17-02-2024", // Target date to compare against
        },
      },
      {
        $match: {
          $and: [
            {
              updatedAtDayMonthYear: "17-02-2024",
            }, // Match the date
            { phone }, // Match the phone number
          ],
        },
      },
    ])
      .then(async (results) => {
        console.log(results.length);
        console.log(results);
        let limit = await dailylimit.findOne({})
        if(!limit){
          res.status(400);
      throw new Error("Add daily Limit First");
        }
        console.log(limit)
        if (results.length >= limit.dailyLimit) {
          // Check if last updated date is today

          res.status(400).json({
            message: "Daily limit exceeded",
          });
        } else {
          const newUser = new User({
            name,
            phone,
            email,
          });

          newUser.save().then((newUser) => {
            isUserLoggedIn = true;
            console.log("user Saved successfully:", newUser);

            const io = req.app.get("socketio");
            io.emit("start", newUser);

            res.status(201).json({
              newUser,
            });
          });
        }
      })
      .catch((error) => {
        console.error(error);
     
        res.status(500).json( error.message);
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

const updateUser = AsyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    // if (!req.body.Id || !req.body.count) {
    //   return res.status(400).json({ message: "Invalid data value" });
    // }
    console.log(
      "--------------------------------------------------------------------------------------------------------------"
    );
    let offers = await Offer.find({
      $and: [
        { upperLimit: { $gt: req.body.count } },
        { lowerLimit: { $lt: req.body.count } },
      ],
    });

    var randomItem = offers[Math.floor(Math.random() * offers.length)];
    if (randomItem) {
      req.body.offer = randomItem._id;
    }
    const updatedUser = await User.findByIdAndUpdate(req.body.Id, req.body);
    isUserLoggedIn = false;

    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
  


    if (!randomItem) {
      return res.status(404).json({ message: "You dont have offer now" });
    } else {
      let userWithOffer = await User.findById(updatedUser._id).populate(
        "offer"
      );

  ///send mail
  console.log(updatedUser.email)
  console.log(randomItem.offerName)
  // Email options


  mg.messages.create('sandbox-123.mailgun.org', {
    from: "Excited User <mailgun@sandbox-123.mailgun.org>",
    to: updatedUser.email,
    subject: "Hello",
    text: "Testing some Mailgun awesomeness!",
    html: "<h1>Testing some Mailgun awesomeness!</h1>"
  })
  .then(msg => console.log(msg)) // logs response data
  .catch(err => console.log(err)); // logs any error



// const data = {
// 	from: "Mailgun Sandbox <postmaster@sandbox9aa0ee66c63b4bfd899a5ac9dc507d7b.mailgun.org>",
// 	to: updatedUser.email,
// 	subject: "Congratulations on winning offer",
// 	text:'Thankyou for participating healthyTouch, your coupon code:'+ randomItem.offerName
// };
// mg.messages().send(data, function (error, body) {
// 	console.log(body);
//   console.log(error)
// });



      res.json(userWithOffer);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

const getUserLoginStatus = (req, res) => {
  try {
    return res.status(200).json({ isUserLoggedIn });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getUserOffer = async (req, res) => {
  try {
    if (!req.body.Id) {
      return res.status(400).json({ message: "Invalid data value" });
    }
    const user = await User.findById(req.body.Id).populate("offer");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json(user.offer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getAllUser = AsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    console.log(users);
    res.status(201).json({
      users,
    });
  } catch (err) {
    res.status(404);
    throw new Error(err);
  }
});

module.exports = { createUser, updateUser, getUserLoginStatus, getUserOffer,getAllUser };
