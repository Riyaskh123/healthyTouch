const mongoose = require("mongoose");

const adsSchema = new mongoose.Schema({
    adName: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
    },
});

const Ads = mongoose.model('Ads', adsSchema); // Assign the model directly to a variable

module.exports = Ads; // Export the model directly

