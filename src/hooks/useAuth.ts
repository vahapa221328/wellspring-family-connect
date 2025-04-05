
import { ref, computed } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';

export function useAuth() {
  const user = ref<User | null>(null);
  const loading = ref(false);
  const { toast } = useToast();

  // Check if user is already logged in
  const checkUser = async () => {
    try {
      loading.value = true;
      const { data } = await supabase.auth.getSession();
      user.value = data.session?.user || null;
      return !!user.value;
    } catch (error) {
      console.error('Error checking auth status:', error);
      return false;
    } finally {
      loading.value = false;
    }
  };

  // Initialize and set up auth listener
  const initAuth = async () => {
    await checkUser();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        user.value = session?.user || null;
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
      loading.value = true;
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

      user.value = data.user;
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
      loading.value = false;
    }
  };

  // Sign up with email and password
  const signup = async (email: string, password: string) => {
    try {
      loading.value = true;
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

      user.value = data.user;
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
      loading.value = false;
    }
  };

  // Logout
  const logout = async () => {
    try {
      loading.value = true;
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: 'Logout failed',
          description: error.message,
          variant: 'destructive',
        });
        return false;
      }

      user.value = null;
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
      loading.value = false;
    }
  };

  const isLoggedIn = computed(() => !!user.value);

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
