const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
    offerName: {
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

const Offers = mongoose.model('Offer', offerSchema); // Assign the model directly to a variable

module.exports = Offers; // Export the model directly

