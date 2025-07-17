const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');
const Dish = require('../models/Dish');
const User = require('../models/User');

// 🆕 Create a new menu
router.post('/', async (req, res) => {
  try {
    const menu = new Menu(req.body);
    await menu.save();

    res.status(201).json({ success: true, menu });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 📥 Get all menus
router.get('/', async (req, res) => {
  try {
    const menus = await Menu.find()
      .populate('uploadedBy', 'name email')
      .populate('dishes');
    res.json({ success: true, menus });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 📄 Get a menu by ID
router.get('/:id', async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id)
      .populate('uploadedBy', 'name')
      .populate('dishes');
    if (!menu) return res.status(404).json({ success: false, message: 'Menu not found' });

    res.json({ success: true, menu });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🧠 Recalculate average health score for a menu
router.post('/:id/recalculate-health-score', async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id).populate('dishes');
    if (!menu) return res.status(404).json({ success: false, message: 'Menu not found' });

    const score = await menu.calculateAverageHealthScore();
    await menu.save();

    res.json({ success: true, averageHealthScore: score });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🏷️ Update menu tags, analysis status, or ocrText
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;
    const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!updatedMenu) return res.status(404).json({ success: false, message: 'Menu not found' });

    res.json({ success: true, menu: updatedMenu });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 📍 Optional: Get menus near a location
router.get('/nearby/search', async (req, res) => {
  const { lat, lng, radius = 5000 } = req.query;

  try {
    const menus = await Menu.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseFloat(radius)
        }
      }
    });

    res.json({ success: true, menus });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
