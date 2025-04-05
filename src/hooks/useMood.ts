
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { moodService } from '@/services/mood.service';
import { MoodCheck } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';

export function useMood(memberId?: string) {
  const [moods, setMoods] = useState<MoodCheck[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

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

  // Set up realtime subscription if memberId is provided
  useEffect(() => {
    if (!memberId) return;
    
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
  }, [memberId]);

  return {
    moods,
    loading,
    error,
    loadMoods,
    logMood,
  };
}
