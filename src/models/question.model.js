const mongoose = require('mongoose');
const Subject = require('./subject.model');

const questionSchema = new mongoose.Schema(
    {
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject',
            required: true
        },
        filename: {
            type: String,
            required: [true, 'Filename is required']
        },
        link: {
            type: String,
            required: [true, 'Link is required']
        },
        approved: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Question', questionSchema);
