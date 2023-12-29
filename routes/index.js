const taskManager = require('../controllers/taskManagerController')
const util = require("../customnodemodules/util_node_module/utils");


exports.createTask = function (req, res) {
    taskManager.createTask(req, (err, response) => {
        if (err) {
            res.status(err.code ? err.code : 500).send(err)
        } else {
            res.status(201).send(response)
        }
    })
}