
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { tripService } from '@/services/trip.service';
import { Trip } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';

export function useTrips(familyId: string) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [upcomingTrips, setUpcomingTrips] = useState<Trip[]>([]);
  const [planningTrips, setPlanningTrips] = useState<Trip[]>([]);
  const [pastTrips, setPastTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const loadTrips = async () => {
    try {
      setLoading(true);
      const data = await tripService.getTrips(familyId);
      setTrips(data);
      
      // Filter trips by status
      setUpcomingTrips(data.filter(t => t.status === 'upcoming'));
      setPlanningTrips(data.filter(t => t.status === 'planning'));
      setPastTrips(data.filter(t => t.status === 'past'));
    } catch (err) {
      console.error('Error loading trips:', err);
      setError(err as Error);
      toast({
        title: 'Error',
        description: 'Failed to load trips. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addTrip = async (trip: Omit<Trip, 'id' | 'created_at'>) => {
    try {
      setLoading(true);
      const added = await tripService.createTrip(trip);
      
      // Update all state
      setTrips(prev => [...prev, added]);
      
      // Update filtered lists
      if (added.status === 'upcoming') {
        setUpcomingTrips(prev => [...prev, added]);
      } else if (added.status === 'planning') {
        setPlanningTrips(prev => [...prev, added]);
      } else if (added.status === 'past') {
        setPastTrips(prev => [...prev, added]);
      }
      
      toast({
        title: 'Success',
        description: 'Trip added successfully',
      });
      return added;
    } catch (err) {
      console.error('Error adding trip:', err);
      toast({
        title: 'Error',
        description: 'Failed to add trip',
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTrip = async (trip: Partial<Trip>) => {
    try {
      setLoading(true);
      const updated = await tripService.updateTrip(trip);
      
      // Update all trips
      setTrips(trips.map(t => t.id === updated.id ? updated : t));
      
      // Update filtered lists
      // First, remove from all lists
      setUpcomingTrips(prev => prev.filter(t => t.id !== updated.id));
      setPlanningTrips(prev => prev.filter(t => t.id !== updated.id));
      setPastTrips(prev => prev.filter(t => t.id !== updated.id));
      
      // Then add to the correct list
      if (updated.status === 'upcoming') {
        setUpcomingTrips(prev => [...prev, updated]);
      } else if (updated.status === 'planning') {
        setPlanningTrips(prev => [...prev, updated]);
      } else if (updated.status === 'past') {
        setPastTrips(prev => [...prev, updated]);
      }
      
      toast({
        title: 'Success',
        description: 'Trip updated successfully',
      });
      return updated;
    } catch (err) {
      console.error('Error updating trip:', err);
      toast({
        title: 'Error',
        description: 'Failed to update trip',
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTrip = async (tripId: string) => {
    try {
      setLoading(true);
      await tripService.deleteTrip(tripId);
      
      // Update all state
      setTrips(trips.filter(t => t.id !== tripId));
      setUpcomingTrips(upcomingTrips.filter(t => t.id !== tripId));
      setPlanningTrips(planningTrips.filter(t => t.id !== tripId));
      setPastTrips(pastTrips.filter(t => t.id !== tripId));
      
      toast({
        title: 'Success',
        description: 'Trip deleted successfully',
      });
    } catch (err) {
      console.error('Error deleting trip:', err);
      toast({
        title: 'Error',
        description: 'Failed to delete trip',
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
    
    loadTrips();

    // Set up realtime subscription
    const subscription = supabase
      .channel('trips-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'trips',
        filter: `family_id=eq.${familyId}`,
      }, () => {
        // Reload trips when changes occur
        loadTrips();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [familyId]);

  return {
    trips,
    upcomingTrips,
    planningTrips,
    pastTrips,
    loading,
    error,
    loadTrips,
    addTrip,
    updateTrip,
    deleteTrip,
  };
}
