/* eslint-disable no-throw-literal,func-names */
const id = require('shortid');
const moment = require('moment');
const mongoose = require('../../libs/mongoose');
const testSchema = require('./test');

const videoSchema = new mongoose.Schema({
    url: {
        type: String,
    },
}, { autoIndex: false });


const questionSchema = new mongoose.Schema({
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
    description: {
        type: String,
    },
    videos: [videoSchema],
    images: [],
    checkTestByBtn: {
        type: Boolean,
        default: true,
    },
    test: [testSchema],
}, { autoIndex: false });

questionSchema.pre('save', function (next) {
    this.updatedAt = moment();
    return next();
});

module.exports = questionSchema;
