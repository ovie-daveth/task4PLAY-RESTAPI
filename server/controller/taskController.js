

const addTask = (req, res) => {
    res.send("ADD TASK")
}

const getTasks = (req, res) => {
    res.send("GET ALL TASK")
}

const getTask = (req, res) => {
    res.send("GET TASK")
}

const updateTask = (req, res) => {
    res.send("UPDATE TASK")
}

const deleteTask = (req, res) => {
    res.send("DELETE TASK")
}

module.exports = {
    addTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
}