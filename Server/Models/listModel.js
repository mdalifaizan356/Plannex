const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    listName:{
        type:String,
        required:true
    },
    listColor:{
        type:String, 
        required:true 
    },
    boardId:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref: "boards",
        required: true
    },
    taskId:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "tasks",
        }],
},
{
    versionKey:false,
    timestamps:true
}
);

module.exports = mongoose.model("lists", listSchema);
