
const express = require('express');
const crypto = require('crypto')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const async = require('async')

const businessRoutes = express.Router();
// Require Business model in our routes module
let Business = require('../model/business.model');
let adminLogin = require('../model/login.model');



businessRoutes.route('/login').post(function (req, res) {

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
  
  
});


// Register
businessRoutes.route('/addAdmin').post(function (req, res) {    
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
});
businessRoutes.route('/ChangePassword').post(function (req, res) {    
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


});



// Defined store route
businessRoutes.route('/add').post(function (req, res) {
  let business = new Business(req.body);
  business.save()
    .then(business => {
      res.status(200).json({'business': 'business in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
businessRoutes.route('/').get(function (req, res) {
    Business.find(function(err, businesses){
    if(err){
      console.log(err);
    }
    else {
      res.json(businesses);
    }
  });
});

// Defined edit route
businessRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Business.findById(id, function (err, business){
      res.json(business);
  });
});

//  Defined update route
businessRoutes.route('/update/:id').post(function (req, res) {
    Business.findById(req.params.id, function(err, business) {
    if (!business)
      res.status(404).send("data is not found");
    else {
        business.person_name = req.body.person_name;
        business.business_name = req.body.business_name;
        business.business_gst_number = req.body.business_gst_number;

        business.save().then(business => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
businessRoutes.route('/delete/:id').get(function (req, res) {
    Business.findByIdAndRemove({_id: req.params.id}, function(err, business){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = businessRoutes;