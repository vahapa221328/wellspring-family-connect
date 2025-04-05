
import { supabase, Trip } from '@/lib/supabase';

export const tripService = {
  // Get trips for a family
  async getTrips(familyId: string) {
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .eq('family_id', familyId);
    
    if (error) throw error;
    return data as Trip[];
  },

  // Get trips by status
  async getTripsByStatus(familyId: string, status: Trip['status']) {
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .eq('family_id', familyId)
      .eq('status', status);
    
    if (error) throw error;
    return data as Trip[];
  },

  // Create a trip
  async createTrip(trip: Omit<Trip, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('trips')
      .insert(trip)
      .select()
      .single();
    
    if (error) throw error;
    return data as Trip;
  },

  // Update a trip
  async updateTrip(trip: Partial<Trip>) {
    const { data, error } = await supabase
      .from('trips')
      .update(trip)
      .eq('id', trip.id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Trip;
  },

  // Delete a trip
  async deleteTrip(tripId: string) {
    const { error } = await supabase
      .from('trips')
      .delete()
      .eq('id', tripId);
    
    if (error) throw error;
    return true;
  }
};
