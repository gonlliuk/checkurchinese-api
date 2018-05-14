const joi = require('joi');
const validate = require('../../middlewares/validate');

const getBlocksByPageSchema = {
    pageId: joi.string().required(),
};

const getBlockSchema = {
    blockId: joi.string().required(),
};

const deleteBlockSchema = {
    blockId: joi.string().required(),
    pageId: joi.string().required(),
};

const updateBlockSchema = {
    id: joi.string().optional(),
    title: joi.string().required(),
    pageId: joi.string().required(),
};

class Validator {
    static createBlock() {
        return validate(updateBlockSchema);
    }

    static getBlockById() {
        return validate(getBlockSchema);
    }

    static getBlocksByPageId() {
        return validate(getBlocksByPageSchema);
    }

    static deleteBlock() {
        return validate(deleteBlockSchema);
    }

    static patchBlock() {
        return validate(updateBlockSchema);
    }
}

module.exports = Validator;
