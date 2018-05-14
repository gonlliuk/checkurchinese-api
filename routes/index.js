/* eslint-disable global-require */
const router = require('express').Router();

const services = {
    authorize: require('../middlewares/authorize'),
    libs: {
        random: require('../libs/random'),
    },
    models: {
        user: require('../models/user'),
        page: require('../models/page'),
        block: require('../models/block'),
        task: require('../models/task'),
    },
};

const Auth = require('./auth')(services);
const User = require('./user')(services);
const Page = require('./page')(services);
const Block = require('./block')(services);
const Task = require('./task')(services);

router
    .use('/auth', Auth)
    .use('/user', User)
    .use('/page', Page)
    .use('/block', Block)
    .use('/task', Task)
    .all('*', (req, res) => res.error(405));

module.exports = router;
