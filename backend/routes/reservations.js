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
    const username = req.body.username;
    const partyFirstName = req.body.firstName;
    const partyLastName = req.body.lastName;
    const phoneNumber = req.body.phoneNumber;
    // Add reservation to set of reservations
    try {

        //findTables(date, timeSlot);
        const tables = [
            {
                "tableNumber": 5,
                "tableSize": 4
            },
            {
                "tableNumber": 2,
                "tableSize": 2
            }
        ];

        const newReservation = new Reservation({tables, partySize, date, time, partyFirstName, partyLastName, phoneNumber});
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
    /*res.json({
        timeSlots: [
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
            },
            {
                time: "3:00 AM",
                available: false
            },
            {
                time: "3:30 AM",
                available: true
            },
            {
                time: "4:00 PM",
                available: true
            },
            {
                time: "4:30 PM",
                available: true
            },
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
            },
            {
                time: "10:00 PM",
                available: false
            },
            {
                time: "10:30 PM",
                available: false
            }
        ],
        holdFee: true
    });*/
    
    const partySize = req.body.partySize;
    const date = new Date(req.body.date);
    
    timeSlots = [
        "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
        "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
        "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
        "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM",
        "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM"
    ]

    //timeSlots.forEach(function(timeSlot) {
        //console.log(timeSlot);
    //});

    try {

        const reservedTables = await Reservation.aggregate([
            {$match: {date: date, time: "1:00 PM"}},
            {$unwind: "$tables"},
            {$group: {_id: null, tables: {"$addToSet": "$tables"}}},
            {$project: {_id: 0, tables: {_id: 0}}},
        ]).then(response => response[0]["tables"]);
        
        const allTables = await Table.find().select({_id: 0, tableNumber: 1, tableSize: 1}).sort({tableSize: "ascending"});

        // availableTables is the difference of the set allTables and the set reservedTables
        const availableTables = allTables.filter(function(a) {
            return !reservedTables.some(function(b) {
                return a.tableNumber == b.tableNumber;
            });
        });
        
        // Search for an available single table
        for (let i = 0; i < availableTables.length; ++i) {
            if (availableTables[i].tableSize > partySize * 2) {
                break;
            } else if (availableTables[i].tableSize >= partySize) {
                console.log(availableTables[i]);
                break;
            }
        }

        // Search for an available double table
        let bestTable1, bestTable2;
        let bestSize = 1000; //arbitrary max value
        for (let i = 0; i < availableTables.length; ++i) {
            for (let j = i + 1; j < availableTables.length; ++j) {
                const combinedSize = availableTables[i].tableSize + availableTables[j].tableSize;
                if (combinedSize > partySize * 2)
                    break;
                if (combinedSize < partySize)
                    continue;
                if (combinedSize >= bestSize)
                    break; 
                bestTable1 = availableTables[i];
                bestTable2 = availableTables[j];
                bestSize = combinedSize;
            }
        }

        console.log(bestTable1, bestTable2);

       
        //if (reservation == null)
            //throw 'Reservation does not exist.';

        //await Reservation.deleteOne({'_id': req.body.id})
        //res.json('Reservation removed!');
        res.json('boop');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }

});

module.exports = router;