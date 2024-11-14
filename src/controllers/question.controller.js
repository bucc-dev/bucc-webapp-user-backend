const Question = require('../models/question.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAllQuestions = catchAsync(async (req, res, next) => {
    const questions = await Question.find({
        subject: req.params.subjectId,
        approved: true
    });
    res.status(200).json({
        status: 'success',
        data: { questions }
    });
});
