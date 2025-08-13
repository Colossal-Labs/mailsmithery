import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>;
  signUp: (email: string, password: string) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ data: any; error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user on mount (one-time check)
  useEffect(() => {
    async function loadUser() {
      setLoading(true);
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
          console.error('Error loading user:', error.message);
        } else {
          setUser(user);
        }
        
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
      } catch (error) {
        console.error('Error during auth initialization:', error);
      } finally {
        setLoading(false);
      }
    }
    loadUser();

    // Set up auth listener - KEEP SIMPLE, avoid any async operations in callback
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // NEVER use any async operations in callback
        setSession(session);
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Auth methods
  async function signIn(email: string, password: string) {
    setLoading(true);
    try {
      const result = await supabase.auth.signInWithPassword({ email, password });
      return result;
    } finally {
      setLoading(false);
    }
  }

  async function signUp(email: string, password: string) {
    setLoading(true);
    try {
      const result = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.protocol}//${window.location.host}/auth/callback`
        }
      });
      return result;
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    setLoading(true);
    try {
      const result = await supabase.auth.signOut();
      return result;
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword(email: string) {
    const result = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.protocol}//${window.location.host}/auth/reset-password`
    });
    return result;
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}