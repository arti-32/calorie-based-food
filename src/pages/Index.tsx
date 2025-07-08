
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Utensils, Camera, Star, TrendingUp, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const features = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Health-First Recommendations",
      description: "Get personalized food suggestions based on your medical conditions and dietary needs"
    },
    {
      icon: <Camera className="h-8 w-8 text-blue-500" />,
      title: "Menu Scanner",
      description: "Upload restaurant menus and get instant health analysis and recommendations"
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      title: "Smart Preference Learning",
      description: "Rate dishes to help our AI learn your taste preferences and suggest similar items"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-500" />,
      title: "Nutrition Tracking",
      description: "Track calories, nutrients, and dietary goals with detailed ingredient analysis"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      condition: "Diabetic",
      text: "FoodPal has transformed how I eat out. I never have to worry about hidden sugars anymore!",
      rating: 5
    },
    {
      name: "Mike Chen",
      condition: "Heart Disease",
      text: "The sodium tracking feature has been a game-changer for my heart health journey.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      condition: "Gluten Intolerant",
      text: "Finally, an app that understands my dietary restrictions and still finds delicious options!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Utensils className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              FoodPal
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button 
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              onClick={() => navigate('/register')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-200">
            <Shield className="h-4 w-4 mr-1" />
            Your Personal Health Companion
          </Badge>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Eat Smart, Live Better
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover personalized food recommendations tailored to your health conditions, 
            dietary preferences, and nutritional goals. Make every meal count with FoodPal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-lg px-8 py-6"
              onClick={() => navigate('/register')}
            >
              Start Your Health Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-2 hover:bg-white/50"
              onClick={() => navigate('/demo')}
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4 text-gray-800">
            Why Choose FoodPal?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform combines health expertise with culinary intelligence 
            to give you the best dining experience possible.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4 text-gray-800">
            Real Stories, Real Results
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how FoodPal has helped people with various health conditions 
            make better food choices and improve their quality of life.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {testimonial.condition}
                    </Badge>
                  </div>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-green-500 to-blue-500 border-none text-white">
          <CardContent className="text-center py-12">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Transform Your Eating Habits?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who have improved their health with personalized food recommendations.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-green-600 hover:bg-gray-50 text-lg px-8 py-6"
              onClick={() => navigate('/register')}
            >
              Get Started Free
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Utensils className="h-5 w-5 text-white" />
            </div>
            <h4 className="text-xl font-bold">FoodPal</h4>
          </div>
          <p className="text-gray-400">
            Your trusted companion for healthier eating choices
          </p>
          <p className="text-gray-500 text-sm mt-4">
            © 2024 FoodPal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
