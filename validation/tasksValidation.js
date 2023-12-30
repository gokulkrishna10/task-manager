const util = require('../customnodemodules/util_node_module/utils')
const ErrorMod = require('../customnodemodules/error_node_module/errors')
const customError = new ErrorMod()


exports.validateCreateTask = function (req, res, next) {
    let err = null;

    if (util.isNull(req.body.label)) {
        err = customError.BadRequest("request needs a task label")
        next(err)
    }
    next()
}

exports.validateDeleteTask = function (req, res, next) {
    let err = null

    if (util.isNull(req.params.task_id) || isNaN(req.params.task_id)) {
        err = customError.BadRequest("request parameter must be a valid task_id")
        next(err)
    }
    next()
}


