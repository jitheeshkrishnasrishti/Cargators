//AuthorName:Chitra.V
//File:Boatcontroller.js
//Module:Add Boat
//Created Date:09.03.2021
//Purpose:To Save the Details of adding a new Boat in the Database.
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

const negotiatorModel = require('../model/negotiator.model'); //Adding OwnerBooking 


// ******Add Negotiator******

const addNegotiator = (req, res, next) => {
    console.log(req.body)
    bcrypt.hash(req.body.Password, 10, function (err, hashedPass) {
        console.log(hashedPass)
        if (err) {
            res.json({
                error: err
            })
        }
        let Add_User = new negotiatorModel({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            FullName: req.body.FirstName,
            Gender: req.body.Gender,
            Contact: req.body.Contact,
            Email: req.body.Email,
            Password: hashedPass,
            profilePicture: req.body.profilePicture,
            IsActive: true,
            // Current_Time: req.body.Current_Time
        })

        Add_User.save()
            .then(response => {
                console.log("lets test")
                res.json({
                    message: 'Negotiator Added Successfully',
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
    })

}
const allNegotiators =(req,res,msg)=>
{

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
   
    }

//Function For FileUpload
const FileUploadSingle =(req,res,msg)=>
{
//  res.send(req.file.filename);
res.json({

    status:true,
    data:req.file,
    message:"Success,File Uploaded...!"
   })

}
var storage = multer.diskStorage({
destination: function (req, file, cb) {

// Uploads is the Upload_folder_name
cb(null, "uploads")
},
filename: function (req, file, cb) {
cb(null, uuid()+ path.extname(file.originalname))

}
})
const maxSize = 50 * 1024 * 1024;
const Fieldsize = 8 * 1024 * 1024;//jibin
var upload1 = multer({
storage: storage,
limits: { fileSize: maxSize,fieldSize:Fieldsize },
fileFilter: function (req, file, cb){

// Set the filetypes, it is optional
var filetypes = /jpeg|jpg|png|pdf|txt|doc/;
var mimetype = filetypes.test(file.mimetype);
var extname = filetypes.test(path.extname(
file.originalname).toLowerCase());
if (mimetype && extname) {
return cb(null, true);

}

cb("Error: File upload only supports the "
+ "following filetypes - " + filetypes);

}
}) 
 


module.exports = {addNegotiator,FileUploadSingle,upload1,allNegotiators
    }