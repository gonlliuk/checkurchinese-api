/* eslint-disable no-throw-literal,func-names */
const id = require('shortid');
const moment = require('moment');

const mongoose = require('../../libs/mongoose');

const answerSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        default: id.generate,
    },
    answer: {
        type: String,
        required: true,
    },
    isCorrect: {
        type: Boolean,
        required: true,
    },
});

const testSchema = new mongoose.Schema({
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
    question: {
        type: String,
        required: true,
    },
    answers: [answerSchema],
});

testSchema.pre('save', function (next) {
    this.updatedAt = moment();
    return next();
});

module.exports = testSchema;


