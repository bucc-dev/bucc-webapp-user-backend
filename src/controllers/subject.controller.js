const Subject = require('../models/subject.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAllSubjects = catchAsync(async (req, res, next) => {
    const { level, semester } = req.query;
    const userLevel = req.user.level;
    const filterLevel = level ? { level } : { level: userLevel };
    const filterSemester = semester ? { semester } : {};

    const subjects = await Subject.find({
        ...filterLevel,
        ...filterSemester,
        course: req.user.course,
        approved: true
    }).populate('course');
    res.status(200).json({
        status: 'success',
        data: { subjects }
    });
});

exports.getSubject = catchAsync(async (req, res, next) => {
    const subject = await Subject.findOne({
        _id: req.params.id,
        approved: true
    }).populate('course');

    if (!subject) {
        return next(
            new AppError('No approved subject found with that ID', 404)
        );
    }

    res.status(200).json({
        status: 'success',
        data: { subject }
    });
});
