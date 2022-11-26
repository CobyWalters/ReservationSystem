const router = require('express').Router();
let User = require('../models/user.model');
const db = require('mongoose');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    // TO DO: hash password, data validation, sql injection prevention
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;

    const newUser = new User({username, password, firstName, lastName, email, phoneNumber});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete').post((req, res) => {
    // TO DO: data validation, sql injection prevention
    User.find({'username': req.body.username})
        .then(users => {
            if (!users.length)
                throw 'User does not exist.';
            User.deleteOne({'username': req.body.username})
                .then(() => res.json('User removed!'));
        })
        .catch(err => {
            res.status(400).json('Error: ' + err)
        });
});


module.exports = router;
