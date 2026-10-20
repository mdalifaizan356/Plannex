const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Name:{
        type:String,
        trim:true,
    },

    Email:{
        type:String,
        required:true,
        trim:true,
    },

    PhNo:{
        type:Number,
    },
 

    Role:{
        type:String,
        trim:true,
        default:"User"
    },

    Password:{
        type:String,
        trim:true,
    },

    OTP:{
        type:String,
        required:true,
        trim:true
    },
    isRegistered:{
        type:Boolean,
        default:false
    },

},
{
    versionKey:false,
    timestamps:true
}
);

module.exports = mongoose.model('users', userSchema);