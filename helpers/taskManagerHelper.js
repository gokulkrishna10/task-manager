exports.taskMapper = function (req) {
    let taskMapperObject = {}

    taskMapperObject.task_label = req.body.label
    if (req.body.description) taskMapperObject.task_description = req.body.description

    return taskMapperObject
}
