const express = require('express');
const resourceController = require('../controllers/resource.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router.get('/:subjectId', resourceController.getAllResources);

module.exports = router;
