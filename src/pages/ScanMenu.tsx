
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  Camera, 
  Upload, 
  Star, 
  Heart, 
  AlertTriangle, 
  CheckCircle,
  Utensils,
  ArrowLeft,
  Zap,
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ScanMenu = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [menuText, setMenuText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Mock analysis results
  const mockAnalysisResults = {
    dishes: [
      {
        id: 1,
        name: "Grilled Salmon with Quinoa",
        price: "$24.99",
        description: "Atlantic salmon grilled with herbs, served with quinoa pilaf and steamed broccoli",
        healthScore: 95,
        calories: 480,
        protein: 42,
        carbs: 28,
        fat: 18,
        fiber: 6,
        sodium: 420,
        sugar: 3,
        rating: null,
        recommendation: "Excellent",
        reasons: [
          "High in omega-3 fatty acids",
          "Good protein source",
          "Low sodium content",
          "Diabetes-friendly"
        ],
        warnings: [],
        tags: ["Heart Healthy", "Diabetes Friendly", "High Protein"],
        suitability: "perfect"
      },
      {
        id: 2,
        name: "Margherita Pizza",
        price: "$18.99",
        description: "Classic pizza with tomato sauce, mozzarella, and fresh basil",
        healthScore: 45,
        calories: 720,
        protein: 24,
        carbs: 85,
        fat: 28,
        fiber: 4,
        sodium: 1240,
        sugar: 8,
        rating: null,
        recommendation: "Caution",
        reasons: [
          "High in refined carbs",
          "High sodium content",
          "Can spike blood sugar"
        ],
        warnings: [
          "High sodium - may affect blood pressure",
          "High carbs - monitor blood sugar"
        ],
        tags: ["High Carb", "High Sodium"],
        suitability: "caution"
      },
      {
        id: 3,
        name: "Caesar Salad with Grilled Chicken",
        price: "$16.99",
        description: "Romaine lettuce, parmesan cheese, croutons, and grilled chicken with Caesar dressing",
        healthScore: 72,
        calories: 420,
        protein: 35,
        carbs: 18,
        fat: 24,
        fiber: 5,
        sodium: 680,
        sugar: 4,
        rating: null,
        recommendation: "Good",
        reasons: [
          "Good protein content",
          "Moderate calories",
          "Contains healthy fats"
        ],
        warnings: [
          "Dressing is high in fat"
        ],
        tags: ["High Protein", "Moderate Calories"],
        suitability: "good"
      },
      {
        id: 4,
        name: "Chocolate Lava Cake",
        price: "$12.99",
        description: "Warm chocolate cake with molten center, served with vanilla ice cream",
        healthScore: 15,
        calories: 890,
        protein: 8,
        carbs: 95,
        fat: 52,
        fiber: 3,
        sodium: 320,
        sugar: 78,
        rating: null,
        recommendation: "Avoid",
        reasons: [
          "Very high in sugar",
          "High calorie content",
          "Will spike blood sugar significantly"
        ],
        warnings: [
          "Not suitable for diabetics",
          "Very high sugar content",
          "High calorie dessert"
        ],
        tags: ["High Sugar", "High Calorie", "Dessert"],
        suitability: "avoid"
      }
    ],
    summary: {
      totalDishes: 4,
      recommended: 1,
      caution: 2,
      avoid: 1,
      avgHealthScore: 57
    }
  };

  const [analysisResults, setAnalysisResults] = useState(mockAnalysisResults);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast.success(`File "${file.name}" uploaded successfully!`);
    }
  };

  const handleAnalyze = () => {
    if (!selectedFile && !menuText.trim()) {
      toast.error("Please upload a menu image or enter menu text");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      toast.success("Menu analysis complete!");
    }, 3000);
  };

  const handleRating = (dishId: number, rating: number) => {
    setAnalysisResults(prev => ({
      ...prev,
      dishes: prev.dishes.map(dish => 
        dish.id === dishId ? { ...dish, rating } : dish
      )
    }));
    toast.success("Rating saved! This will help improve future recommendations.");
  };

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case "perfect": return "text-green-600 bg-green-100";
      case "good": return "text-blue-600 bg-blue-100";
      case "caution": return "text-yellow-600 bg-yellow-100";
      case "avoid": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getSuitabilityIcon = (suitability: string) => {
    switch (suitability) {
      case "perfect": return <CheckCircle className="h-5 w-5" />;
      case "good": return <TrendingUp className="h-5 w-5" />;
      case "caution": return <AlertTriangle className="h-5 w-5" />;
      case "avoid": return <TrendingDown className="h-5 w-5" />;
      default: return null;
    }
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-md border-white/20">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Analyzing Menu...</h3>
            <p className="text-gray-600 mb-4">
              Our AI is analyzing the menu based on your health profile
            </p>
            <Progress value={75} className="mb-4" />
            <div className="space-y-2 text-sm text-gray-500">
              <p>✓ Scanning menu items</p>
              <p>✓ Analyzing nutritional content</p>
              <p>🔄 Checking health compatibility</p>
              <p>⏳ Generating recommendations</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (analysisComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Utensils className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Menu Analysis
              </h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Analysis Summary */}
          <Card className="mb-8 bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-6 w-6 mr-2 text-red-500" />
                Analysis Summary
              </CardTitle>
              <CardDescription>
                Personalized recommendations based on your health profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{analysisResults.summary.recommended}</div>
                  <div className="text-sm text-gray-600">Recommended</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{analysisResults.summary.caution}</div>
                  <div className="text-sm text-gray-600">Consider</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{analysisResults.summary.avoid}</div>
                  <div className="text-sm text-gray-600">Avoid</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{analysisResults.summary.avgHealthScore}%</div>
                  <div className="text-sm text-gray-600">Avg Health Score</div>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>For your health profile:</strong> Focus on dishes high in protein and fiber, 
                  low in sodium and simple carbs. Avoid items that may spike blood sugar.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Dish Recommendations */}
          <div className="space-y-6">
            {analysisResults.dishes.map((dish) => (
              <Card key={dish.id} className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-xl">{dish.name}</CardTitle>
                        <Badge className={getSuitabilityColor(dish.suitability)}>
                          {getSuitabilityIcon(dish.suitability)}
                          <span className="ml-1 capitalize">{dish.recommendation}</span>
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {dish.price}
                        </span>
                        <span className="flex items-center">
                          <Zap className="h-4 w-4 mr-1" />
                          {dish.calories} cal
                        </span>
                        <span className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          {dish.healthScore}% health score
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{dish.description}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {dish.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Rating */}
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-sm font-medium">Rate this dish:</span>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <Star
                              key={rating}
                              className={`h-5 w-5 cursor-pointer transition-colors ${
                                dish.rating && rating <= dish.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300 hover:text-yellow-400"
                              }`}
                              onClick={() => handleRating(dish.id, rating)}
                            />
                          ))}
                        </div>
                        {dish.rating && (
                          <span className="text-sm text-gray-600">
                            ({dish.rating}/5)
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-800">{dish.healthScore}%</div>
                        <div className="text-sm text-gray-600">Health Score</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-blue-600">{dish.protein}g</div>
                      <div className="text-sm text-gray-600">Protein</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-green-600">{dish.carbs}g</div>
                      <div className="text-sm text-gray-600">Carbs</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-purple-600">{dish.fat}g</div>
                      <div className="text-sm text-gray-600">Fat</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-orange-600">{dish.sodium}mg</div>
                      <div className="text-sm text-gray-600">Sodium</div>
                    </div>
                  </div>

                  {/* Reasons */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800">Why this recommendation:</h4>
                    <ul className="space-y-1">
                      {dish.reasons.map((reason, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Warnings */}
                  {dish.warnings.length > 0 && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-medium text-yellow-800 flex items-center mb-2">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Health Considerations:
                      </h4>
                      <ul className="space-y-1">
                        {dish.warnings.map((warning, index) => (
                          <li key={index} className="text-sm text-yellow-700">
                            • {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button 
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              onClick={() => setAnalysisComplete(false)}
            >
              <Camera className="h-4 w-4 mr-2" />
              Analyze Another Menu
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Camera className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Scan Menu
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Upload Restaurant Menu
            </h2>
            <p className="text-gray-600">
              Get personalized food recommendations based on your health profile
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-md border-white/20 shadow-xl mb-6">
            <CardHeader>
              <CardTitle className="text-center">Menu Upload</CardTitle>
              <CardDescription className="text-center">
                Upload an image of the menu or type the menu items below
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Upload Menu Image</Label>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">
                    Click to upload menu image or drag and drop
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, or PDF up to 10MB
                  </p>
                  {selectedFile && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 font-medium">
                        ✓ {selectedFile.name} uploaded successfully
                      </p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Text Input */}
              <div>
                <Label htmlFor="menu-text" className="text-sm font-medium mb-2 block">
                  Or Type Menu Items
                </Label>
                <Textarea
                  id="menu-text"
                  placeholder="Enter menu items here, one per line or copy the entire menu text..."
                  value={menuText}
                  onChange={(e) => setMenuText(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>

              <Button 
                onClick={handleAnalyze}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3"
                disabled={!selectedFile && !menuText.trim()}
              >
                <Zap className="h-5 w-5 mr-2" />
                Analyze Menu
              </Button>
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Heart className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Health-First Analysis</h4>
                    <p className="text-sm text-gray-600">Recommendations based on your medical conditions</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Star className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Smart Learning</h4>
                    <p className="text-sm text-gray-600">Rate dishes to improve future recommendations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanMenu;
