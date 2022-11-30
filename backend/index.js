
// THIS FILE TESTS THAT DATA VALIDATION WORKS PROPERLY IN USER.MODEL.JS

'use strict'
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true,useUnifiedTopology: true});
const connection = mongoose.connection;
var user = new User();
user.username = 'blahajluvr1998';
user.hashedPassword = 'chickensoup*';
user.firstName = 'banana';
user.lastName = 'fofana';
user.email = 'bigg@balls.com';
user.phoneNumber = '4206666969';
user.points = '1000000000';
user.save(function (error,document) {
    //check for errors
    let errors = getErrors(error);
    //Send Errors to browser
    console.log(errors);
});
function getErrors(error) {
    let errorArray = [];
    if (error) {
        if (error.errors['username']) {
            console.log(error.errors['username'].message)
            errorArray.push('username');
        }
        if (error.errors['hashedPassword']) {
            console.log(error.errors['hashedPassword'].message)
            errorArray.push('hashedPassword');
        }
        if (error.errors['firstName']) {
            console.log(error.errors['firstName'].message)
            errorArray.push('firstName');
        }
        if (error.errors['lastName']) {
            console.log(error.errors['lastName'].message)
            errorArray.push('lastName');
        }
        if (error.errors['email']) {
            console.log(error.errors['email'].message)
            errorArray.push('email');
        }
        if (error.errors['phoneNumber']) {
            console.log(error.errors['phoneNumber'].message)
            errorArray.push('phoneNumber');
        }
        if (error.errors['points']) {
            console.log(error.errors['points'].message)
            errorArray.push('points');
        }
    } else {
        console.log('No Errors Product Saved Succefully');
    }
    return errorArray;
};