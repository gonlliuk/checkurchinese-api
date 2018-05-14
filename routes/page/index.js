const router = require('express').Router();

const Controller = require('./controller');
const Validator = require('./validator');

module.exports = ({ authorize, models }) => {
    const routes = new Controller({ models });

    // Routes configuration
    router.get('/', routes.getPages);
    router.get('/:pageId', Validator.getPageById(), routes.getPageById);

    // Check all routes for valid token
    router.use(authorize);

    router.put('/', Validator.createPage(), routes.createPage);
    router.patch('/:pageId', Validator.patchPage(), routes.patchPage);
    router.delete('/:pageId', Validator.deletePage(), routes.deletePage);

    return router;
};
