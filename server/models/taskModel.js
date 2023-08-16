const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
    },
    desc: {
        type: String,
        required: [true, 'description is required'], 
    },
    completed: {
        type: Boolean,
        required: [false],
        default: false
    }
})

const Task  = mongoose.models.task || mongoose.model("task", taskSchema)

module.exports = Task