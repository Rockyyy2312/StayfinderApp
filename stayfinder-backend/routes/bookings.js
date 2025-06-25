const express = require("express");
const router = express.Router();
const firebaseAuth = require("../middleware/firebaseAuth");
const Booking = require("../models/Booking");

// Create a booking (Protected)
router.post("/", firebaseAuth, async (req, res) => {
  try {
    const { propertyId, dateFrom, dateTo } = req.body;

    const booking = new Booking({
      userId: req.user.uid, // From Firebase token
      propertyId,
      dateFrom,
      dateTo,
    });

    await booking.save();
    res.status(201).json({ message: "Booking created", booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
