const express = require('express');
const scheduleController = require('../controllers/schedule.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router.get('/', scheduleController.getAllSchedules);
router.get('/:id', scheduleController.getSchedule);

module.exports = router;
