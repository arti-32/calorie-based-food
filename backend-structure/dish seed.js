const extraDishes = [
  {
    name: "Rajma Chawal",
    description: "Red kidney beans cooked in a thick curry, served with rice.",
    price: 160,
    currency: "INR",
    menu: new mongoose.Types.ObjectId(),
    category: "main_course",
    ingredients: [
      {
        name: "Rajma (Kidney Beans)",
        quantity: "100g",
        allergens: [],
        nutritionalValue: {
          calories: 140,
          protein: 9,
          carbs: 22,
          fat: 1,
          fiber: 6,
          sugar: 1,
          sodium: 250
        }
      },
      {
        name: "Rice",
        quantity: "100g",
        allergens: [],
        nutritionalValue: {
          calories: 130,
          protein: 3,
          carbs: 28,
          fat: 0.3,
          fiber: 0.5,
          sugar: 0,
          sodium: 10
        }
      }
    ],
    nutritionalInfo: {
      calories: 270,
      protein: 12,
      carbs: 50,
      fat: 1.3,
      fiber: 6.5,
      sugar: 1,
      sodium: 260,
      cholesterol: 0,
      saturatedFat: 0,
      transFat: 0
    },
    allergens: [],
    dietaryTags: ["vegetarian", "gluten_free"],
    healthScore: 0,
    spiceLevel: "medium",
    cookingMethod: "boiled",
    ratings: [
      {
        user: new mongoose.Types.ObjectId(),
        rating: 4,
        review: "Comfort food at its best.",
        taste: "umami"
      }
    ],
    averageRating: 0,
    imageUrl: "https://example.com/images/rajma-chawal.jpg",
    isAvailable: true,
    preparationTime: 25
  },

  {
    name: "Chole Bhature",
    description: "Spicy chickpea curry served with deep-fried fluffy bread.",
    price: 180,
    currency: "INR",
    menu: new mongoose.Types.ObjectId(),
    category: "main_course",
    ingredients: [
      {
        name: "Chickpeas",
        quantity: "150g",
        allergens: [],
        nutritionalValue: {
          calories: 200,
          protein: 10,
          carbs: 30,
          fat: 4,
          fiber: 7,
          sugar: 3,
          sodium: 400
        }
      },
      {
        name: "Bhatura",
        quantity: "1 piece",
        allergens: ["gluten"],
        nutritionalValue: {
          calories: 250,
          protein: 5,
          carbs: 35,
          fat: 10,
          fiber: 2,
          sugar: 1,
          sodium: 150
        }
      }
    ],
    nutritionalInfo: {
      calories: 450,
      protein: 15,
      carbs: 65,
      fat: 14,
      fiber: 9,
      sugar: 4,
      sodium: 550,
      cholesterol: 5,
      saturatedFat: 3,
      transFat: 0
    },
    allergens: ["gluten"],
    dietaryTags: ["vegetarian"],
    healthScore: 0,
    spiceLevel: "medium",
    cookingMethod: "fried",
    ratings: [
      {
        user: new mongoose.Types.ObjectId(),
        rating: 5,
        review: "Perfect street food taste!",
        taste: "spicy"
      }
    ],
    averageRating: 0,
    imageUrl: "https://example.com/images/chole-bhature.jpg",
    isAvailable: true,
    preparationTime: 30
  },

  {
    name: "Gulab Jamun",
    description: "Deep-fried milk balls soaked in cardamom-flavored sugar syrup.",
    price: 90,
    currency: "INR",
    menu: new mongoose.Types.ObjectId(),
    category: "dessert",
    ingredients: [
      {
        name: "Milk Solids (Khoya)",
        quantity: "50g",
        allergens: ["dairy"],
        nutritionalValue: {
          calories: 150,
          protein: 4,
          carbs: 15,
          fat: 8,
          fiber: 0,
          sugar: 10,
          sodium: 50
        }
      },
      {
        name: "Sugar Syrup",
        quantity: "50ml",
        allergens: [],
        nutritionalValue: {
          calories: 120,
          protein: 0,
          carbs: 30,
          fat: 0,
          fiber: 0,
          sugar: 30,
          sodium: 0
        }
      }
    ],
    nutritionalInfo: {
      calories: 270,
      protein: 4,
      carbs: 45,
      fat: 8,
      fiber: 0,
      sugar: 40,
      sodium: 50,
      cholesterol: 10,
      saturatedFat: 5,
      transFat: 0
    },
    allergens: ["dairy"],
    dietaryTags: ["vegetarian"],
    healthScore: 0,
    spiceLevel: "mild",
    cookingMethod: "fried",
    ratings: [
      {
        user: new mongoose.Types.ObjectId(),
        rating: 5,
        review: "Sweet and soft!",
        taste: "sweet"
      }
    ],
    averageRating: 0,
    imageUrl: "https://example.com/images/gulab-jamun.jpg",
    isAvailable: true,
    preparationTime: 10
  }
];
