
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Check if user is already logged in
  const checkUser = async () => {
    try {
      setLoading(true);
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      return !!data.session?.user;
    } catch (error) {
      console.error('Error checking auth status:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Initialize and set up auth listener
  const initAuth = async () => {
    await checkUser();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
      }
    );

    // Return cleanup function
    return () => {
      subscription.unsubscribe();
    };
  };

  // Login with email and password
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: 'Login failed',
          description: error.message,
          variant: 'destructive',
        });
        return false;
      }

      setUser(data.user);
      toast({
        title: 'Login successful',
        description: `Welcome back, ${email}!`,
      });
      return true;
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error?.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email and password
  const signup = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast({
          title: 'Signup failed',
          description: error.message,
          variant: 'destructive',
        });
        return false;
      }

      setUser(data.user);
      toast({
        title: 'Signup successful',
        description: 'Welcome to Wellspring! Please check your email to confirm your account.',
      });
      return true;
    } catch (error: any) {
      toast({
        title: 'Signup failed',
        description: error?.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: 'Logout failed',
          description: error.message,
          variant: 'destructive',
        });
        return false;
      }

      setUser(null);
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out.',
      });
      return true;
    } catch (error: any) {
      toast({
        title: 'Logout failed',
        description: error?.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const isLoggedIn = !!user;

  return {
    user,
    loading,
    login,
    signup,
    logout,
    checkUser,
    initAuth,
    isLoggedIn,
  };
}
