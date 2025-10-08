const mongoose = require('mongoose');
const Menu = require('./models/Menu');
const Dish = require('./models/Dish');

const MONGODB_URI = 'mongodb://localhost:27017/restaurantDB'; // Replace with your Mongo URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('✅ Connected to MongoDB');

    await Menu.deleteMany(); // Clear old menus

    // Fetch all dishes to group them into menus
    const allDishes = await Dish.find();

    // Group dishes into two menus
    const menu1Dishes = allDishes.filter(d => ["Paneer Butter Masala", "Masala Dosa", "Rajma Chawal"].includes(d.name));
    const menu2Dishes = allDishes.filter(d => ["Chicken Biryani", "Chole Bhature", "Gulab Jamun"].includes(d.name));

    const menus = [
      {
        restaurantName: "Spice of South",
        uploadedBy: new mongoose.Types.ObjectId(), // Replace with real user ID
        imageUrl: "https://example.com/menus/spice-south-menu.jpg",
        cloudinaryId: "spice_south_menu_123",
        dishes: menu1Dishes.map(d => d._id),
        analysisStatus: "completed",
        ocrText: "Paneer Butter Masala, Masala Dosa, Rajma Chawal",
        location: {
          type: 'Point',
          coordinates: [77.5946, 12.9716], // Bengaluru
          address: "MG Road, Bengaluru, India"
        },
        tags: ["vegetarian", "south_indian"],
        averageHealthScore: 0, // to be calculated
        isPublic: true
      },
      {
        restaurantName: "Royal Tandoor",
        uploadedBy: new mongoose.Types.ObjectId(), // Replace with real user ID
        imageUrl: "https://example.com/menus/royal-tandoor-menu.jpg",
        cloudinaryId: "royal_tandoor_menu_456",
        dishes: menu2Dishes.map(d => d._id),
        analysisStatus: "completed",
        ocrText: "Chicken Biryani, Chole Bhature, Gulab Jamun",
        location: {
          type: 'Point',
          coordinates: [72.8777, 19.0760], // Mumbai
          address: "Andheri West, Mumbai, India"
        },
        tags: ["mughlai", "non_vegetarian", "street_food"],
        averageHealthScore: 0, // to be calculated
        isPublic: true
      }
    ];

    // Insert and calculate health score
    for (let menu of menus) {
      const m = new Menu(menu);
      await m.calculateAverageHealthScore();
      await m.save();
      console.log(`✅ Inserted menu: ${m.restaurantName}`);
    }

    mongoose.disconnect();
  })
  .catch(err => {
    console.error("❌ Error:", err);
    mongoose.disconnect();
  });
