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
        max: [16, 'No more than 16 people to a party']
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
        minlength: [10, 'phone number format: ##########'],
        maxLength: [10, 'phone number format: ##########'],
        validate: {
            validator: function(v) {
                return !isNaN(v);
            },
            message: 'only type numbers'
        }
    }
}, {
    timestamps: true
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;