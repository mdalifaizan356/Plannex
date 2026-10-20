const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    taskName:{
        type:String,
        required:true
    },
    isComplete:{
        type:Boolean, 
        default:false,
        required:true
    },
    listId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "lists",
        required: true
    }, 
},
{
    versionKey:false,
    timestamps:true
}
);

module.exports = mongoose.model("tasks", taskSchema);
