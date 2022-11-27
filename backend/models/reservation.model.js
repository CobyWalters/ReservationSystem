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
    extraTable: {
        tableNumber: {
            type: Number,
            required: false
        },
        tableSize: {
            type: Number,
            required: false
        },
    },
    timeSlot: {
        type: Date,
        required: true,
    },
    partySize: {
        type: Number,
        required: true,
        min: 1,
        max: 8
    },
    partyFirstName: {
        type: String,
        required: true,
        minlength: 1,
    },
    partyLastName: {
        type: String,
        required: true,
        minlength: 1
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 12
    }
}, {
    timestamps: true,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;