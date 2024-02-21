const mongoose = require("mongoose");

const dailyLimitSchema = new mongoose.Schema({
    dailyLimit:{
        type: Number,
        required: true,
    }
},{
    timestamps:true
});

const dailylimit = mongoose.model('DailyLimit', dailyLimitSchema); // Assign the model directly to a variable

module.exports = dailylimit; // Export the model directly

