const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const config = require('config');

const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Slot = require('../../models/Slot');
const Appointment = require('../../models/Appointment');

// @route   GET api/appointment
// @desc    Get buyer/seller appointments
// @access  Private
router.get('/:user_type/:status?', auth, async (req, res) => {
  try {
    const { user_type, status } = req.params;

    if (user_type !== 'buyer' && user_type !== 'seller') {
      return res.status(400).json({ msg: 'Invalid user type' });
    }

    let appointmentStatus = config.get('appointmentStatus');
    let condition = {};
    let populateBy = '';
    if (user_type === 'buyer') {
      condition.buyer = req.user.id;
      populateBy = 'seller';
    } else if (user_type === 'seller') {
      condition.seller = req.user.id;
      populateBy = 'buyer';
    }

    if (status && appointmentStatus.includes(status)) {
      condition.status = status;
    }

    const appointments = await Appointment.find(condition).populate(
      populateBy,
      ['name', 'email']
    );

    if (appointments.length === 0) {
      return res.status(400).json({ msg: 'No appointments found' });
    }

    res.json(appointments);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/appointment/add
// @desc    Request a appointment
// @access  Private
router.post(
  '/add',
  [
    auth,
    [
      check('description')
        .optional()
        .isLength({ max: 300 }),
      check('seller')
        .not()
        .isEmpty()
        .withMessage('Please select a seller slot')
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { seller, description } = req.body;

    if (req.user.id === seller) {
      return res
        .status(400)
        .json({ msg: "You can't allocate slot to yourself" });
    }

    try {
      const slot = await Slot.findOne({ user: seller });

      if (!slot) {
        return res.status(400).json({
          msg: 'The requested seller slot is not available at the moment'
        });
      }

      const appointments = await Appointment.find({
        seller: seller,
        status: 'accepted'
      });

      if (appointments.length >= slot.total) {
        return res.status(400).json({ msg: 'There is no slot available' });
      }

      const appointmentFields = { seller: seller, buyer: req.user.id };
      if (description) appointmentFields.description = description;

      const appointment = new Appointment(appointmentFields);
      await appointment.save();

      res.json(appointment);
    } catch (error) {
      console.log(error.message);
      if (error.kind === 'ObjectId') {
        return res.status(400).json({ msg: 'Slot not found' });
      }
      res.status(500).send('Server error');
    }
  }
);

// @route   Update api/appointment/update
// @desc    Update appointment status
// @access  Private
router.put(
  '/update',
  [
    auth,
    [
      check('id', 'Appointment is required')
        .not()
        .isEmpty(),
      check('status', 'Please select a valid status').isIn([
        'accepted',
        'rejected',
        'completed'
      ])
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, status } = req.body;

    try {
      let appointment = await Appointment.findOne({
        _id: id,
        seller: req.user.id
      });

      if (!appointment) {
        return res.status(400).json({
          msg: 'Appointment not found'
        });
      }

      appointment.status = status;

      appointment = await Appointment.findOneAndUpdate(
        { _id: id },
        { $set: appointment },
        { new: true }
      ).populate('buyer', ['name', 'email']);

      res.json(appointment);
    } catch (error) {
      console.log(error.message);
      if (error.kind === 'ObjectId') {
        return res.status(400).json({ msg: 'Appointment not found' });
      }
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
