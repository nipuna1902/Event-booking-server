const express = require('express');
const router = express.Router();
const {
  bookEvent,
  cancelBooking,
  myBookings
} = require('../controllers/bookingControllers');

const auth = require('../middlewares/authMiddleware');

router.post('/:eventId', auth, bookEvent);
router.delete('/:eventId', auth, cancelBooking);
router.get('/my', auth, myBookings); 

module.exports = router;