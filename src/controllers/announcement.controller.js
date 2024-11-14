const Announcement = require('../models/announcement.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAllAnnouncements = catchAsync(async (req, res, next) => {
    const { course, level } = req.user;

    const announcements = await Announcement.find({
        approved: true,
        course: { $in: course },
        level: { $in: level }
    });

    res.status(200).json({
        status: 'success',
        data: { announcements }
    });
});

exports.getAnnouncement = catchAsync(async (req, res, next) => {
    const announcement = await Announcement.findOne({
        _id: req.params.id,
        approved: true
    });

    if (!announcement) {
        return next(
            new AppError('No approved announcement found with that ID', 404)
        );
    }

    res.status(200).json({
        status: 'success',
        data: { announcement }
    });
});
