const express = require('express');
const {addTask,getTask,getTasks,updateTask,deleteTask} = require('../controller/taskController')

const router = express.Router()

router.route("/").post(addTask).get(getTasks)
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router