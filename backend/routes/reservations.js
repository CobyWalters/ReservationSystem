const router = require('express').Router();
let Reservation = require('../models/reservation.model');
let User = require('../models/user.model');
let Table = require('../models/table.model');
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
    // TO DO: Use cookies to check if user is signed in and only allow them to make reservations for their account, admins can make any reservation they want
    const partySize = req.body.partySize;
    const date = new Date(req.body.date);
    const time = req.body.time;

    const partyFirstName = req.body.firstName;
    const partyLastName = req.body.lastName;
    const phoneNumber = req.body.phoneNumber;

    try {
        const availableTables = await findAvailableTables(date, time);
        const tables = await checkAvailabilityAndReserve(availableTables, partySize);
        const newReservation = new Reservation({tables, partySize, date, time, partyFirstName, partyLastName, phoneNumber});
        await newReservation.save()
        res.status(200).json(tables);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

router.route('/reserveWhenLoggedIn').post(async (req, res) => {
    const username = req.body.username;
    const partySize = req.body.partySize;
    const date = new Date(req.body.date);
    const time = req.body.time;
    
    try {

        // lookup to find out user info
        const user = await User.findOne({username: username});
        if (user == null) {
            throw 'User could not be found.'
        }
        const partyFirstName = user.firstName;
        const partyLastName = user.lastName;
        const phoneNumber = user.phoneNumber;
        const newReservation = new Reservation({tables, partySize, date, time, username, partyFirstName, partyLastName, phoneNumber});
        await newReservation.save()
        res.status(200).json('Reservation added!')

    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

router.route('/delete').post(async (req, res) => {
    // Deletes a reservation from the database
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

router.route('/getOpenSlots').post(async (req, res) => {
    // Returns availabilities of a certain day's timeslots
    const partySize = req.body.partySize;
    const date = new Date(req.body.date);

    
    timeSlots = [
        "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
        "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
        "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
        "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM",
        "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM"
    ]

    var response = {timeSlots: [], holdFee: isHoliday(date)};

    try {
        var allAvailableTables = [];
        for (let i = 0; i < timeSlots.length; ++i) {
            allAvailableTables.push(findAvailableTables(date, timeSlots[i]));
        }
        for (let i = 0; i < timeSlots.length; ++i) {
            response.timeSlots.push({timeSlot: timeSlots[i], availability: checkAvailability(await allAvailableTables[i], partySize)})
        }
        response.timeSlots.sort(a => a);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

async function findAvailableTables(date, time) {

    const reservedTables = await Reservation.aggregate([
        {$match: {date: date, time: time}},
        {$unwind: "$tables"},
        {$group: {_id: null, tables: {"$addToSet": "$tables"}}},
        {$project: {_id: 0, tables: {_id: 0}}},
    ]).then(response => response.length == 0 ? response : response[0].tables);
    
    const allTables = await Table.find().select({_id: 0, tableNumber: 1, tableSize: 1}).sort({tableSize: "ascending"});

    // availableTables is the difference of the set allTables and the set reservedTables
    const availableTables = allTables.filter(function(a) {
        return !reservedTables.some(function(b) {
            return a.tableNumber == b.tableNumber;
        });
    });

    return availableTables;
}

function checkAvailability(availableTables, partySize) {

    // Check for single tables
    for (let i = 0; i < availableTables.length; ++i) {
        if (availableTables[i].tableSize > partySize * 2)
            break;
        if (availableTables[i].tableSize >= partySize)
            return true;
    }

    // Check for double tables
    for (let i = 0; i < availableTables.length; ++i) {
        for (let j = i + 1; j < availableTables.length; ++j) {
            const combinedSize = availableTables[i].tableSize + availableTables[j].tableSize;
            if (combinedSize < partySize)
                continue;
            if (combinedSize > partySize * 2)
                break;
            return true;
        }
    }

    return false;
}

async function checkAvailabilityAndReserve(availableTables, partySize, res) {

    // Check for single tables
    for (let i = 0; i < availableTables.length; ++i) {
        if (availableTables[i].tableSize > partySize * 2)
            break;
        if (availableTables[i].tableSize >= partySize)
            return availableTables[i];
    }

    // Check for double tables
    var tables = []
    var bestSize = 1000; //arbitrary max value
    for (let i = 0; i < availableTables.length; ++i) {
        for (let j = i + 1; j < availableTables.length; ++j) {
            const combinedSize = availableTables[i].tableSize + availableTables[j].tableSize;
            if (combinedSize < partySize)
                continue;
            if (combinedSize > partySize * 2)
                break;
            if (combinedSize >= bestSize)
                break; 
            tables[0] = availableTables[i];
            tables[1] = availableTables[j];
            bestSize = combinedSize;
        }
    }

    if (tables.length === 0)
        throw 'Error: Tables no longer available.';

    return tables;
}

function isHoliday(_date) {

    const month = _date.getMonth() + 1;
    const date = _date.getDate();
    const day = _date.getDay();
    const occurenceInMonth = Math.floor(date / 7) + 1;

    console.log(month, date, day, occurenceInMonth);

    if (month == 2 && date == 14)
        return true; // Valentine's Day
    if (month == 3 && date == 17)
        return true; // St Patricks Day
    if (month == 5 && day == 0 && occurenceInMonth == 2)
        return true; // Mother's Day
    if (month == 5 && day == 1 && date == 24)
        return true; // Memorial Day
    if (month == 6 && day == 0 && occurenceInMonth == 3)
        return true; // Father's Day
    if (month == 7 && date == 4)
        return true; // Independence Day
    if (month == 9 && day == 1 && occurenceInMonth == 1)
        return true; // Labor Day
    if (month == 10 && date == 31)
        return true; // Halloween
    if (month == 11 && day == 4 && occurenceInMonth == 4)
        return true; // Thanksgiving
    if (month == 12 && (date == 24 || date == 25)) 
        return true; // Christmas and Christmas Eve
    if (month == 12 && date == 31)
        return true; // New Year's Eve

    return false;
}
module.exports = router;