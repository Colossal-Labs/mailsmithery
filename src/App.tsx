import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { EditorProvider } from './contexts/EditorContext';
import { Toaster } from '@/components/ui/sonner';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import PublicLayout from './components/layout/PublicLayout';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import ProjectsNew from './pages/ProjectsNew';
import GenerateEditor from './pages/GenerateEditor';
import ProjectsList from './pages/ProjectsList';
import UserProfile from './pages/UserProfile';
// import ProjectTemplates from './pages/ProjectTemplates';
import './App.css';

// Component to handle home route redirect logic
function HomeRoute() {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#0C7C59] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  // If user is authenticated, redirect to projects
  if (user) {
    return <Navigate to="/projects" replace />;
  }
  
  // If not authenticated, show landing page
  return (
    <PublicLayout>
      <LandingPage />
    </PublicLayout>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <EditorProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
            <Routes>
              {/* Home route with conditional logic */}
              <Route path="/" element={<HomeRoute />} />
              
              {/* Public routes */}
              <Route path="/pricing" element={
                <PublicLayout>
                  <PricingPage />
                </PublicLayout>
              } />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/auth/callback" element={<AuthCallbackPage />} />
              
              {/* Protected routes */}
              <Route path="/projects" element={
                <ProtectedRoute>
                  <ProjectsList />
                </ProtectedRoute>
              } />
              <Route path="/projects/new" element={
                <ProtectedRoute>
                  <ProjectsNew />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } />
              {/* <Route path="/projects/:projectId/templates" element={
                <ProtectedRoute>
                  <ProjectTemplates />
                </ProtectedRoute>
              } /> */}
              <Route path="/generate" element={
                <ProtectedRoute>
                  <GenerateEditor />
                </ProtectedRoute>
              } />
              <Route path="/generate/:projectId" element={
                <ProtectedRoute>
                  <GenerateEditor />
                </ProtectedRoute>
              } />
            </Routes>
            <Toaster />
          </div>
        </EditorProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;