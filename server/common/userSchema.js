const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email:{
        type: String,
    },
    count:{
        type: Number,
        required: true,
        default : 0
    },
    offer:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Offer"
        }
    
},
{
    timestamps:true
}
);

const User = mongoose.model('User', userSchema); // Assign the model directly to a variable

module.exports = User; // Export the model directly

