const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// 🔐 Register a new user
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.status(201).json({ success: true, message: 'User registered successfully', userId: user._id });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 🔐 Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '7d' });

    res.json({ success: true, token, userId: user._id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 📄 Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✏️ Update user profile
router.put('/:id', async (req, res) => {
  try {
    const { password, ...updateData } = req.body;

    if (password) {
      const salt = await bcrypt.genSalt(12);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password');
    if (!updatedUser) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// ⚖️ Get BMI for user
router.get('/:id/bmi', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const bmi = user.getBMI();
    res.json({ success: true, bmi });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 💪 Update health score (based on dish rating)
router.post('/:id/update-health', async (req, res) => {
  try {
    const { dishRating } = req.body; // expects a rating between 1-5

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const newScore = user.updateHealthScore(dishRating);
    await user.save();

    res.json({ success: true, healthScore: newScore });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
