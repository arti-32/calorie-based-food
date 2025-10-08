const mongoose = require('mongoose');
const User = require('./models/User');

const MONGODB_URI = 'mongodb://localhost:27017/restaurantDB'; // Replace if needed

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('✅ Connected to MongoDB');

    await User.deleteMany(); // Clean slate

    const users = [
      {
        name: "Aarav Sharma",
        email: "aarav.sharma@example.com",
        password: "password123",
        age: 28,
        gender: "male",
        weight: 70, // kg
        height: 175, // cm
        activityLevel: "moderate",
        medicalConditions: [],
        allergies: ["peanuts"],
        dietaryPreferences: ["vegetarian"],
        profilePicture: "https://example.com/profiles/aarav.jpg"
      },
      {
        name: "Meera Kapoor",
        email: "meera.kapoor@example.com",
        password: "securepass",
        age: 32,
        gender: "female",
        weight: 60,
        height: 165,
        activityLevel: "light",
        medicalConditions: ["diabetes"],
        allergies: [],
        dietaryPreferences: ["vegan"],
        profilePicture: "https://example.com/profiles/meera.jpg"
      },
      {
        name: "Rohan Verma",
        email: "rohan.verma@example.com",
        password: "rohan2023",
        age: 24,
        gender: "male",
        weight: 80,
        height: 180,
        activityLevel: "very_active",
        medicalConditions: [],
        allergies: ["gluten"],
        dietaryPreferences: [],
        profilePicture: "https://example.com/profiles/rohan.jpg"
      }
    ];

    for (const userData of users) {
      const user = new User(userData);
      await user.save(); // auto-hashes password, calculates calorieGoal
      console.log(`✅ User created: ${user.name} | BMI: ${user.getBMI()} | Daily Calorie Goal: ${user.dailyCalorieGoal}`);
    }

    mongoose.disconnect();
  })
  .catch(err => {
    console.error("❌ Error:", err);
    mongoose.disconnect();
  });
