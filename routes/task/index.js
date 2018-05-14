const router = require('express').Router();

const Controller = require('./controller');
const Validator = require('./validator');

module.exports = ({ authorize, models }) => {
    const routes = new Controller({ models });

    // Routes configuration
    router.get('/', routes.getTasks);
    router.get('/from/:blockId', Validator.getTasksByBlockId(), routes.getTasksByBlockId);
    router.get('/:taskId', Validator.getTaskById(), routes.getTaskById);

    // Check all routes for valid token
    router.use(authorize);

    router.put('/', Validator.createTask(), routes.createTask);
    router.patch('/:taskId', Validator.patchTask(), routes.patchTask);
    router.delete('/:taskId/from/:blockId', Validator.deleteTask(), routes.deleteTask);

    return router;
};
