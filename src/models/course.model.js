const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
    {
        courseName: {
            type: String,
            required: [true, 'Course name is required'],
            unique: true,
            trim: true
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

module.exports = mongoose.model('Course', courseSchema);
