
import { supabase, MoodCheck } from '@/lib/supabase';

export const moodService = {
  // Log a mood check
  async logMood(moodCheck: Omit<MoodCheck, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('mood_checks')
      .insert(moodCheck)
      .select()
      .single();
    
    if (error) throw error;
    return data as MoodCheck;
  },

  // Get moods for a family member
  async getMoodsForMember(memberId: string) {
    const { data, error } = await supabase
      .from('mood_checks')
      .select('*')
      .eq('member_id', memberId)
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data as MoodCheck[];
  },

  // Get recent moods for all family members
  async getRecentMoods(familyId: string) {
    // This would use a join or a view in Supabase
    const { data, error } = await supabase
      .from('recent_moods')
      .select('*')
      .eq('family_id', familyId);
    
    if (error) throw error;
    return data;
  },

  // Get mood statistics for a member
  async getMoodStats(memberId: string, timeRange: 'week' | 'month' | 'year' = 'week') {
    let fromDate = new Date();
    
    // Calculate date range
    if (timeRange === 'week') {
      fromDate.setDate(fromDate.getDate() - 7);
    } else if (timeRange === 'month') {
      fromDate.setMonth(fromDate.getMonth() - 1);
    } else if (timeRange === 'year') {
      fromDate.setFullYear(fromDate.getFullYear() - 1);
    }

    const { data, error } = await supabase
      .from('mood_checks')
      .select('*')
      .eq('member_id', memberId)
      .gte('date', fromDate.toISOString())
      .order('date', { ascending: false });
    
    if (error) throw error;
    
    const moods = data as MoodCheck[];
    
    if (moods.length === 0) {
      return {
        average: 0,
        highest: 0,
        lowest: 0,
        mostCommon: 0,
        count: 0
      };
    }

    // Calculate statistics
    const values = moods.map(m => m.mood_value);
    const sum = values.reduce((a, b) => a + b, 0);
    
    // Find most common mood
    const frequency: Record<number, number> = {};
    let maxCount = 0;
    let mostCommonMood = 0;
    
    for (const value of values) {
      frequency[value] = (frequency[value] || 0) + 1;
      if (frequency[value] > maxCount) {
        maxCount = frequency[value];
        mostCommonMood = value;
      }
    }
    
    return {
      average: sum / values.length,
      highest: Math.max(...values),
      lowest: Math.min(...values),
      mostCommon: mostCommonMood,
      count: values.length
    };
  },

  // Get weekly mood data for a member
  async getWeeklyMoodData(memberId: string) {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 7);
    
    const { data, error } = await supabase
      .from('mood_checks')
      .select('*')
      .eq('member_id', memberId)
      .gte('date', fromDate.toISOString())
      .order('date', { ascending: true });
    
    if (error) throw error;
    
    const moods = data as MoodCheck[];
    
    // Group by day
    const dayMap: Record<string, number[]> = {};
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    moods.forEach(mood => {
      const date = new Date(mood.date);
      const day = days[date.getDay()];
      if (!dayMap[day]) {
        dayMap[day] = [];
      }
      dayMap[day].push(mood.mood_value);
    });
    
    // Calculate average for each day
    return days.map(day => {
      const values = dayMap[day] || [];
      return {
        day,
        value: values.length ? values.reduce((a, b) => a + b, 0) / values.length : null,
        hasMood: values.length > 0
      };
    });
  }
};
