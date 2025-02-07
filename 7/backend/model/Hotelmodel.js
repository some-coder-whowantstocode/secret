const { Schema, model } = require("mongoose");

const HotelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    roomAvailable: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 100
    }
});

module.exports = model("Hotel", HotelSchema);
