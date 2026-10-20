const { json } = require("express");
const mongoose = require("mongoose");
const listModel = require("../Models/listModel");
const boardModel = require("../Models/boardModel");
const taskModel = require("../Models/taskModel");


// Create List
exports.createList = async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const {listName, listColor} = req.body;
    console.log(boardId)

    const board = await boardModel.findById(boardId);
    console.log(board)

    if (!board) {
      return res.status(404).json({ message: "board not found" });
    }

    const newList = new listModel({
      listName,
      boardId: board._id,
      listColor
    });

    const savedList = await newList.save();
    res.status(200).json({
      message: "List created successfully",
      list: savedList, 
    });
  } catch (error) {
    console.error("Error creating board:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


// Show List
exports.showList =  async (req, res) => {
  // console.log(req.params)
  const { boardId } = req.params;
  // console.log(boardId);
  try {
    const { boardId } = req.params;
    const list = await listModel.find({ boardId }).populate("taskId");

    res.status(200).json({
      message: "list fetched successfully",
      list,
    });
  } catch (error) {
    console.error("Error fetching boards:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


//Delete List With Corresponding Task
exports.deleteList = async(req, res)=>{
  const{deleteListId} = req.body;
  // console.log(deleteListId);
  try{
       const list =  await listModel.findByIdAndDelete(deleteListId);
        const taskId = list.taskId;
        console.log("taskId",taskId);

        await taskModel.deleteMany({ _id: { $in: taskId } });
        res.status(200).json({
          message: "list delete successfully",
        });
} catch (error) {
  console.error("Error fetching boards:", error);
  res.status(500).json({ message: "Server error", error });
}
};