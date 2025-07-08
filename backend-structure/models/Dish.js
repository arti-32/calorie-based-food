
const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: String,
    trim: true
  },
  allergens: [{
    type: String,
    trim: true
  }],
  nutritionalValue: {
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
    fiber: { type: Number, default: 0 },
    sugar: { type: Number, default: 0 },
    sodium: { type: Number, default: 0 }
  }
});

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Dish name is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  currency: {
    type: String,
    default: 'USD',
    trim: true
  },
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['appetizer', 'main_course', 'dessert', 'beverage', 'side_dish', 'soup', 'salad', 'other']
  },
  ingredients: [ingredientSchema],
  nutritionalInfo: {
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
    fiber: { type: Number, default: 0 },
    sugar: { type: Number, default: 0 },
    sodium: { type: Number, default: 0 },
    cholesterol: { type: Number, default: 0 },
    saturatedFat: { type: Number, default: 0 },
    transFat: { type: Number, default: 0 }
  },
  allergens: [{
    type: String,
    trim: true
  }],
  dietaryTags: [{
    type: String,
    enum: ['vegetarian', 'vegan', 'gluten_free', 'dairy_free', 'nut_free', 'low_carb', 'keto', 'paleo', 'halal', 'kosher']
  }],
  healthScore: {
    type: Number,
    default: 50,
    min: 0,
    max: 100
  },
  spiceLevel: {
    type: String,
    enum: ['mild', 'medium', 'hot', 'very_hot'],
    default: 'mild'
  },
  cookingMethod: {
    type: String,
    enum: ['grilled', 'baked', 'fried', 'steamed', 'boiled', 'raw', 'sauteed', 'roasted', 'other']
  },
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    review: {
      type: String,
      trim: true
    },
    taste: {
      type: String,
      enum: ['sweet', 'salty', 'sour', 'bitter', 'umami', 'spicy'],
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  imageUrl: {
    type: String
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  preparationTime: {
    type: Number, // in minutes
    min: 0
  }
}, {
  timestamps: true
});

// Calculate health score based on nutritional info and ingredients
dishSchema.methods.calculateHealthScore = function() {
  let score = 50; // Base score
  
  const nutrition = this.nutritionalInfo;
  
  // Positive factors
  if (nutrition.protein > 20) score += 10;
  if (nutrition.fiber > 5) score += 10;
  if (this.dietaryTags.includes('vegetarian')) score += 5;
  if (this.dietaryTags.includes('vegan')) score += 10;
  if (this.dietaryTags.includes('gluten_free')) score += 5;
  if (this.cookingMethod === 'grilled' || this.cookingMethod === 'steamed' || this.cookingMethod === 'baked') score += 10;
  
  // Negative factors
  if (nutrition.sodium > 1000) score -= 15;
  if (nutrition.sugar > 20) score -= 10;
  if (nutrition.saturatedFat > 10) score -= 10;
  if (nutrition.transFat > 0) score -= 20;
  if (this.cookingMethod === 'fried') score -= 15;
  if (nutrition.calories > 800) score -= 10;
  
  // Ensure score is within bounds
  this.healthScore = Math.max(0, Math.min(100, score));
  return this.healthScore;
};

// Calculate average rating
dishSchema.methods.calculateAverageRating = function() {
  if (this.ratings.length === 0) {
    this.averageRating = 0;
    return 0;
  }
  
  const totalRating = this.ratings.reduce((sum, rating) => sum + rating.rating, 0);
  this.averageRating = (totalRating / this.ratings.length).toFixed(1);
  
  return this.averageRating;
};

// Get taste preferences from ratings
dishSchema.methods.getTasteProfile = function() {
  const tastes = {};
  this.ratings.forEach(rating => {
    tastes[rating.taste] = (tastes[rating.taste] || 0) + 1;
  });
  return tastes;
};

module.exports = mongoose.model('Dish', dishSchema);
