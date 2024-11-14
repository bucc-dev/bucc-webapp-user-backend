const Timetable = require('../models/timetable.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getTimetable = catchAsync(async (req, res, next) => {
    const filter = {
        approved: true,
        level: req.user.level,
        course: req.user.course
    };

    const timetable = await Timetable.findOne(filter).populate('course');

    if (!timetable) {
        return next(
            new AppError(
                'No approved timetable found for your level and course.',
                404
            )
        );
    }

    res.status(200).json({
        status: 'success',
        data: { timetable }
    });
});
