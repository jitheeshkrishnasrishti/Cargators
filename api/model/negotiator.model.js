const mongoose = require("mongoose")
var schema = mongoose.Schema;

var negotiatorschema = new schema({

    FirstName:
    {
        type: String
    
    },
    LastName:
    {
        type: String
    
    },
    FullName:
    {
        type: String
    
    },
    Gender:
    {
        type: String
    
    },
    Contact:
    {
        type: String
    
    },

    profilePicture:
    {
        type: String,
        default:null    
    },
    Email:
    {
        type: String,
        unique: true
    },
    UserType: String,
    Password:
    {
        type: String
    
    },
    Block:
    {
        type: Boolean,
        default:null
    },
    IsActive:
    {
        type: Boolean,
        default: null
    },
    Current_Time:
    {
        type: Date,
        default:new Date()
    },
    Update_Time:
    {
        type: Date,
        default: new Date()
    },

    resetPasswordExpires: Date,
    created: { type: Date, default: Date.now },

});
module.exports = mongoose.model('Negotiator', negotiatorschema);