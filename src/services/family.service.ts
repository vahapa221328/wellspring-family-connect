
import { supabase, Family, FamilyMember } from '@/lib/supabase';

export const familyService = {
  // Get the current family
  async getCurrentFamily() {
    const { data, error } = await supabase
      .from('families')
      .select('*')
      .limit(1)
      .single();
    
    if (error) throw error;
    return data as Family;
  },

  // Get family members
  async getFamilyMembers(familyId: string) {
    const { data, error } = await supabase
      .from('family_members')
      .select('*')
      .eq('family_id', familyId);
    
    if (error) throw error;
    return data as FamilyMember[];
  },

  // Update family
  async updateFamily(family: Partial<Family>) {
    const { data, error } = await supabase
      .from('families')
      .update(family)
      .eq('id', family.id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Family;
  },

  // Add family member
  async addFamilyMember(member: Omit<FamilyMember, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('family_members')
      .insert(member)
      .select()
      .single();
    
    if (error) throw error;
    return data as FamilyMember;
  },

  // Update family member
  async updateFamilyMember(member: Partial<FamilyMember>) {
    const { data, error } = await supabase
      .from('family_members')
      .update(member)
      .eq('id', member.id)
      .select()
      .single();
    
    if (error) throw error;
    return data as FamilyMember;
  },

  // Delete family member
  async deleteFamilyMember(memberId: string) {
    const { error } = await supabase
      .from('family_members')
      .delete()
      .eq('id', memberId);
    
    if (error) throw error;
    return true;
  }
};
