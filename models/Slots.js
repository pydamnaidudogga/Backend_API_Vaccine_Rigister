const mongoose = require('mongoose');
const slotSchema = new mongoose.Schema({
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    availableDoses: {
      type: Number,
      default: 10,
    },
  });
  
  const Slot = mongoose.model('Slot', slotSchema);
  module.exports = Slot;