// var fileUpload = require('express-fileupload');
var fs = require("fs");
const mongoose = require("mongoose")
const express = require("express")
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors');
var path = require('path');

const app = express();app.use(cors());

require('./model/negotiator.model'); //Adding OwnerBooking 

const AdminNegotiator = require('./routes/adminNegotiator');
const Adminlogin = require('./routes/login');
const Customer = require('./routes/customer');


// connect with db

mongoose.connect('mongodb://localhost:27017/reactcrud', { useNewUrlParser: true })


// mongoose.connect('mongodb://SBR:S1BR73@54.201.160.69:58173:58173/SBR', { useNewUrlParser: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to db"));

db.once('open', function () {
console.log("connected to DB");
})

module.exports = db;
// connect with db
app.use(bodyParser.urlencoded({limit: '50mb',extended : true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(morgan('dev'))
//app.use(bodyParser.urlencoded({ extended: true }))
//app.use(bodyParser.json())
app.listen(4001, () => console.log(`Server running on port 4001`));

// project routes

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/adminNegotiator', AdminNegotiator)//owner 13-3-2021
app.use('/api/login', Adminlogin)//owner 13-3-2021
app.use('/api/customer', Customer)//owner 13-3-2021


// project routes

// cors
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});
// cors