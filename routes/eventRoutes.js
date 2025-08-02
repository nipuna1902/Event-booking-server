const express = require('express');
const router = express.Router();
const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent
} = require('../controllers/eventControllers');

const auth = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/adminMiddleware');

router.get('/', getEvents);

router.post('/', auth, adminOnly, createEvent);
router.put('/:id', auth, adminOnly, updateEvent);
router.delete('/:id', auth, adminOnly, deleteEvent);

module.exports = router;