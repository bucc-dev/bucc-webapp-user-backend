const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user.model');
const OTP = require('../models/otp.model');
const AppError = require('../utils/AppError');
const emailService = require('./email.service');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

exports.register = async (userData) => {
    let user = await User.create(userData);
    user = await user.populate({ path: 'course', select: 'courseName' });
    const token = generateToken(user._id);

    user.password = undefined;
    return { user, token };
};

exports.login = async (matricNo, password) => {
    const user = await User.findOne({ matricNo })
        .select('+password')
        .populate({ path: 'course', select: 'courseName' });

    if (!user || !(await user.correctPassword(password, user.password))) {
        throw new AppError('Incorrect matric number or password', 401);
    }

    const token = generateToken(user._id);
    user.password = undefined;
    return { user, token };
};

exports.forgotPassword = async (email) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError('No user found with this email address', 404);
    }

    const resetCode = crypto.randomBytes(3).toString('hex').toUpperCase();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await OTP.create({
        email,
        code: resetCode,
        expiresAt
    });

    await emailService.sendPasswordResetEmail(email, resetCode);
};

exports.resetPassword = async (email, code, newPassword) => {
    const otp = await OTP.findOne({
        email,
        code,
        expiresAt: { $gt: Date.now() },
        used: false
    });

    if (!otp) {
        throw new AppError('Invalid or expired reset code', 400);
    }

    const user = await User.findOne({ email }).populate('course');
    user.password = newPassword;
    await user.save();

    otp.used = true;
    await otp.save();

    return generateToken(user._id);
};
