import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { EditorProvider } from './contexts/EditorContext';
import { Toaster } from '@/components/ui/sonner';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import ProjectsNew from './pages/ProjectsNew';
import GenerateEditor from './pages/GenerateEditor';
import ProjectsList from './pages/ProjectsList';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <EditorProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/auth/callback" element={<AuthCallbackPage />} />
              
              {/* Protected routes */}
              <Route path="/" element={<Navigate to="/projects" replace />} />
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
              <Route path="/generate/:projectId/:templateId" element={
                <ProtectedRoute>
                  <GenerateEditor />
                </ProtectedRoute>
              } />
            </Routes>
            <Toaster position="top-right" richColors />
          </div>
        </EditorProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;