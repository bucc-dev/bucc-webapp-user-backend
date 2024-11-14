const express = require('express');
const timetableController = require('../controllers/timetable.controller');

const router = express.Router();

router.get('/', timetableController.getTimetable);

module.exports = router;
