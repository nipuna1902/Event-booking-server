const Booking = require('../models/Booking');
const Event = require('../models/Event');

exports.bookEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.bookedSeats >= event.capacity) {
      return res.status(400).json({ message: 'Event is fully booked' });
    }

    const existing = await Booking.findOne({ user: req.user.id, event: event._id });
    if (existing) return res.status(400).json({ message: 'You already booked this event' });

    const booking = new Booking({ user: req.user.id, event: event._id });
    await booking.save();

    event.bookedSeats += 1;
    await event.save();

    res.status(201).json({ message: 'Event booked successfully', booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({
      user: req.user.id,
      event: req.params.eventId
    });

    if (!booking) return res.status(404).json({ message: 'No booking found to cancel' });

    const event = await Event.findById(booking.event);
    if (event && event.bookedSeats > 0) {
      event.bookedSeats -= 1;
      await event.save();
    }

    res.status(200).json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.myBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('event');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};