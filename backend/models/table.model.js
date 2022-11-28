const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tableSchema = new Schema({
    tableNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    tableSize: {
        type: Number,
        required: true
    },
    reservations: {
        type: Array,
        required: true
    },
    reserved: {
        type: Boolean,
        required: true,
    },
    
    firstName: {
        type: String,
        required: true,

    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        minlength: 12
    },
}, {
    timestamps: true,
});
const User = mongoose.model('User', userSchema);

module.exports = User;