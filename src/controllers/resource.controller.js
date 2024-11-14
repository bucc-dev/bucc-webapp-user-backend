const Resource = require('../models/resource.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAllResources = catchAsync(async (req, res, next) => {
    const resources = await Resource.find({
        subject: req.params.subjectId,
        approved: true
    });
    res.status(200).json({
        status: 'success',
        data: { resources }
    });
});
