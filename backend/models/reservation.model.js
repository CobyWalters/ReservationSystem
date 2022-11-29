const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    tables: [
        {
            tableNumber: {
                type: Number,
                required: true
            },
            tableSize: {
                type: Number,
                required: true
            }
        }
    ],
    partySize: {
        type: Number,
        required: true,
        min: 1,
        max: 8
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    partyFirstName: {
        type: String,
        required: true,
        minlength: 1
    },
    partyLastName: {
        type: String,
        required: true,
        minlength: 1
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    }
}, {
    timestamps: true
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;