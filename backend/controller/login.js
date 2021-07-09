
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

const adminLogin = require('../model/login.model'); //Adding OwnerBooking 

// *****admin login*******
const login = (req, res, next) => {

    var username = req.body.Email
    var password = req.body.Password
    
    adminLogin.findOne({ $or: [{ Email: username }, { Email: username }] })
        .then(user => {           
            if (adminLogin) {
  
               try
               {
                
                bcrypt.compare(password, user.Password, function (err, result) {
                  console.log(result)
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
                    if (result) {
                        let token = jwt.sign({ name: user.Email }, 'verySecretValue', { expiresIn: '1h' })
                        res.json({
                            status:true,
                            message: ' Login Successfully',
                            data:user,
                            token
                        })
                    } else {
                        res.json({
                            status:false,
                            message:'Password doesnot match'
                        })
                    }
                
                    })
                }
            
        
          catch(error)
          {
            res.json({
                status:false,
                message: 'No User Found'
            })
          }          
            
    }
  
        })
    
    
}

// Register
const addAdmin = (req, res, next) => {

    console.log(req.body)
    bcrypt.hash(req.body.Password, 10, function (err, hashedPass) {
      if (err) {
          res.json({
              error: err
          })
      }
          let Add_User = new adminLogin({
    
              Email: req.body.Email,
              Password: hashedPass,
              IsActive: req.body.IsActive,
              Current_Time: req.body.Current_Time
          })
       
          Add_User.save()
              .then(response => {
                  res.json({
                      message: 'Admin Added Successfully',
                      data:Add_User
                  })
              })
              .catch(error => {
                  res.json({
                      message: error
                  })
              })
            })
        }
        const ChangePassword = (req, res, next) => {
   
    console.log(req.body)
      bcrypt.hash(req.body.Password, 10, function (err, hashedPass) {
          if (err) {
              res.json({
                  error: err
              })
          }
    console.log(hashedPass)
      async.waterfall([
          function (done) {
            adminLogin.findOne({ Email: req.body.Email}, function (err, user, next) {
                  if (!user) {
                      res.json({
                          Status:false,
                          message: 'Invalid Email'
                      })
                  }
                  
    
                  user.Password = hashedPass /*req.body.Password;*/ /*bcrypt.hash(req.body.Password, 10)*/
                  user.save((err) => {
                      // done(err, user);
                      console.log(user)
                      res.json({
                        Status:true,
                        message: 'Password Changed Successfully'
                    })
                  });
                  
                                
              });
          }
      ], function (err) {
              res.json({
                  message: err
              })
      });
      })
    
    
    }


module.exports = {login,ChangePassword,addAdmin
    }