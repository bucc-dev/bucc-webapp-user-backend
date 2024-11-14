const Course = require('../models/course.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAllCourses = catchAsync(async (req, res, next) => {
    const courses = await Course.find({ approved: true });
    res.status(200).json({
        status: 'success',
        data: { courses }
    });
});

exports.getCourse = catchAsync(async (req, res, next) => {
    const course = await Course.findOne({ _id: req.params.id, approved: true });

    if (!course) {
        return next(new AppError('No approved course found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: { course }
    });
});
