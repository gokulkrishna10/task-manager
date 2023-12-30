const db = require('../customnodemodules/database_node_module/app')
const taskManagerHelper = require('../helpers/taskManagerHelper')
const constants = require('../constants/constants')


exports.createTask = function (req, callback) {
    let taskMapper = taskManagerHelper.taskMapper(req)
    let options = {
        sql: `insert into ${constants.db_tables['TASK_MANAGER']} set ?;`,
        values: [taskMapper]
    }

    db.queryWithOptions(options, (dbErr, dbResp) => {
        if (dbErr) {
            callback(dbErr, null)
        } else {
            if (dbResp.affectedRows > 0) {
                callback(null, dbResp)
            } else {
                callback(null, null)
            }
        }
    })
}

exports.getAllTasks = function (req, callback) {
    let options = {
        sql: `select * from ${constants.db_tables['TASK_MANAGER']};`
    }

    db.queryWithOptions(options, (dbErr, dbResp) => {
        if (dbErr) {
            callback(dbErr, null)
        } else {
            if (dbResp && dbResp.length > 0) {
                callback(null, dbResp)
            } else {
                callback(null, null)
            }
        }
    })
}

exports.deleteTask = function (req, callback) {
    req.params.task_id = parseInt(req.params.task_id)
    let options = {
        sql: `delete from ${constants.db_tables['TASK_MANAGER']} where task_id = ${req.params.task_id}`
    }

    db.queryWithOptions(options, (dbErr, dbResp) => {
        if (dbErr) {
            callback(dbErr, null)
        } else {
            if (dbResp.affectedRows > 0) {
                callback(null, dbResp)
            } else {
                callback(null, null)
            }
        }
    })
}


