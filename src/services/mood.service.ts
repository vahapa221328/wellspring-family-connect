
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
  }
};
