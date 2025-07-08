
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Utensils, User, Mail, Lock, Heart, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    activityLevel: ""
  });
  
  const [medicalConditions, setMedicalConditions] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [dietaryPreferences, setDietaryPreferences] = useState([]);
  const [customCondition, setCustomCondition] = useState("");
  const [customAllergy, setCustomAllergy] = useState("");

  const commonConditions = [
    "Diabetes Type 1", "Diabetes Type 2", "Hypertension", "Heart Disease",
    "High Cholesterol", "Kidney Disease", "Liver Disease", "GERD",
    "Celiac Disease", "Crohn's Disease", "IBS", "Arthritis",
    "Thyroid Disorder", "Anemia", "Osteoporosis"
  ];

  const commonAllergies = [
    "Peanuts", "Tree Nuts", "Dairy", "Eggs", "Soy", "Wheat/Gluten",
    "Fish", "Shellfish", "Sesame", "Sulfites", "Corn", "Chocolate"
  ];

  const dietaryOptions = [
    "Vegetarian", "Vegan", "Keto", "Paleo", "Mediterranean",
    "Low Carb", "Low Fat", "High Protein", "Gluten Free", "Dairy Free"
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleCondition = (condition) => {
    setMedicalConditions(prev => 
      prev.includes(condition) 
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
    );
  };

  const toggleAllergy = (allergy) => {
    setAllergies(prev => 
      prev.includes(allergy) 
        ? prev.filter(a => a !== allergy)
        : [...prev, allergy]
    );
  };

  const toggleDietaryPreference = (preference) => {
    setDietaryPreferences(prev => 
      prev.includes(preference) 
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };

  const addCustomCondition = () => {
    if (customCondition.trim() && !medicalConditions.includes(customCondition.trim())) {
      setMedicalConditions(prev => [...prev, customCondition.trim()]);
      setCustomCondition("");
    }
  };

  const addCustomAllergy = () => {
    if (customAllergy.trim() && !allergies.includes(customAllergy.trim())) {
      setAllergies(prev => [...prev, customAllergy.trim()]);
      setCustomAllergy("");
    }
  };

  const removeCondition = (condition) => {
    setMedicalConditions(prev => prev.filter(c => c !== condition));
  };

  const removeAllergy = (allergy) => {
    setAllergies(prev => prev.filter(a => a !== allergy));
  };

  const removeDietaryPreference = (preference) => {
    setDietaryPreferences(prev => prev.filter(p => p !== preference));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const userData = {
      ...formData,
      medicalConditions,
      allergies,
      dietaryPreferences
    };

    console.log("User registration data:", userData);
    toast.success("Account created successfully! Welcome to FoodPal!");
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Utensils className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              FoodPal
            </h1>
          </div>
          <p className="text-gray-600">Create your personalized health profile</p>
        </div>

        <Card className="bg-white/80 backdrop-blur-md border-white/20 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Join FoodPal
            </CardTitle>
            <CardDescription>
              Tell us about yourself to get personalized recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-500" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Physical Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Physical Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Age"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select onValueChange={(value) => handleInputChange("gender", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Weight"
                      value={formData.weight}
                      onChange={(e) => handleInputChange("weight", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="Height"
                      value={formData.height}
                      onChange={(e) => handleInputChange("height", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Medical Conditions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  Medical Conditions
                </h3>
                <p className="text-sm text-gray-600">
                  Select any medical conditions you have. This helps us provide safer food recommendations.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {commonConditions.map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox
                        id={condition}
                        checked={medicalConditions.includes(condition)}
                        onCheckedChange={() => toggleCondition(condition)}
                      />
                      <Label htmlFor={condition} className="text-sm">
                        {condition}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add custom condition"
                    value={customCondition}
                    onChange={(e) => setCustomCondition(e.target.value)}
                  />
                  <Button type="button" onClick={addCustomCondition} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {medicalConditions.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {medicalConditions.map((condition) => (
                      <Badge key={condition} variant="secondary" className="bg-red-100 text-red-700">
                        {condition}
                        <X
                          className="h-3 w-3 ml-1 cursor-pointer"
                          onClick={() => removeCondition(condition)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Allergies */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Food Allergies & Intolerances
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {commonAllergies.map((allergy) => (
                    <div key={allergy} className="flex items-center space-x-2">
                      <Checkbox
                        id={allergy}
                        checked={allergies.includes(allergy)}
                        onCheckedChange={() => toggleAllergy(allergy)}
                      />
                      <Label htmlFor={allergy} className="text-sm">
                        {allergy}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add custom allergy"
                    value={customAllergy}
                    onChange={(e) => setCustomAllergy(e.target.value)}
                  />
                  <Button type="button" onClick={addCustomAllergy} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {allergies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {allergies.map((allergy) => (
                      <Badge key={allergy} variant="secondary" className="bg-orange-100 text-orange-700">
                        {allergy}
                        <X
                          className="h-3 w-3 ml-1 cursor-pointer"
                          onClick={() => removeAllergy(allergy)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Dietary Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Dietary Preferences
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {dietaryOptions.map((preference) => (
                    <div key={preference} className="flex items-center space-x-2">
                      <Checkbox
                        id={preference}
                        checked={dietaryPreferences.includes(preference)}
                        onCheckedChange={() => toggleDietaryPreference(preference)}
                      />
                      <Label htmlFor={preference} className="text-sm">
                        {preference}
                      </Label>
                    </div>
                  ))}
                </div>
                {dietaryPreferences.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {dietaryPreferences.map((preference) => (
                      <Badge key={preference} variant="secondary" className="bg-green-100 text-green-700">
                        {preference}
                        <X
                          className="h-3 w-3 ml-1 cursor-pointer"
                          onClick={() => removeDietaryPreference(preference)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  Create My Account
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/login")}
                  className="flex-1"
                >
                  Already have an account?
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
