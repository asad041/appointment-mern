const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const auth = require('../../middleware/auth');
const Slot = require('../../models/Slot');
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
      return res.status(400).json({ msg: 'There is no slot for this user' });
    }
    res.json(slot);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/slots
// @desc    Create or update user slots
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('day', 'Day is required')
        .not()
        .isEmpty()
        .isIn([
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ])
        .withMessage('Must be a valid week day'),
      check('total', 'Number of slots is required')
        .not()
        .isEmpty()
        .isNumeric()
        .withMessage('Must be a numeric value'),
      check('opening', 'Opening time is required')
        .not()
        .isEmpty()
        .isLength({ min: 4, max: 4 })
        .withMessage('Must be with the format 0000'),
      check('closing', 'Closing time is required')
        .not()
        .isEmpty()
        .isLength({ min: 4, max: 4 })
        .withMessage('Must be with the format 0000')
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { day, total, opening, closing, status } = req.body;

    const availSlot = { day, total, opening, closing };
    if (status) availSlot.status = status;

    try {
      let slot = await Slot.findOne({ user: req.user.id });

      if (slot) {
        const index = slot.available.findIndex(item => item.day === day);

        if (index !== -1) {
          slot.available[index] = availSlot;
        } else {
          slot.available.unshift(availSlot);
        }

        slot = await Slot.findOneAndUpdate(
          { user: req.user.id },
          { $set: slot },
          { new: true }
        );
        return res.json(slot);
      }

      // create
      const slotFields = {};
      slotFields.user = req.user.id;
      slotFields.available = [];
      slotFields.available.unshift(availSlot);
      slot = new Slot(slotFields);

      await slot.save();
      res.json(slot);
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
    const slots = await Slot.find().populate('user', ['name']);
    res.json(slots);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/slots/user/:user_id
// @desc    Get slot by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const slot = await Slot.findOne({
      user: req.params.user_id
    }).populate('user', ['name']);

    if (!slot) {
      return res.status(400).json({ msg: 'Slot not found' });
    }

    res.json(slot);
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Slot not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
