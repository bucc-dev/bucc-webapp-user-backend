const mongoose = require('mongoose');
const Course = require('./course.model');

const timetableSchema = new mongoose.Schema(
    {
        level: {
            type: String,
            required: [true, 'Level is required'],
            enum: ['100', '200', '300', '400']
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: [true, 'Course is required']
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

timetableSchema.index({ level: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Timetable', timetableSchema);
