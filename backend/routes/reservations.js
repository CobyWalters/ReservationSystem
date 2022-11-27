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
    // TO DO: Use cookies to check if user is signed in and only allow them to make reservations for their account, admins can make any reservation they want
    const partySize = req.body.partySize;
    const date = new Date(req.body.date);
    const time = req.body.time;
    const username = req.body.username;
    const partyFirstName = req.body.firstName;
    const partyLastName = req.body.lastName;
    const phoneNumber = req.body.phoneNumber;

    // Add reservation to set of reservations
    try {

        //findTables(date, timeSlot);
        const tables = [
            {
                "tableNumber": 1,
                "tableSize": 4
            },
            {
                "tableNumber": 2,
                "tableSize": 2
            }
        ];

        const newReservation = new Reservation({tables, partySize, date, time, username, partyFirstName, partyLastName, phoneNumber});
        await newReservation.save()
        //if (username != null) {
            //const user = await User.findOne({username: username});
            //if (user != null) {
                // TO DO: Add to user document
            //}
        //}
        res.status(200).json('Reservation added!')
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

router.route('/getOpenSlots').get(async (req, res) => {
    // Returns availabilities of a certain day's timeslots
    // TO DO: Everything, this is just a mock implementation
    res.json({
        lunch: [
            {
                time: "10:00 AM",
                available: true
            },
            {
                time: "10:30 AM",
                available: false
            },
            {
                time: "11:00 AM",
                available: false
            },
            {
                time: "11:30 AM",
                available: true
            },
            {
                time: "12:00 PM",
                available: true
            },
            {
                time: "12:30 PM",
                available: true
            },
            {
                time: "1:00 PM",
                available: true
            },
            {
                time: "1:30 PM",
                available: true
            },
            {
                time: "2:00 PM",
                available: true
            },
            {
                time: "2:30 PM",
                available: false
            }
        ],
        dinner: [
            {
                time: "5:00 PM",
                available: false
            },
            {
                time: "5:30 PM",
                available: false
            },
            {
                time: "6:00 PM",
                available: false
            },
            {
                time: "6:30 PM",
                available: true
            },
            {
                time: "7:00 PM",
                available: false
            },
            {
                time: "7:30 PM",
                available: true
            },
            {
                time: "8:00 PM",
                available: true
            },
            {
                time: "8:30 PM",
                available: false
            },
            {
                time: "9:00 PM",
                available: false
            },
            {
                time: "9:30 PM",
                available: false
            }
        ],
        holdFee: true
    });
})

module.exports = router;