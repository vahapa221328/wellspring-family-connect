
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { moodService } from '@/services/mood.service';
import { MoodCheck } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';
import { useFamilyContext } from '@/context/FamilyContext';

export function useMood(memberId?: string) {
  const [moods, setMoods] = useState<MoodCheck[]>([]);
  const [recentMoods, setRecentMoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  const { family } = useFamilyContext();

  const loadMoods = async () => {
    if (!memberId) return;
    
    try {
      setLoading(true);
      const data = await moodService.getMoodsForMember(memberId);
      setMoods(data);
    } catch (err) {
      console.error('Error loading moods:', err);
      setError(err as Error);
      toast({
        title: 'Error',
        description: 'Failed to load mood data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadRecentMoods = async () => {
    if (!family?.id) return;
    
    try {
      setLoading(true);
      const data = await moodService.getRecentMoods(family.id);
      setRecentMoods(data);
    } catch (err) {
      console.error('Error loading recent moods:', err);
      toast({
        title: 'Error',
        description: 'Failed to load recent mood data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const logMood = async (mood: number) => {
    if (!memberId) return;
    
    try {
      setLoading(true);
      const moodData: Omit<MoodCheck, 'id' | 'created_at'> = {
        member_id: memberId,
        mood_value: mood,
        date: new Date().toISOString(),
      };
      
      const added = await moodService.logMood(moodData);
      setMoods(prev => [added, ...prev]);
      
      toast({
        title: 'Success',
        description: 'Mood logged successfully',
      });
      return added;
    } catch (err) {
      console.error('Error logging mood:', err);
      toast({
        title: 'Error',
        description: 'Failed to log mood',
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Calculate mood statistics
  const getMoodStats = () => {
    if (!moods.length) return { average: 0, highest: 0, lowest: 0 };
    
    const values = moods.map(m => m.mood_value);
    return {
      average: values.reduce((a, b) => a + b, 0) / values.length,
      highest: Math.max(...values),
      lowest: Math.min(...values)
    };
  };

  // Get weekly mood data for charts
  const getWeeklyMoodData = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const today = new Date();
    const dayOfWeek = today.getDay();
    const results = days.map((day, index) => {
      // Find mood for this day of the week
      const dayMoods = moods.filter(mood => {
        const moodDate = new Date(mood.date);
        return moodDate.getDay() === (index + 1) % 7; // Convert to 0-6 where 0 is Sunday
      });
      
      if (dayMoods.length) {
        // If there are multiple moods for the day, get the average
        const avgMood = dayMoods.reduce((sum, mood) => sum + mood.mood_value, 0) / dayMoods.length;
        return { day, value: avgMood, hasMood: true };
      }
      
      return { day, value: null, hasMood: false };
    });
    
    return results;
  };

  // Set up realtime subscription if memberId is provided
  useEffect(() => {
    if (!memberId) {
      if (family?.id) {
        loadRecentMoods();
      }
      return;
    }
    
    loadMoods();

    // Set up realtime subscription
    const subscription = supabase
      .channel('mood-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'mood_checks',
        filter: `member_id=eq.${memberId}`,
      }, () => {
        // Reload moods when changes occur
        loadMoods();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [memberId, family?.id]);

  // Set up another subscription for recent moods if a family is selected
  useEffect(() => {
    if (!family?.id) return;
    
    // Set up realtime subscription for recent moods
    const subscription = supabase
      .channel('recent-moods-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'mood_checks',
      }, () => {
        // Reload recent moods when any mood changes
        loadRecentMoods();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [family?.id]);

  return {
    moods,
    recentMoods,
    loading,
    error,
    loadMoods,
    loadRecentMoods,
    logMood,
    getMoodStats,
    getWeeklyMoodData
  };
}
