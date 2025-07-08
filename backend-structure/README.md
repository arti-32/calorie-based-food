
# FoodPal Backend API

A Node.js/Express REST API for the FoodPal health-focused food recommendation app.

## Features

- User authentication & authorization (JWT)
- Health profile management (medical conditions, allergies, dietary preferences)
- Menu image upload and analysis
- Dish nutrition calculation and health scoring
- Personalized food recommendations
- User rating and preference learning system
- Calorie tracking and health analytics

## Setup Instructions

### 1. Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### 2. Installation

```bash
# Clone or create the backend directory
mkdir foodpal-backend
cd foodpal-backend

# Initialize npm and install dependencies
npm init -y
npm install express mongoose bcryptjs jsonwebtoken cors dotenv multer cloudinary helmet express-rate-limit validator

# Install development dependencies
npm install --save-dev nodemon jest

# Copy the provided files to your project directory
```

### 3. Environment Setup

```bash
# Copy the environment example file
cp .env.example .env

# Edit .env file with your actual values
```

Required environment variables:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure secret key for JWT tokens
- `CLOUDINARY_*`: Cloudinary credentials for image uploads
- `PORT`: Server port (default: 5000)

### 4. Database Setup

Make sure MongoDB is running and accessible via your `MONGODB_URI`.

### 5. Running the Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/calorie-update` - Update daily calorie intake

### Menus
- `POST /api/menus/upload` - Upload menu image
- `GET /api/menus` - Get user's uploaded menus
- `GET /api/menus/:id` - Get specific menu details

### Dishes
- `GET /api/dishes/menu/:menuId` - Get dishes from a menu
- `POST /api/dishes/:id/rate` - Rate a dish
- `GET /api/dishes/:id` - Get dish details

### Recommendations
- `POST /api/recommendations/analyze` - Analyze menu for user
- `GET /api/recommendations/personalized` - Get personalized recommendations

## Data Models

### User
- Personal info (name, email, age, gender, weight, height)
- Health data (medical conditions, allergies, dietary preferences)
- Nutrition goals and tracking
- Health score and streaks

### Menu
- Restaurant information
- Uploaded image and OCR text
- Associated dishes
- Location and metadata

### Dish
- Name, description, price, category
- Detailed nutritional information
- Ingredients and allergens
- Health score calculation
- User ratings and taste preferences

## Key Features Implementation

### Health Score Calculation
Dishes are scored (0-100) based on:
- Nutritional content (protein, fiber, sodium, sugar, etc.)
- Cooking method (grilled vs fried)
- Dietary tags (vegetarian, vegan, etc.)
- Allergen warnings

### Recommendation Engine
Recommendations consider:
- User's medical conditions and allergies
- Dietary preferences and restrictions
- Past ratings and taste preferences
- Nutritional goals and calorie limits
- Health score optimization

### Security Features
- Password hashing with bcrypt
- JWT token authentication
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- Helmet for security headers

## Testing

```bash
# Run tests (when implemented)
npm test
```

## Deployment

1. Set up MongoDB Atlas or your preferred MongoDB hosting
2. Configure environment variables for production
3. Deploy to your preferred platform (Heroku, DigitalOcean, AWS, etc.)
4. Update CORS settings for your frontend domain

## Integration with Frontend

The frontend should:
1. Store JWT token in localStorage/sessionStorage
2. Include token in Authorization header: `Bearer <token>`
3. Handle token expiration and refresh
4. Make API calls to the appropriate endpoints

Example frontend API call:
```javascript
const response = await fetch('http://localhost:5000/api/menus/upload', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(menuData)
});
```

## Future Enhancements

- Machine learning for better recommendations
- Real-time nutrition tracking
- Social features (sharing recommendations)
- Integration with fitness trackers
- Advanced analytics and reporting
- Push notifications for health goals
```
