const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const Course = require('./course.model');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true
        },
        middleName: {
            type: String,
            trim: true
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            validate: [isEmail, 'Email must be a valid email'],
            match: [/student.babcock.edu.ng$/, 'Invalid email type'],
            unique: true,
            lowercase: true,
            trim: true
        },
        matricNo: {
            type: String,
            required: [true, 'Matric number is required'],
            minLength: [7, 'Matric number must be at least 7 characters'],
            unique: true,
            trim: true
        },
        gender: {
            type: String,
            required: [true, 'Gender is required'],
            enum: ['male', 'female']
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: [true, 'Course is required']
        },
        level: {
            type: String,
            required: [true, 'Level is required'],
            enum: ['100', '200', '300', '400']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 8,
            select: false
        },
        passwordResetToken: String,
        passwordResetExpires: Date
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.correctPassword = async function (
    checkPassword,
    userPassword
) {
    return await bcrypt.compare(checkPassword, userPassword);
};

module.exports = mongoose.model('User', userSchema);
