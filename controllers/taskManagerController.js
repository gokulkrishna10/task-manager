const async = require('async')
const taskManagerDao = require('../dao/taskManagerDAO')


exports.createTask = function (req, callback) {
    taskManagerDao.createTask(req, (err, result) => {
        if (err) {
            callback(err, null)
        } else {
            if (result) {
                callback(null, {'status': "success", "msg": "successfully created a task"})
            } else {
                callback(null, {"status": "unknown", "msg": "task could not be created"})
            }
        }
    })
}

exports.getAllTasks = function (req, callback) {
    taskManagerDao.getAllTasks(req, (err, result) => {
        if (err) {
            callback(err, null)
        } else {
            if (!result) {
                callback(null, {'status': "success", "msg": "No tasks found"})
            } else {
                callback(null, result)
            }
        }
    })
}

exports.deleteTask = function (req, callback) {
    taskManagerDao.deleteTask(req, (err, result) => {
        if (err) {
            callback(err, null)
        } else {
            if (!result) {
                callback(null, {'status': "no-action", "msg": `Task with the ID ${req.params.task_id} not found`})
            } else {
                callback(null, {'status': "success", "msg": "successfully deleted the task"})
            }
        }
    })
}

exports.updateTask = function (req, callback) {
    taskManagerDao.updateTask(req, (err, result) => {
        if (err) {
            callback(err, null)
        } else {
            if (!result) {
                callback(null, {'status': "no-action", "msg": `No updates made`})
            } else {
                callback(null, {'status': "success", "msg": "successfully updated the task"})
            }
        }
    })
}