const router = require('express').Router();
let User = require('../models/user.model');
let Reservation = require('../models/reservation.model');
let Table = require('../models/table.model');
const mongoose = require('mongoose');
 
router.route('/').get(async (req, res) => {
    // Returns all tables in the database
    try {
        const tables = await Table.find();
        res.json(tables);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

router.route('/add').post(async (req, res) => {
    const tableNumber = req.body.tableNumber;
    const tableSize = req.body.tableSize;
    const reservations = req.body.reservations
    const newTable = new Table({tableNumber, tableSize, reservations, reserved, firstName, lastName, email, phoneNumber});
    try {
        await newTable.save();
        res.json('Table data updated!');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

module.exports = router;