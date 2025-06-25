const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: String, // Firebase UID
    required: true,
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  dateFrom: {
    type: Date,
    required: true,
  },
  dateTo: {
    type: Date,
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
