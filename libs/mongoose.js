const mongoose = require('mongoose');

const inspect = require('./inspect');
const log = require('./log');
const config = require('../config');

const CONNECTION_STRING = `${config.get('MONGODB:HOST')}/${config.get('MONGODB:DB')}`;

const OPTIONS = config.get('MONGODB:OPTIONS');
OPTIONS.user = config.get('MONGODB:USER');
OPTIONS.pass = config.get('MONGODB:PASS');

require('mongoose-double')(mongoose);
mongoose.Promise = require('bluebird');

if (process.env.NODE_ENV !== 'test') {
    mongoose
        .connect(CONNECTION_STRING, OPTIONS)
        .then(() => log(`:: MONGOOSE CONNECTED > ${CONNECTION_STRING}`, 'blue'))
        .catch(error => inspect(error));
}

module.exports = mongoose;
