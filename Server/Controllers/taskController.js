 const { json } = require("express");
 const mongoose = require("mongoose");
 const listModel = require("../Models/listModel");
 const taskModel = require("../Models/taskModel");
//  const { ObjectId } = require('mongodb');

  
// Create Task and Update List
exports.createTask = async (req, res) => {
  try {
    const { taskName, listId } = req.body;
    const newTask = new taskModel({ taskName, listId});
    const savedTask = await newTask.save(); 

    await listModel.findByIdAndUpdate(
      listId,
      { $push: { taskId: savedTask._id } },
    );

    res.status(201).json({
      message: 'Task created successfully and added to the list',
      task: savedTask,
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


// Move Task
exports.moveTask = async (req, res) => {
    try {
      const { taskId, sourceListId, destinationListId } = req.body;
      // console.log (taskId, sourceListId, destinationListId );
      if (!mongoose.Types.ObjectId.isValid(taskId) || !mongoose.Types.ObjectId.isValid(destinationListId)) {
              return res.status(400).json({ message: 'Invalid taskId or destinationListId!' });
      }
      const updatelistId = await taskModel.findByIdAndUpdate(
        taskId,
        { $set: { listId: destinationListId } },
        { new: true }
      );

        await listModel.findByIdAndUpdate(
          sourceListId,
          { $pull: { taskId: taskId } },
          { new: true }
        );

        await listModel.findByIdAndUpdate(
          destinationListId,
          { $addToSet: { taskId: taskId } },
          { new: true }
        );

      res.status(200).json({
        message: 'Task moved successfully and added to the list',
        task: updatelistId,
      });
    }
    catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ message: 'Server error', error });
    }
};




//Delete Task (cascading delete)
exports.deleteTask = async (req, res) => {
  try{
    const{ deleteTaskId, listIdDeleteTask} = req.body;
  await taskModel.findByIdAndDelete(deleteTaskId, {new:true});
  await listModel.findByIdAndUpdate(
    listIdDeleteTask,
    { $pull: { taskId: deleteTaskId } },
    { new: true }
  );
  res.status(200).json({
    message: 'Task removed successfully',
  });
  }
  catch(error){
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


//Complete Task
exports.completeTask = async (req, res) => {
  try{
    const{ completeTaskId, taskCompleteStatus} = req.body;
   const task = await taskModel.findByIdAndUpdate(completeTaskId, {new:true});

   const update = await taskModel.findByIdAndUpdate(
    completeTaskId,
    {$set:{isComplete:  !task.isComplete }},
    {new:true}
   )
    res.status(200).json({
    message: 'Task Complete',
    update
  });
  }
  catch(error){
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
