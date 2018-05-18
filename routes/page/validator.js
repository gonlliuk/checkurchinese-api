const joi = require('joi');
const validate = require('../../middlewares/validate');

const getQuestionSchema = {
    pageId: joi.string().required(),
};

const getPageSchema = {
    pageId: joi.string().required(),
};

const updatePageSchema = {
    id: joi.string().optional(),
    title: joi.string().required(),
};

class Validator {
    static createPage() {
        return validate(updatePageSchema);
    }

    static getPageById() {
        return validate(getPageSchema);
    }

    static deletePage() {
        return validate(getQuestionSchema);
    }

    static patchPage() {
        return validate(updatePageSchema);
    }
}

module.exports = Validator;
