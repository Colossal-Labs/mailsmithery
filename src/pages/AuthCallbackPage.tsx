import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export default function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the current URL's hash parameters
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const type = hashParams.get('type');

        if (type === 'signup') {
          toast.success('Email confirmed successfully! Please sign in.');
          navigate('/login', { replace: true });
          return;
        }

        if (accessToken && refreshToken) {
          // Set the session with the tokens
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            console.error('Auth callback error:', error);
            toast.error('Authentication failed. Please try signing in again.');
            navigate('/login', { replace: true });
          } else if (data.user) {
            toast.success('Successfully signed in!');
            navigate('/projects', { replace: true });
          }
        } else {
          // If no tokens are present, redirect to login
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        toast.error('Authentication failed. Please try signing in again.');
        navigate('/login', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
        <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
          Confirming your authentication...
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Please wait while we complete the sign-in process.
        </p>
      </div>
    </div>
  );
}