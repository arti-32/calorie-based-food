
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Upload, 
  Camera, 
  Star, 
  Heart, 
  AlertTriangle, 
  Utensils, 
  TrendingUp,
  Clock,
  Flame,
  User,
  CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ScanMenu = () => {
  const navigate = useNavigate();
  const [menuImage, setMenuImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setMenuImage(URL.createObjectURL(file));
    }
  };

  const handleScan = async () => {
    if (!menuImage) {
      toast.error("Please upload a menu image first.");
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    // Simulate image upload and analysis
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setAnalysisResult({
              status: "success",
              message: "Menu analysis complete!",
              recommendations: [
                { name: "Grilled Chicken Salad", healthScore: 95, calories: 450 },
                { name: "Vegetable Stir-Fry", healthScore: 88, calories: 380 },
                { name: "Salmon with Asparagus", healthScore: 92, calories: 520 },
              ],
            });
            setIsLoading(false);
          }, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

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
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="bg-white/80 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Menu Scanner</CardTitle>
            <CardDescription>Upload a menu image to get health-conscious recommendations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-md">
              {menuImage ? (
                <div className="relative">
                  <img src={menuImage} alt="Menu Preview" className="max-h-64 rounded-md object-contain" />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={() => setMenuImage(null)}
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label htmlFor="upload-image" className="cursor-pointer">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Camera className="h-10 w-10 text-gray-500" />
                    <p className="text-gray-600">Click to upload menu image</p>
                  </div>
                  <Input type="file" id="upload-image" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
              )}
            </div>

            {uploadProgress > 0 && (
              <div className="space-y-2">
                <Label htmlFor="upload-progress">Analyzing Menu...</Label>
                <Progress id="upload-progress" value={uploadProgress} />
                <p className="text-sm text-gray-500">Analyzing image. Please wait...</p>
              </div>
            )}

            <Button className="w-full" onClick={handleScan} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Scan Menu
                </>
              )}
            </Button>

            {analysisResult && analysisResult.status === "success" && (
              <div className="mt-6">
                <Separator />
                <div className="mt-4">
                  <h3 className="text-xl font-semibold flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Recommendations
                  </h3>
                  <ul className="mt-2 space-y-3">
                    {analysisResult.recommendations.map((item, index) => (
                      <li key={index} className="bg-gray-50 rounded-md p-3 flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Badge variant="secondary">{item.calories} cal</Badge>
                            <div className="flex items-center space-x-1">
                              <Flame className="h-4 w-4 text-orange-500" />
                              <span>Health Score: {item.healthScore}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline">View Details</Button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {analysisResult && analysisResult.status === "error" && (
              <div className="mt-6 p-4 rounded-md bg-red-50 border border-red-200 text-red-700 flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <p>{analysisResult.message}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScanMenu;
