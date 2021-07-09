var express = require('express');
var router = express.Router();

const adminLogin = require('../controller/login')
router.post('/login',adminLogin.login)//login
router.post('/ChangePassword',adminLogin.ChangePassword)//change password
router.post('/addAdmin',adminLogin.addAdmin)//Add aadmin



module.exports = router






