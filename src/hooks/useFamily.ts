import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { familyService } from '@/services/family.service';
import { Family, FamilyMember } from '@/lib/supabase';

export function useFamily() {
  const [family, setFamily] = useState<Family | null>(null);
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const loadFamily = async () => {
    try {
      setLoading(true);
      const familyData = await familyService.getCurrentFamily();
      setFamily(familyData);
    } catch (err) {
      console.error('Error loading family data:', err);
      setError(err as Error);
      toast({
        title: 'Error',
        description: 'Failed to load family data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMembers = async () => {
    try {
      if (!family?.id) return;
      setLoading(true);
      const membersData = await familyService.getFamilyMembers(family.id);
      setMembers(membersData);
    } catch (err) {
      console.error('Error loading family members:', err);
      setError(err as Error);
      toast({
        title: 'Error',
        description: 'Failed to load family members. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateFamilyData = async (updatedFamily: Partial<Family>) => {
    try {
      if (!family) return;
      setLoading(true);
      const updated = await familyService.updateFamily({
        ...updatedFamily,
        id: family.id,
      });
      setFamily(updated);
      toast({
        title: 'Success',
        description: 'Family information updated successfully',
      });
    } catch (err) {
      console.error('Error updating family:', err);
      toast({
        title: 'Error',
        description: 'Failed to update family information',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addMember = async (newMember: Omit<FamilyMember, 'id' | 'created_at'>) => {
    try {
      setLoading(true);
      const added = await familyService.addFamilyMember(newMember);
      setMembers((prev) => [...prev, added]);
      toast({
        title: 'Success',
        description: 'Family member added successfully',
      });
    } catch (err) {
      console.error('Error adding family member:', err);
      toast({
        title: 'Error',
        description: 'Failed to add family member',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateMember = async (updatedMember: Partial<FamilyMember>) => {
    try {
      setLoading(true);
      const updated = await familyService.updateFamilyMember(updatedMember);
      setMembers(members.map((m) => (m.id === updated.id ? updated : m)));
      toast({
        title: 'Success',
        description: 'Family member updated successfully',
      });
    } catch (err) {
      console.error('Error updating family member:', err);
      toast({
        title: 'Error',
        description: 'Failed to update family member',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const removeMember = async (memberId: string) => {
    try {
      setLoading(true);
      await familyService.deleteFamilyMember(memberId);
      setMembers(members.filter((m) => m.id !== memberId));
      toast({
        title: 'Success',
        description: 'Family member removed successfully',
      });
    } catch (err) {
      console.error('Error removing family member:', err);
      toast({
        title: 'Error',
        description: 'Failed to remove family member',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFamily();
  }, []);

  return {
    family,
    members,
    loading,
    error,
    loadFamily,
    loadMembers,
    updateFamilyData,
    addMember,
    updateMember,
    removeMember,
  };
}
