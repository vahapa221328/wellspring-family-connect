
import { supabase, Challenge } from '@/lib/supabase';

export const challengeService = {
  // Get challenges for a family
  async getChallenges(familyId: string) {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .eq('family_id', familyId);
    
    if (error) throw error;
    return data as Challenge[];
  },

  // Get active challenges
  async getActiveChallenges(familyId: string) {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .eq('family_id', familyId)
      .gt('days_left', 0);
    
    if (error) throw error;
    return data as Challenge[];
  },

  // Get completed challenges
  async getCompletedChallenges(familyId: string) {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .eq('family_id', familyId)
      .eq('days_left', 0);
    
    if (error) throw error;
    return data as Challenge[];
  },

  // Create a challenge
  async createChallenge(challenge: Omit<Challenge, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('challenges')
      .insert(challenge)
      .select()
      .single();
    
    if (error) throw error;
    return data as Challenge;
  },

  // Update a challenge
  async updateChallenge(challenge: Partial<Challenge>) {
    const { data, error } = await supabase
      .from('challenges')
      .update(challenge)
      .eq('id', challenge.id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Challenge;
  },

  // Delete a challenge
  async deleteChallenge(challengeId: string) {
    const { error } = await supabase
      .from('challenges')
      .delete()
      .eq('id', challengeId);
    
    if (error) throw error;
    return true;
  }
};
