const express = require('express');
const courseController = require('../controllers/course.controller');
// const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.get('/', courseController.getAllCourses);

// router.use(protect);

router.get('/:id', courseController.getCourse);

module.exports = router;
