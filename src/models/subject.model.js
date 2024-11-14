const Course = require('./course.model');
const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema(
    {
        course: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course',
                required: [true, 'Course is required']
            }
        ],
        level: {
            type: String,
            required: [true, 'Level is required'],
            enum: ['100', '200', '300', '400']
        },
        name: {
            type: String,
            required: [true, 'Subject name is required'],
            trim: true
        },
        code: {
            type: String,
            required: [true, 'Subject code is required'],
            unique: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        unit: {
            type: Number,
            required: [true, 'Unit is required']
        },
        prerequisite: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Subject'
            }
        ],
        lecturers: [
            {
                type: String,
                trim: true
            }
        ],
        semester: {
            type: String,
            enum: ['1', '2'],
            required: true
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

module.exports = mongoose.model('Subject', subjectSchema);
