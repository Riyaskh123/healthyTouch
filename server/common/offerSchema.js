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
    lowerLimit:{
        type: Number,
        required: true,
    },
    upperLimit:{
        type: Number,
        required: true,
    },
    status:{
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
    },
});

const Offer = mongoose.model('Offer', offerSchema); // Assign the model directly to a variable

module.exports = Offer; // Export the model directly

