const mongoose = require('mongoose');
const Course = require('./course.model');

const announcementSchema = new mongoose.Schema(
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
        category: {
            type: String,
            required: [true, 'Category is required']
        },
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Description is required']
        },
        date: {
            type: Date,
            required: [true, 'Date is required']
        },
        startTime: {
            type: String
        },
        endTime: {
            type: String
        },
        link: {
            type: String,
            required: [true, 'Image link is required']
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

module.exports = mongoose.model('Announcement', announcementSchema);
