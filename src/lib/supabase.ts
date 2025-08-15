import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ofrkrtxsscxkhexmvwpr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mcmtydHhzc2N4a2hleG12d3ByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM1NjQyOTQsImV4cCI6MjAzOTE0MDI5NH0.YhUKnV6HSyEqQh3WQv8L8yL4kS0V8-CQPiJZaJ1Y4wU';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Development environment check
if (import.meta.env.DEV && typeof window !== 'undefined') {
  console.log('✅ Supabase client initialized successfully');
}