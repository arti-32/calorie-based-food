const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: [true, 'Restaurant name is required'],
    trim: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String,
    required: [true, 'Menu image URL is required']
  },
  cloudinaryId: {
    type: String,
    required: true
  },
  dishes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish'
  }],
  analysisStatus: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  ocrText: {
    type: String,
    default: ''
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    },
    address: {
      type: String,
      trim: true
    }
  },
  tags: [{
    type: String,
    trim: true
  }],
  averageHealthScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  isPublic: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for geospatial queries
menuSchema.index({ location: '2dsphere' });

// Calculate average health score when dishes are updated
menuSchema.methods.calculateAverageHealthScore = async function() {
  await this.populate('dishes');
  
  if (this.dishes.length === 0) {
    this.averageHealthScore = 0;
    return 0;
  }
  
  const totalScore = this.dishes.reduce((sum, dish) => sum + dish.healthScore, 0);
  this.averageHealthScore = Math.round(totalScore / this.dishes.length);
  
  return this.averageHealthScore;
};

module.exports = mongoose.model('Menu', menuSchema);