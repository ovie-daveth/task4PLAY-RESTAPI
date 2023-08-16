const connectDb = require('../connections/dbConnect')
const Task = require('../models/taskModel')
const asyncHandler = require("../middlewares/asyncHandler")

connectDb()

const addTask = asyncHandler(async (req, res) => {
        const reqBody = await req.body
        const task = await Task.create(reqBody)
        res.status(200).json({success: "Task created", task})
    }
)

const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({})
    if(!tasks) throw new Error("Task not found")
    res.status(200).json({success: "success", tasks})
})

const getTask = asyncHandler(async({params}, res) => {
    const {id} = params
    const task = await Task.findOne({_id: id})
    if(!task) throw new Error("Task not found")
    res.status(200).json({success: "success", task})
})

const updateTask =  asyncHandler(async(req, res) => {
    const {id} = req.params
    const task = await Task.findOneAndUpdate({_id: id}, req.body,  {
        new: true,
    })
    if(!task) throw new Error("Task not found")
    res.status(200).json({success: "Task updated", task})
})

const deleteTask =asyncHandler(async(req, res) => {
    const {id} = req.params
    const task = await Task.findOneAndDelete({_id: id})
    if(!task) throw new Error("Task not found")
    res.status(200).json({success: "deleted", task})
})
module.exports = {
    addTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
}