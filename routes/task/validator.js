const joi = require('joi');
const validate = require('../../middlewares/validate');

const getTasksByBlockSchema = {
    blockId: joi.string().required(),
};

const getTaskSchema = {
    taskId: joi.string().required(),
};

const deleteTaskSchema = {
    taskId: joi.string().required(),
    blockId: joi.string().required(),
};

const updateTaskSchema = {
    id: joi.string().optional(),
    title: joi.string().required(),
    blockId: joi.string().required(),
    text: joi.string().optional().empty(''),
    additionalQuestion: joi.string().empty(''),
    comment: joi.string().optional().empty(''),
    questions: joi.array().optional().empty(''),
};

class Validator {
    static createTask() {
        return validate(updateTaskSchema);
    }

    static getTaskById() {
        return validate(getTaskSchema);
    }

    static getTasksByBlockId() {
        return validate(getTasksByBlockSchema);
    }

    static deleteTask() {
        return validate(deleteTaskSchema);
    }

    static patchTask() {
        return validate(updateTaskSchema);
    }
}

module.exports = Validator;
