const taskManager = require('../controllers/taskManagerController')

exports.createTask = function (req, res) {
    taskManager.createTask(req, (err, response) => {
        if (err) {
            res.status(err.code ? err.code : 500).send(err)
        } else {
            res.status(201).send(response)
        }
    })
}

exports.getAllTasks = function (req, res) {
    taskManager.getAllTasks(req, (err, response) => {
        if (err) {
            res.status(err.code ? err.code : 500).send(err)
        } else {
            res.status(200).send(response)
        }
    })
}

exports.deleteTask = function (req, res) {
    taskManager.deleteTask(req, (err, response) => {
        if (err) {
            res.status(err.code ? err.code : 500).send(err)
        } else {
            res.status(200).send(response)
        }
    })
}

exports.updateTask = function (req, res) {
    taskManager.updateTask(req, (err, response) => {
        if (err) {
            res.status(err.code ? err.code : 500).send(err)
        } else {
            res.status(200).send(response)
        }
    })
}