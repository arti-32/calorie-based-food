
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [1, 'Age must be positive'],
    max: [120, 'Age must be realistic']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['male', 'female', 'other']
  },
  weight: {
    type: Number,
    required: [true, 'Weight is required'],
    min: [1, 'Weight must be positive']
  },
  height: {
    type: Number,
    required: [true, 'Height is required'],
    min: [1, 'Height must be positive']
  },
  activityLevel: {
    type: String,
    enum: ['sedentary', 'light', 'moderate', 'very_active', 'extra_active'],
    default: 'moderate'
  },
  medicalConditions: [{
    type: String,
    trim: true
  }],
  allergies: [{
    type: String,
    trim: true
  }],
  dietaryPreferences: [{
    type: String,
    trim: true
  }],
  dailyCalorieGoal: {
    type: Number,
    default: function() {
      // Basic BMR calculation (Mifflin-St Jeor Equation)
      let bmr;
      if (this.gender === 'male') {
        bmr = (10 * this.weight) + (6.25 * this.height) - (5 * this.age) + 5;
      } else {
        bmr = (10 * this.weight) + (6.25 * this.height) - (5 * this.age) - 161;
      }
      
      // Activity multiplier
      const multipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        very_active: 1.725,
        extra_active: 1.9
      };
      
      return Math.round(bmr * (multipliers[this.activityLevel] || 1.55));
    }
  },
  consumedCaloriesToday: {
    type: Number,
    default: 0
  },
  healthScore: {
    type: Number,
    default: 50,
    min: 0,
    max: 100
  },
  streak: {
    type: Number,
    default: 0
  },
  lastActiveDate: {
    type: Date,
    default: Date.now
  },
  profilePicture: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Calculate BMI
userSchema.methods.getBMI = function() {
  const heightInMeters = this.height / 100;
  return (this.weight / (heightInMeters * heightInMeters)).toFixed(1);
};

// Update health score based on food choices
userSchema.methods.updateHealthScore = function(dishRating) {
  const currentScore = this.healthScore;
  const newScore = Math.round((currentScore * 0.9) + (dishRating * 0.1));
  this.healthScore = Math.max(0, Math.min(100, newScore));
  return this.healthScore;
};

module.exports = mongoose.model('User', userSchema);
