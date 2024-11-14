const Schedule = require('../models/schedule.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAllSchedules = catchAsync(async (req, res, next) => {
    const { course, level } = req.user;
    const { date } = req.query;

    const filter = {
        approved: true,
        course: { $in: course },
        level: { $in: level }
    };

    if (date) {
        filter.date = date;
    }

    const schedules = await Schedule.find(filter);

    res.status(200).json({
        status: 'success',
        data: { schedules }
    });
});

exports.getSchedule = catchAsync(async (req, res, next) => {
    const schedule = await Schedule.findOne({
        _id: req.params.id,
        approved: true
    });

    if (!schedule) {
        return next(
            new AppError('No approved schedule found with that ID', 404)
        );
    }

    res.status(200).json({
        status: 'success',
        data: { schedule }
    });
});
