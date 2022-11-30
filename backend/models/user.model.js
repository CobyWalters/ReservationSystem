const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    hashedPassword: {
        type: String,
        required: true,
        unique: true,
        minlength: [8, 'password too short'],
        maxLength: [25, 'password too long'],
        validate: {
            validator: function(v) {
                const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
                return specialChars.test(v);
            },
            message: "passwords must contain at least one special character"
        }
    },
    firstName: {
        type: String,
        required: true,
        minlength: 1
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        minlength: [10, 'phone number format: ##########'],
        maxLength: [10, 'phone number format: ##########'],
        validate: {
            validator: function(v) {
                return !isNaN(v);
            },
            message: 'only type numbers'
        }
    },
    points: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;