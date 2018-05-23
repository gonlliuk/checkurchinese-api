/* eslint-disable no-throw-literal,func-names */
const id = require('shortid');
const moment = require('moment');
const mongoose = require('../libs/mongoose');

const blockSchema = new mongoose.Schema({
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
    pageId: {
        type: String,
        request: true,
    },
    title: {
        type: String,
        required: true,
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
}, { autoIndex: false });

blockSchema.pre('save', function (next) {
    this.updatedAt = moment();
    return next();
});

module.exports = mongoose.model('Block', blockSchema);
