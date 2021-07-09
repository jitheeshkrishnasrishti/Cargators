
const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const async = require('async')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const { Op } = require('sequelize')
const multer=require('multer')
const path = require("path"); 
const { uuid } = require('uuidv4');

const customerModel = require('../model/customer.model'); 


// ******Add Customer******

const addCustomer = (req, res, next) => {
    console.log(req.body)
    // bcrypt.hash(req.body.Password, 10, function (err, hashedPass) {

    //     if (err) {
    //         res.json({
    //             error: err
    //         })
    //     }
        let Add_User = new customerModel({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            FullName: req.body.FirstName+" "+req.body.LastName,
            Zipcode: req.body.Zipcode,
            address: req.body.address,
            Contact: req.body.Contact,
            Email: req.body.Email,
            profilePicture: req.body.profilePicture,
            IsActive: true,
            // Current_Time: req.body.Current_Time
        })

        Add_User.save()
            .then(response => {
                console.log("lets test")
                res.json({
                    message: 'Customer Added Successfully',
                    status: true,
                    data: Add_User
                })
            })
            .catch(error => {
                console.log(error)
                res.json({
                    message: error
                })
            })
        // })

}
const allCustomers =(req,res,msg)=>
{

    customerModel.find({IsActive:true})
        .then(response => {
         
            res.json({
                message: 'All Customers',
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
   
    }


module.exports = {addCustomer,allCustomers,
    }