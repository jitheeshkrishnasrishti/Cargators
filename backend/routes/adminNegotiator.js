var express = require('express');
var router = express.Router();

const adminNegotiatorController = require('../controller/AdminNegotiator')
router.post('/addNegotiator',adminNegotiatorController.addNegotiator)//Add Negotiator
router.get('/allNegotiators',adminNegotiatorController.allNegotiators)//All Negotiators

router.post('/FileUploadSingle',adminNegotiatorController.upload1.single("file"),adminNegotiatorController.FileUploadSingle) //File Upload Single Image

// router.post('/FileUploadSingle',boatcontroller.upload1.single("file"),boatcontroller.FileUploadSingle) //File Upload Single Image
// router.post('/FileUploadmany',boatcontroller.upload.array("files"),boatcontroller.FileUploadmany)//File Upload Multiple Image



module.exports = router






