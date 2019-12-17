const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const auth = require('../../middleware/auth');
const Slot = require('../../models/Slot');
const Appointment = require('../../models/Appointment');
const User = require('../../models/User');

// @route   GET api/slots/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const slot = await Slot.findOne({ user: req.user.id }).populate('user', [
      'name'
    ]);

    if (!slot) {
      return res
        .status(400)
        .json({ msg: 'Available slot configuration not found' });
    }
    res.json(slot);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/slots
// @desc    Create or update slots
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('total', 'Number of slots is required')
        .isNumeric()
        .withMessage('Must be a numeric value'),
      check('description')
        .optional()
        .isLength({ max: 400 })
        .withMessage('Description must be 400 chars or less')
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { total, description } = req.body;

    try {
      let slot = await Slot.findOne({ user: req.user.id });

      if (slot) {
        slot.total = total;
        if (description) slot.description = description;
        slot = await Slot.findOneAndUpdate(
          { user: req.user.id },
          { $set: slot },
          { new: true }
        );
        return res.json(slot);
      }

      // create
      const slotFields = { total, user: req.user.id };
      if (description) slotFields.description = description;
      slot = new Slot(slotFields);
      await slot.save();
      res.json(slot);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST api/search
// @desc    Get all matched user and slots
// @access  Public
router.post(
  '/search',
  [
    check('name', 'User name is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name } = req.body;

      const user = await User.findOne({
        name: { $regex: new RegExp(name, 'ig') }
      });

      if (!user) {
        return res.status(400).json({ msg: 'No seller found!' });
      }

      const slots = await Slot.find({ user: user._id }).populate('user', [
        'name',
        'email',
        'level'
      ]);

      // if (slots.length < 1) {
      //   return res.status(400).json({ msg: 'No sellers found' });
      // }

      res.json(slots);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/slots
// @desc    Get all slots
// @access  Public
router.get('/', async (req, res) => {
  try {
    const slots = await Slot.find().populate('user', ['name', 'email']);
    res.json(slots);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/slots/user/:user_id
// @desc    Get slot by user ID
// @access  Private
router.get('/user/:user_id', async (req, res) => {
  try {
    const slot = await Slot.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'email']);

    if (!slot) {
      return res.status(400).json({ msg: 'Slot not found' });
    }

    const appointments = await Appointment.find({
      seller: req.params.user_id,
      status: 'accepted'
    });

    const accepted = appointments.length;

    res.json({ slot, accepted });
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Slot not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
