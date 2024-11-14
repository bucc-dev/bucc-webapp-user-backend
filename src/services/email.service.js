const transporter = require('../config/mailer');

exports.sendPasswordResetEmail = async (email, resetCode) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Code',
        html: `
        <h1>Password Reset</h1>
        <p>Your password reset code is: <strong>${resetCode}</strong></p>
        <p>This code will expire in 10 minutes.</p>
      `
    };

    await transporter.sendMail(mailOptions);
};
