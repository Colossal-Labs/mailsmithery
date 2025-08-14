import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseService } from '../services/supabase';
import { Project } from '../types';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Plus, Palette, Calendar, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import AuthenticatedHeader from '../components/AuthenticatedHeader';

export default function ProjectsList() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const projectsData = await supabaseService.getProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error('Error loading projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Safe function to get font name with proper null/undefined handling
  const getFontName = (fontStack: string | undefined | null): string => {
    if (!fontStack || typeof fontStack !== 'string') {
      return 'Default Font';
    }
    try {
      const firstFont = fontStack.split(',')[0]?.trim();
      return firstFont || 'Default Font';
    } catch {
      return 'Default Font';
    }
  };

  // Safe function to get radius with fallback
  const getRadius = (radius: number | undefined | null): number => {
    return typeof radius === 'number' ? radius : 8;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <AuthenticatedHeader />
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <AuthenticatedHeader />
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Projects
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Manage your email template projects
            </p>
          </div>
          <Button onClick={() => navigate('/projects/new')} size="lg" className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Project
          </Button>
        </div>

        {projects.length === 0 ? (
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="pt-8 pb-8">
              <div className="mb-4">
                <Palette className="w-16 h-16 mx-auto text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Projects Yet</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Create your first project to start building email templates with your brand tokens.
              </p>
              <Button onClick={() => navigate('/projects/new')} className="flex items-center gap-2 mx-auto">
                <Plus className="w-4 h-4" />
                Create First Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card 
                key={project.id} 
                className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 group"
                onClick={() => navigate(`/projects/${project.id}/templates`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {project.name}
                    </CardTitle>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <CardDescription className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4" />
                    Created {formatDate(project.created_at)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Brand Colors Preview */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Brand Colors:</span>
                    </div>
                    <div className="flex gap-2">
                      <div 
                        className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700"
                        style={{ backgroundColor: project.brand_tokens?.primary || '#1a73e8' }}
                        title={`Primary: ${project.brand_tokens?.primary || '#1a73e8'}`}
                      />
                      <div 
                        className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700"
                        style={{ backgroundColor: project.brand_tokens?.secondary || '#34a853' }}
                        title={`Secondary: ${project.brand_tokens?.secondary || '#34a853'}`}
                      />
                      <div 
                        className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700"
                        style={{ backgroundColor: project.brand_tokens?.text || '#1f2937' }}
                        title={`Text: ${project.brand_tokens?.text || '#1f2937'}`}
                      />
                      <div 
                        className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700"
                        style={{ backgroundColor: project.brand_tokens?.background || '#ffffff' }}
                        title={`Background: ${project.brand_tokens?.background || '#ffffff'}`}
                      />
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">
                        {getFontName(project.brand_tokens?.fontStack)}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {getRadius(project.brand_tokens?.radius)}px radius
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}