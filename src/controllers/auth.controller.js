const catchAsync = require('../utils/catchAsync');
const authService = require('../services/auth.service');

exports.register = catchAsync(async (req, res) => {
    const { user, token } = await authService.register(req.body);
    res.status(201).json({
        status: 'success',
        data: { user, token }
    });
});

exports.login = catchAsync(async (req, res) => {
    const { matricNo, password } = req.body;
    const { user, token } = await authService.login(matricNo, password);
    res.json({
        status: 'success',
        data: { user, token }
    });
});

exports.forgotPassword = catchAsync(async (req, res) => {
    await authService.forgotPassword(req.body.email);
    res.json({
        status: 'success',
        message: 'Reset code sent to email'
    });
});

exports.resetPassword = catchAsync(async (req, res) => {
    const { email, code, newPassword } = req.body;
    const token = await authService.resetPassword(email, code, newPassword);
    res.json({
        status: 'success',
        data: { token }
    });
});
