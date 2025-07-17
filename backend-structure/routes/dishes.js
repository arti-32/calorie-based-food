const express = require('express');
const router = express.Router();
const Dish = require('../models/Dish');

// 👉 Create a new dish
router.post('/', async (req, res) => {
  try {
    const dish = new Dish(req.body);

    // Automatically calculate health score
    dish.calculateHealthScore();

    await dish.save();
    res.status(201).json({ success: true, dish });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// 👉 Get all dishes
router.get('/', async (req, res) => {
  try {
    const dishes = await Dish.find().populate('menu').populate('ratings.user');
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 👉 Get a single dish by ID
router.get('/:id', async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id).populate('ratings.user');
    if (!dish) return res.status(404).json({ success: false, message: 'Dish not found' });
    res.json(dish);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 👉 Update a dish by ID
router.put('/:id', async (req, res) => {
  try {
    const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dish) return res.status(404).json({ success: false, message: 'Dish not found' });

    // Recalculate health score
    dish.calculateHealthScore();
    await dish.save();

    res.json({ success: true, dish });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// 👉 Delete a dish by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Dish.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Dish not found' });
    res.json({ success: true, message: 'Dish deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ⭐ Rate a dish
router.post('/:id/rate', async (req, res) => {
  const { userId, rating, review, taste } = req.body;

  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) return res.status(404).json({ success: false, message: 'Dish not found' });

    // Push new rating
    dish.ratings.push({
      user: userId,
      rating,
      review,
      taste
    });

    // Recalculate average rating and save
    dish.calculateAverageRating();
    await dish.save();

    res.json({ success: true, dish });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 📊 Get taste profile
router.get('/:id/taste-profile', async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) return res.status(404).json({ success: false, message: 'Dish not found' });

    const tasteProfile = dish.getTasteProfile();
    res.json({ tasteProfile });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
