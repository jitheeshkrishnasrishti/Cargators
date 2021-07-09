var express = require('express');
var router = express.Router();

const customer = require('../controller/customer')
router.post('/addCustomer',customer.addCustomer)//add Customer
router.get('/allCustomers',customer.allCustomers)//all Customers



module.exports = router