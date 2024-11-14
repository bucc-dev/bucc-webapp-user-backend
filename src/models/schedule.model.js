const mongoose = require('mongoose');
const Course = require('./course.model');

const scheduleSchema = new mongoose.Schema(
    {
        level: {
            type: [String],
            enum: ['100', '200', '300', '400'],
            required: true
        },
        course: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course',
                required: true
            }
        ],
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true
        },
        location: {
            type: String,
            required: [true, 'Location is required'],
            trim: true
        },
        date: {
            type: Date,
            required: [true, 'Date is required']
        },
        startTime: {
            type: String,
            required: [true, 'Start time is required']
        },
        endTime: {
            type: String,
            required: [true, 'End time is required']
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

module.exports = mongoose.model('Schedule', scheduleSchema);
