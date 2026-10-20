const { json } = require("express");
const mongoose = require("mongoose");
const userModel = require("../Models/userModel");
const boardModel = require("../Models/boardModel");
const taskModel = require("../Models/taskModel");
const listModel = require("../Models/listModel");
 
// Create Board
exports.createBoard = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { boardName, boardColor} = req.body; 

    console.log(userId, boardName, boardColor);
 
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newBoard = new boardModel({
      boardName,
      userId: user._id,
      boardColor
    });
    const savedBoard = await newBoard.save();
    res.status(200).json({
      message: "Board created successfully",
      board: savedBoard,
    });
  } catch (error) {
    console.error("Error creating board:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


// Show Board
exports.showBoard =  async (req, res) => {
  try {
    const { userId } = req.params;
    const boards = await boardModel.find({ userId });
    res.status(200).json({
      message: "Boards fetched successfully",
      boards,
    });
  } catch (error) {
    console.error("Error fetching boards:", error);
    res.status(500).json({message: "Server error", error });
  }
};



//Delete List With Corresponding Task
exports.deleteBoard = async(req, res)=>{
  try{
    const{deleteBoardId} = req.body;
    console.log(deleteBoardId);
    const board = await boardModel.findById(deleteBoardId)
    console.log(board);

     const lists =  await listModel.find({boardId:board._id});
     console.log(lists);

     const listIds = lists.map((list)=>list._id);
     console.log(listIds);

     await taskModel.deleteMany({listId:{$in:listIds}});
     await listModel.deleteMany({boardId:{$in:board._id}});
     await boardModel.findByIdAndDelete(board._id);
    res.status(200).json({
      message: "board delete successfully",
    });
  }
  catch (error) {
    console.error("Error fetching boards:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


