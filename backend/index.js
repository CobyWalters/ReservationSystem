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
user.username = 'h';
user.hashedPassword = 'h';
user.firstName = 'h';
user.lastName = 'h';
user.email = 'h';
user.phoneNumber = 'h';
user.points = 'h';
user.save(function (error,document) {
    //check for errors
    let errors = getErrors(error);
    //Send Errors to browser
    console.log(errors);
});
function getErrors(error) {
    let errorArray = [];
    if (error) {
        if (error.errors['category']) {
            console.log(error.errors['category'].message)
            errorArray.push('category');
        }
        if (error.errors['name']) {
            console.log(error.errors['name'].message)
            errorArray.push('name');
        }
        if (error.errors['code']) {
            console.log(error.errors['code'].message)
            errorArray.push('code');
        }
        if (error.errors['quantity']) {
            console.log(error.errors['quantity'].message)
            errorArray.push('quantity');
        }
    } else {
        console.log('No Errors Product Saved Succefully')
    }
    return errorArray;};