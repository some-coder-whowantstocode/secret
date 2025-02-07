const { Schema, model } = require("mongoose");

const BookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = model('Booking', BookingSchema);
