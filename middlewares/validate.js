const Joi = require('joi');

module.exports = schema => (req, res, next) => {
    const body = req.method === 'GET' || req.method === 'DELETE'
        ? req.params
        : req.body;

    return Joi.validate(body, schema)
        .then(() => next())
        .catch((data) => {
            const errors = data.details.reduce((result, error) => `${result + error.message}\n`, '');

            return res.error(400, errors);
        });
};
