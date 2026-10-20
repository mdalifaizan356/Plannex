const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
    boardName:{
        type:String,
        required:true
    },
    boardColor:{
        type:String,
        required:true 
    }, 
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
},
{
    versionKey:false,
    timestamps:true
}
);

module.exports = mongoose.model("boards", boardSchema);