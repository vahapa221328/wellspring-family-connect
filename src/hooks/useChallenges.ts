
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { challengeService } from '@/services/challenge.service';
import { Challenge } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';

export function useChallenges(familyId: string) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [activeChallenges, setActiveChallenges] = useState<Challenge[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const loadChallenges = async () => {
    try {
      setLoading(true);
      const data = await challengeService.getChallenges(familyId);
      setChallenges(data);
      
      // Filter challenges locally
      setActiveChallenges(data.filter(c => c.days_left > 0));
      setCompletedChallenges(data.filter(c => c.days_left === 0));
    } catch (err) {
      console.error('Error loading challenges:', err);
      setError(err as Error);
      toast({
        title: 'Error',
        description: 'Failed to load challenges. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addChallenge = async (challenge: Omit<Challenge, 'id' | 'created_at'>) => {
    try {
      setLoading(true);
      const added = await challengeService.createChallenge(challenge);
      setChallenges((prev) => [...prev, added]);
      if (added.days_left > 0) {
        setActiveChallenges((prev) => [...prev, added]);
      } else {
        setCompletedChallenges((prev) => [...prev, added]);
      }
      toast({
        title: 'Success',
        description: 'Challenge added successfully',
      });
      return added;
    } catch (err) {
      console.error('Error adding challenge:', err);
      toast({
        title: 'Error',
        description: 'Failed to add challenge',
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateChallenge = async (challenge: Partial<Challenge>) => {
    try {
      setLoading(true);
      const updated = await challengeService.updateChallenge(challenge);
      
      // Update all state
      setChallenges(challenges.map(c => c.id === updated.id ? updated : c));
      
      if (updated.days_left > 0) {
        setActiveChallenges(prev => {
          const exists = prev.some(c => c.id === updated.id);
          if (exists) {
            return prev.map(c => c.id === updated.id ? updated : c);
          } else {
            return [...prev, updated];
          }
        });
        setCompletedChallenges(prev => prev.filter(c => c.id !== updated.id));
      } else {
        setCompletedChallenges(prev => {
          const exists = prev.some(c => c.id === updated.id);
          if (exists) {
            return prev.map(c => c.id === updated.id ? updated : c);
          } else {
            return [...prev, updated];
          }
        });
        setActiveChallenges(prev => prev.filter(c => c.id !== updated.id));
      }
      
      toast({
        title: 'Success',
        description: 'Challenge updated successfully',
      });
      return updated;
    } catch (err) {
      console.error('Error updating challenge:', err);
      toast({
        title: 'Error',
        description: 'Failed to update challenge',
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteChallenge = async (challengeId: string) => {
    try {
      setLoading(true);
      await challengeService.deleteChallenge(challengeId);
      setChallenges(challenges.filter(c => c.id !== challengeId));
      setActiveChallenges(activeChallenges.filter(c => c.id !== challengeId));
      setCompletedChallenges(completedChallenges.filter(c => c.id !== challengeId));
      toast({
        title: 'Success',
        description: 'Challenge deleted successfully',
      });
    } catch (err) {
      console.error('Error deleting challenge:', err);
      toast({
        title: 'Error',
        description: 'Failed to delete challenge',
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Set up realtime subscription
  useEffect(() => {
    if (!familyId) return;
    
    loadChallenges();

    // Set up realtime subscription
    const subscription = supabase
      .channel('challenges-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'challenges',
        filter: `family_id=eq.${familyId}`,
      }, () => {
        // Reload challenges when changes occur
        loadChallenges();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [familyId]);

  return {
    challenges,
    activeChallenges,
    completedChallenges,
    loading,
    error,
    loadChallenges,
    addChallenge,
    updateChallenge,
    deleteChallenge,
  };
}
