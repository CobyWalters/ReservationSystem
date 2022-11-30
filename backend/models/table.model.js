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
        required: true,
        min: 2,
        max: 16
    }
});
const Table = mongoose.model('Table', tableSchema);

module.exports = Table;