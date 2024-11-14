const express = require('express');
const questionController = require('../controllers/question.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router.get('/:subjectId', questionController.getAllQuestions);

module.exports = router;
