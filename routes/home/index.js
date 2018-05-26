const router = require('express').Router();

const Controller = require('./controller');
const Validator = require('./validator');

module.exports = ({ authorize, models }) => {
    const routes = new Controller({ models });

    // Routes configuration
    router.get('/', routes.getHome());

    // Check all routes for valid token
    router.use(authorize);

    router.put('/', Validator.createHome(), routes.createHome());
    router.patch('/:homeId', Validator.patchHome(), routes.patchHome);
    router.delete('/:homeId', Validator.deleteHome(), routes.deleteHome());

    return router;
};
