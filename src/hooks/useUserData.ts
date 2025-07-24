import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  user_id: string;
  name: string;
  age?: number;
  weight?: number;
  height?: number;
  activity_level?: string;
  daily_calorie_goal?: number;
  consumed_calories?: number;
  health_score?: number;
  streak?: number;
  profile_picture_url?: string;
}

interface MedicalCondition {
  id: string;
  condition_name: string;
}

interface Allergy {
  id: string;
  allergy_name: string;
}

interface DietaryPreference {
  id: string;
  preference_name: string;
}

interface Meal {
  id: string;
  name: string;
  restaurant?: string;
  calories: number;
  health_score?: number;
  rating?: number;
  consumed_at: string;
}

interface UserData {
  profile: UserProfile | null;
  conditions: string[];
  allergies: string[];
  preferences: string[];
  recentMeals: Meal[];
  loading: boolean;
  error: string | null;
}

export const useUserData = (user: User | null): UserData => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [conditions, setConditions] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [recentMeals, setRecentMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          throw profileError;
        }

        setProfile(profileData);

        // Fetch medical conditions
        const { data: conditionsData, error: conditionsError } = await supabase
          .from('medical_conditions')
          .select('condition_name')
          .eq('user_id', user.id);

        if (conditionsError) throw conditionsError;
        setConditions(conditionsData?.map(c => c.condition_name) || []);

        // Fetch allergies
        const { data: allergiesData, error: allergiesError } = await supabase
          .from('allergies')
          .select('allergy_name')
          .eq('user_id', user.id);

        if (allergiesError) throw allergiesError;
        setAllergies(allergiesData?.map(a => a.allergy_name) || []);

        // Fetch dietary preferences
        const { data: preferencesData, error: preferencesError } = await supabase
          .from('dietary_preferences')
          .select('preference_name')
          .eq('user_id', user.id);

        if (preferencesError) throw preferencesError;
        setPreferences(preferencesData?.map(p => p.preference_name) || []);

        // Fetch recent meals
        const { data: mealsData, error: mealsError } = await supabase
          .from('meals')
          .select('*')
          .eq('user_id', user.id)
          .order('consumed_at', { ascending: false })
          .limit(3);

        if (mealsError) throw mealsError;
        setRecentMeals(mealsData || []);

      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  return {
    profile,
    conditions,
    allergies,
    preferences,
    recentMeals,
    loading,
    error
  };
};