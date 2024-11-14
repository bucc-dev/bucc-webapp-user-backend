const express = require('express');
const subjectController = require('../controllers/subject.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router.get('/', subjectController.getAllSubjects);
router.get('/:id', subjectController.getSubject);

module.exports = router;
