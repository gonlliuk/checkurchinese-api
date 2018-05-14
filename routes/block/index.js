const router = require('express').Router();

const Controller = require('./controller');
const Validator = require('./validator');

module.exports = ({ authorize, models }) => {
    const routes = new Controller({ models });

    // Routes configuration
    router.get('/', routes.getBlocks);
    router.get('/from/:pageId', Validator.getBlocksByPageId(), routes.getBlocksByPageId);
    router.get('/:blockId', Validator.getBlockById(), routes.getBlockById);

    // Check all routes for valid token
    router.use(authorize);

    router.put('/', Validator.createBlock(), routes.createBlock);
    router.patch('/:blockId', Validator.patchBlock(), routes.patchBlock);
    router.delete('/:blockId/from/:pageId', Validator.deleteBlock(), routes.deleteBlock);

    return router;
};
