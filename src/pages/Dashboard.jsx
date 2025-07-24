
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Camera, 
  TrendingUp, 
  Heart, 
  Utensils, 
  Star, 
  Calendar,
  Target,
  Activity,
  Award,
  Upload,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useUserData } from "@/hooks/useUserData";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  // Get user data from Supabase
  const { profile, conditions, allergies, preferences, recentMeals, loading, error } = useUserData(user);

  // Get current user
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getCurrentUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    navigate("/");
    return null;
  }

  const recommendations = [
    { 
      title: "Upload Today's Menu", 
      description: "Scan a restaurant menu to get personalized recommendations",
      icon: <Camera className="h-6 w-6" />,
      action: () => navigate("/scan-menu"),
      color: "bg-blue-500"
    },
    { 
      title: "View Health Analytics", 
      description: "Check your nutrition trends and health insights",
      icon: <TrendingUp className="h-6 w-6" />,
      action: () => navigate("/analytics"),
      color: "bg-green-500"
    },
    { 
      title: "Update Profile", 
      description: "Modify your health conditions or preferences",
      icon: <User className="h-6 w-6" />,
      action: () => navigate("/profile"),
      color: "bg-purple-500"
    }
  ];

  const achievements = [
    { name: "Health Streak", value: `${profile?.streak || 0} days`, icon: <Zap className="h-5 w-5" /> },
    { name: "Meals Rated", value: recentMeals.length.toString(), icon: <Star className="h-5 w-5" /> },
    { name: "Health Score", value: `${profile?.health_score || 0}%`, icon: <Heart className="h-5 w-5" /> }
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
            <Button variant="ghost" onClick={() => navigate("/profile")}>
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button variant="ghost" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {profile?.name || 'User'}! 👋
          </h2>
          <p className="text-gray-600">
            Ready to make healthier food choices today?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Calories</CardTitle>
              <Target className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {profile?.consumed_calories || 0}/{profile?.daily_calorie_goal || 2000}
              </div>
              <Progress 
                value={((profile?.consumed_calories || 0) / (profile?.daily_calorie_goal || 2000)) * 100} 
                className="mt-2"
              />
              <p className="text-xs text-gray-600 mt-1">
                {(profile?.daily_calorie_goal || 2000) - (profile?.consumed_calories || 0)} calories remaining
              </p>
            </CardContent>
          </Card>

          {achievements.map((achievement, index) => (
            <Card key={index} className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{achievement.name}</CardTitle>
                <div className="text-green-500">{achievement.icon}</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {achievement.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {recommendations.map((rec, index) => (
            <Card key={index} className="bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={rec.action}>
              <CardHeader>
                <div className={`w-12 h-12 ${rec.color} rounded-lg flex items-center justify-center text-white mb-3`}>
                  {rec.icon}
                </div>
                <CardTitle className="text-lg">{rec.title}</CardTitle>
                <CardDescription>{rec.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Health Profile Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-500" />
                Health Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Medical Conditions</h4>
                <div className="flex flex-wrap gap-2">
                  {conditions.length > 0 ? conditions.map((condition) => (
                    <Badge key={condition} className="bg-red-100 text-red-700">
                      {condition}
                    </Badge>
                  )) : (
                    <p className="text-sm text-gray-500">No conditions added</p>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Allergies</h4>
                <div className="flex flex-wrap gap-2">
                  {allergies.length > 0 ? allergies.map((allergy) => (
                    <Badge key={allergy} className="bg-orange-100 text-orange-700">
                      {allergy}
                    </Badge>
                  )) : (
                    <p className="text-sm text-gray-500">No allergies added</p>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Dietary Preferences</h4>
                <div className="flex flex-wrap gap-2">
                  {preferences.length > 0 ? preferences.map((preference) => (
                    <Badge key={preference} className="bg-green-100 text-green-700">
                      {preference}
                    </Badge>
                  )) : (
                    <p className="text-sm text-gray-500">No preferences added</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-blue-500" />
                Recent Meals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMeals.map((meal, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{meal.name}</h4>
                      <p className="text-sm text-gray-600">{meal.restaurant}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary">{meal.calories} cal</Badge>
                        <Badge className="bg-green-100 text-green-700">
                          Health: {meal.health_score || 0}%
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{meal.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-green-500 to-blue-500 border-none text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Ready to scan a menu?</h3>
                <p className="opacity-90">
                  Upload a restaurant menu and get instant health-conscious recommendations
                </p>
              </div>
              <Button 
                size="lg" 
                className="bg-white text-green-600 hover:bg-gray-50"
                onClick={() => navigate("/scan-menu")}
              >
                <Upload className="h-5 w-5 mr-2" />
                Scan Menu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
