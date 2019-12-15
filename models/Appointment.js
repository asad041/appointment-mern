const mongoose = require('mongoose');
const config = require('config');

const AppointmentSchema = mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: config.get('appointmentStatus'),
    default: 'requested'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Appointment = mongoose.model('appointment', AppointmentSchema);
