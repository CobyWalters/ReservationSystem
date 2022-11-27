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
        minlength: 8
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
        minlength: 10
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