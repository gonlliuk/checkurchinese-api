/* eslint-disable no-throw-literal,func-names */
const id = require('shortid');
const moment = require('moment');
const mongoose = require('../libs/mongoose');
const questionSchema = require('./schemas/question');

const taskSchema = new mongoose.Schema({
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
        index: true,
        default: id.generate,
    },
    blockId: {
        type: String,
        index: true,
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        default: '',
    },
    additionalQuestion: {
        type: String,
        default: '',
    },
    comment: {
        type: String,
        default: '',
    },
    questions: [questionSchema],
});

taskSchema.pre('save', function (next) {
    this.updatedAt = moment();
    return next();
});

module.exports = mongoose.model('Task', taskSchema);
