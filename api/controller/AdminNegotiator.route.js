
const express = require('express');
const crypto = require('crypto')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const async = require('async');
const negotiatorModel = require('../model/negotiator.model');

const adminNegotiatorRoutes = express.Router();
// Require Business model in our routes module



// ******Add Negotiator******
adminNegotiatorRoutes.route('/addNegotiator').post(function (req, res) {
    console.log(req.body)
    bcrypt.hash(req.body.Password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }
        let Add_User = new negotiatorModel({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            FullName: req.body.FirstName+" "+req.body.LastName,
            Gender: req.body.Gender,
            Contact: req.body.Contact,
            Email: req.body.Email,
            Password: hashedPass,
            IsActive: true,
            Current_Time: req.body.Current_Time
        })

        Add_User.save()
            .then(response => {
                res.json({
                    message: 'Negotiator Added Successfully',
                    status: true,
                    data: Add_User
                })
            })
            .catch(error => {
                res.json({
                    message: error
                })
            })
    })
});
adminNegotiatorRoutes.route('/allNegotiators').get(function (req, res) {

    negotiatorModel.find({IsActive:true})
        .then(response => {
         
            res.json({
                message: 'All Negotiators',
                status: true,
                data: response
            })
        })
        .catch(error => {
            res.json({
                message: error,
                status: false,
            })
        })
    });


module.exports = adminNegotiatorRoutes;