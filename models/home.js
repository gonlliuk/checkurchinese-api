/* eslint-disable no-throw-literal,func-names */
const id = require('shortid');
const moment = require('moment');
const mongoose = require('../libs/mongoose');

const pageSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: moment,
    },
    updatedAt: {
        type: Date,
        default: moment,
    },
    id: {
        type: String,
        unique: true,
        default: id.generate,
    },
    title: {
        type: String,
        unique: true,
        default: ''
    },
    welcome: {
        type: String,
        unique: true,
        default: ''
    },
    text: {
        type: String,
        unique: true,
        default: '',
    }
}, { autoIndex: false });

pageSchema.pre('save', function (next) {
    this.updatedAt = moment();
    return next();
});

module.exports = mongoose.model('Home', pageSchema);
