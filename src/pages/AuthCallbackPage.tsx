import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { CheckCircle, AlertCircle, Mail, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function AuthCallbackPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get URL search parameters for PKCE flow
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error_param = urlParams.get('error');
        const error_description = urlParams.get('error_description');

        // Check for error parameters first
        if (error_param) {
          console.error('Auth callback error:', error_param, error_description);
          setError(error_description || error_param);
          setLoading(false);
          return;
        }

        // Check for auth code
        if (code) {
          console.log('Found auth code, exchanging for session...');
          
          // Exchange the auth code for a session using PKCE flow
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);

          if (error) {
            console.error('Error exchanging code for session:', error.message);
            setError(error.message);
            return;
          }

          if (data.session && data.user) {
            console.log('Successfully authenticated user:', data.user.email);
            setSuccess(true);
            toast.success('Email verified successfully! Welcome to MailSmithery.');
            
            // Redirect to app after a short delay
            setTimeout(() => {
              navigate('/projects');
            }, 2000);
            return;
          }
        }

        // Fallback: try to get current session (user might already be logged in)
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError.message);
          setError('Unable to verify session. Please try logging in again.');
          return;
        }

        if (session && session.user) {
          console.log('Found existing session, redirecting...');
          setSuccess(true);
          toast.success('Welcome back to MailSmithery!');
          
          setTimeout(() => {
            navigate('/projects');
          }, 1000);
          return;
        }

        // If we get here, no valid auth code or session found
        console.log('No auth code or session found in callback');
        setError('No valid verification code found. The link may be expired or invalid.');
        
      } catch (err) {
        console.error('Auth callback error:', err);
        setError('An unexpected error occurred during verification. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  MailSmithery
                </h1>
                <div className="flex items-center space-x-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-md">
                  <Sparkles className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">AI</span>
                </div>
              </div>
            </div>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Verifying your email...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Email Verified!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your email has been successfully verified. Welcome to MailSmithery!
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              You'll be redirected to your dashboard in a moment...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Verification Failed</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              There was an issue verifying your email. The link may be expired or invalid.
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/signup')}
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
              >
                Try Signing Up Again
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="w-full"
              >
                Back to Login
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}