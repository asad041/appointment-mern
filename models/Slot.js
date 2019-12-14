const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  total: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Slot = mongoose.model('slot', SlotSchema);
