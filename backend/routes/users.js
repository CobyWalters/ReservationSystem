const router = require('express').Router();
let User = require('../models/user.model');
const mongoose = require('mongoose');

router.route('/').get(async (req, res) => {
    // Returns all users in the database
    // TO DO: Use cookies, this should be admin only
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
})

router.route('/add').post(async (req, res) => {
    // Adds a user to the database
    // TO DO: hash password, data validation, sql injection prevention
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const newUser = new User({username, password, firstName, lastName, email, phoneNumber});

    try {
        await newUser.save();
        res.json('User added!');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

router.route('/delete').post(async (req, res) => {
    // Deletes a user from the database
    // TO DO: data validation, sql injection prevention
    // TO DO: Use cookies so that users can only delete their own accounts and admins can delete whatever they want
    try {
        const user = await User.findOne({'username': req.body.username});
        if (user == null)
            throw 'User does not exist.';
        await User.deleteOne({'username': req.body.username})
        res.json('User removed!');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

module.exports = router;