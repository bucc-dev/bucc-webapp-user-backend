const express = require('express');
const announcementController = require('../controllers/announcement.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router.get('/', announcementController.getAllAnnouncements);
router.get('/:id', announcementController.getAnnouncement);

module.exports = router;
