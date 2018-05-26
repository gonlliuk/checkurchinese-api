const joi = require('joi');
const validate = require('../../middlewares/validate');

const getHomeSchema = {
    homeId: joi.string().required(),
};

const updateHomeSchema = {
    id: joi.string().optional(),
    title: joi.string().required(),
    welcome: joi.string().optional(),
    text: joi.string().optional(),
};

class Validator {
    static createHome() {
        return validate(updateHomeSchema);
    }

    static deleteHome() {
        return validate(getHomeSchema);
    }

    static patchHome() {
        return validate(updateHomeSchema);
    }
}

module.exports = Validator;
