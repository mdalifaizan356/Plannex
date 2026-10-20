const express = require("express");
const router = express.Router();
const taskController = require("../Controllers/taskController");
const userAuth = require("../Middlewares/userAuth")

// router.post("/createBoard", userAuth, boardController.createBoard);
router.post("/createTask", taskController.createTask);
router.post("/moveTask", taskController.moveTask);
router.delete("/deleteTask", taskController.deleteTask);
router.patch("/completeTask", taskController.completeTask);




module.exports = router;  