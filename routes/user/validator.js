const joi = require('joi');
const validate = require('../../middlewares/validate');

const sessionSchema = {
    uuid: joi.string().required(),
};

const patchUserSchema = {
    name: joi.string().optional(),
};

class Validator {
    static deleteSession() {
        return validate(sessionSchema);
    }

    static patchUser() {
        return validate(patchUserSchema);
    }
}

module.exports = Validator;
