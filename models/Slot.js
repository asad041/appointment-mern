const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  available: [
    {
      day: {
        type: String,
        required: true,
        unique: true
      },
      total: {
        type: Number,
        required: true
      },
      status: {
        type: Boolean,
        default: true
      },
      opening: {
        type: String,
        required: true
      },
      closing: {
        type: String,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Slot = mongoose.model('slot', SlotSchema);
