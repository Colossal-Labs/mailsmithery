import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useDeviceType } from '../hooks/use-mobile';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const deviceType = useDeviceType();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await signIn(email, password);
      
      if (error) {
        setError(error.message);
        toast.error('Login failed: ' + error.message);
      } else if (data.user) {
        toast.success('Login successful!');
        navigate('/projects');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const isMobile = deviceType === 'mobile';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
      <div className={`w-full ${isMobile ? 'max-w-sm' : 'max-w-md'}`}>
        {/* Logo */}
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="flex items-center space-x-2">
            <div className={`flex items-center justify-center ${isMobile ? 'w-8 h-8' : 'w-10 h-10'} bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg`}>
              <Mail className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} text-white`} />
            </div>
            <div className="flex items-center space-x-2">
              <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900 dark:text-gray-100`}>
                MailSmithery
              </h1>
              <div className="flex items-center space-x-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-md">
                <Sparkles className={`${isMobile ? 'h-2 w-2' : 'h-3 w-3'} text-blue-600 dark:text-blue-400`} />
                <span className={`${isMobile ? 'text-xs' : 'text-xs'} font-medium text-blue-600 dark:text-blue-400`}>AI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
          <CardHeader className={`space-y-1 text-center ${isMobile ? 'pb-4' : ''}`}>
            <CardTitle className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold`}>Welcome Back</CardTitle>
            <CardDescription className={isMobile ? 'text-sm' : ''}>
              Sign in to your account to continue creating beautiful emails
            </CardDescription>
          </CardHeader>
          <CardContent className={isMobile ? 'px-4' : ''}>
            <form onSubmit={handleSubmit} className={`space-y-${isMobile ? '3' : '4'}`}>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription className={isMobile ? 'text-sm' : ''}>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className={isMobile ? 'text-sm' : ''}>Email</Label>
                <div className="relative">
                  <Mail className={`absolute left-3 ${isMobile ? 'top-2.5 h-4 w-4' : 'top-3 h-4 w-4'} text-gray-400`} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 ${isMobile ? 'h-10 text-sm' : ''}`}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className={isMobile ? 'text-sm' : ''}>Password</Label>
                <div className="relative">
                  <Lock className={`absolute left-3 ${isMobile ? 'top-2.5 h-4 w-4' : 'top-3 h-4 w-4'} text-gray-400`} />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pl-10 ${isMobile ? 'h-10 text-sm' : ''}`}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
                size={isMobile ? 'lg' : 'default'}
                disabled={isLoading}
              >
                {isLoading ? (
                  'Signing In...'
                ) : (
                  <>
                    Sign In
                    <ArrowRight className={`ml-2 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                  </>
                )}
              </Button>
            </form>
            
            <div className={`${isMobile ? 'mt-4' : 'mt-6'} text-center text-sm`}>
              <p className={`${isMobile ? 'text-sm' : ''} text-gray-600 dark:text-gray-400`}>
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Sign up
                </Link>
              </p>
              <div className={isMobile ? 'mt-1' : 'mt-2'}>
                <Link 
                  to="/forgot-password" 
                  className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300`}
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className={`${isMobile ? 'mt-4' : 'mt-8'} text-center ${isMobile ? 'text-xs' : 'text-xs'} text-gray-500 dark:text-gray-400`}>
          By signing in, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
}