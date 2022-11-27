const router = require('express').Router();
let Reservation = require('../models/reservation.model');
let User = require('../models/user.model');
const mongoose = require('mongoose');

router.route('/').get(async (req, res) => {
    // Returns all reservations in the database
    // TO DO: Use cookies, this should be admin only
    try {
        const reservations = await Reservation.find()
        res.json(reservations)
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
})

router.route('/add').post(async (req, res) => {
    // Adds a reservation to the database
    // TO DO: Parse date info, data validation, sql injection prevention
    // TO DO: Use cookies to check if user is signed in and only allow them to make reservations for their account, admins can make any reservation they want
    const reservationId = new mongoose.Types.ObjectId;
    const tables = [];
    req.body.tables.forEach(table => {
        const tableNumber = table.tableNumber;
        const tableSize = table.tableSize;
        tables.push({tableNumber, tableSize}); 
    });
    const timeSlot = new Date(req.body.date);
    timeSlot.setHours(req.body.hours);
    timeSlot.setMinutes(req.body.minutes);
    const partySize = req.body.partySize;
    const phoneNumber = req.body.phoneNumber;
    const partyFirstName = req.body.firstName;
    const partyLastName = req.body.lastName;

    // Add reservation to set of reservations
    try {
        const newReservation = new Reservation({reservationId, tables, timeSlot, partySize, partyFirstName, partyLastName, phoneNumber});
        await newReservation.save()
        const user = await User.findOne({phoneNumber: phoneNumber});
        if (user != null) {
            // TO DO: Add to user document
        }
        res.json('Reservation added!');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

router.route('/delete').post(async (req, res) => {
    // Deletes a reservation from the database
    // TO DO: data validation, sql injection prevention
    // TO DO: Use cookies so that only users can delete their own reservations and admins can delete whatever they want
    try {
        const reservation = await Reservation.findOne({'_id': req.body.id})
        if (reservation == null)
            throw 'Reservation does not exist.';

        await Reservation.deleteOne({'_id': req.body.id})
        res.json('Reservation removed!');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

module.exports = router;