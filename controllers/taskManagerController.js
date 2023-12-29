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


