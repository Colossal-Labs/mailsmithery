import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseService } from '../services/supabase';
import { BrandTokens } from '../types';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ColorPicker } from '../components/ui/color-picker';
import { ArrowLeft, Palette, Eye, Plus } from 'lucide-react';
import { toast } from 'sonner';
import AuthenticatedHeader from '../components/AuthenticatedHeader';

export default function ProjectsNew() {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('');
  const [brandTokens, setBrandTokens] = useState<BrandTokens>({
    primary: '#0C7C59',
    secondary: '#F2B705',
    text: '#111111',
    background: '#FFFFFF',
    fontStack: 'Arial, Helvetica, sans-serif',
    radius: 8,
  });
  const [siteUrl, setSiteUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) {
      toast.error('Project name is required');
      return;
    }

    setIsLoading(true);
    try {
      const project = await supabaseService.createProject(projectName, brandTokens);
      toast.success('Project created successfully!');
      navigate(`/generate/${project.id}`);
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
    } finally {
      setIsLoading(false);
    }
  };

  const updateBrandToken = (key: keyof BrandTokens, value: any) => {
    setBrandTokens(prev => ({ ...prev, [key]: value }));
  };

  const previewStyle = {
    backgroundColor: brandTokens.background,
    color: brandTokens.text,
    fontFamily: brandTokens.fontStack,
    borderRadius: `${brandTokens.radius}px`,
  };

  const buttonStyle = {
    backgroundColor: brandTokens.primary,
    color: brandTokens.background,
    borderRadius: `${brandTokens.radius}px`,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <AuthenticatedHeader />
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/projects')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Button>
          <div className="h-6 w-px bg-slate-300 dark:bg-slate-600" />
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Create New Project</h1>
            <p className="text-slate-600 dark:text-slate-400">Set up your brand tokens and start creating email templates</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Project Details
                </CardTitle>
                <CardDescription>Basic project information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter project name"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">Website URL (Optional)</Label>
                  <Input
                    id="siteUrl"
                    value={siteUrl}
                    onChange={(e) => setSiteUrl(e.target.value)}
                    placeholder="https://yoursite.com"
                    className="w-full"
                  />
                  <p className="text-xs text-slate-500">For future brand scraping feature</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Brand Tokens
                </CardTitle>
                <CardDescription>Define your brand's visual identity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <ColorPicker
                      value={brandTokens.primary}
                      onChange={(color) => updateBrandToken('primary', color)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Secondary Color</Label>
                    <ColorPicker
                      value={brandTokens.secondary}
                      onChange={(color) => updateBrandToken('secondary', color)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Text Color</Label>
                    <ColorPicker
                      value={brandTokens.text}
                      onChange={(color) => updateBrandToken('text', color)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Background Color</Label>
                    <ColorPicker
                      value={brandTokens.background}
                      onChange={(color) => updateBrandToken('background', color)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fontStack">Font Family</Label>
                  <Input
                    id="fontStack"
                    value={brandTokens.fontStack}
                    onChange={(e) => updateBrandToken('fontStack', e.target.value)}
                    placeholder="Arial, Helvetica, sans-serif"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="radius">Border Radius (px)</Label>
                  <Input
                    id="radius"
                    type="number"
                    min="0"
                    max="20"
                    value={brandTokens.radius}
                    onChange={(e) => updateBrandToken('radius', parseInt(e.target.value) || 0)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Preview Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Live Preview
                </CardTitle>
                <CardDescription>See how your brand tokens look</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-6" style={previewStyle}>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Email Template Preview</h2>
                    <p className="opacity-80">This is how your brand colors and fonts will appear in email templates.</p>
                    
                    <div className="flex gap-3">
                      <button 
                        className="px-4 py-2 text-sm font-medium transition-colors" 
                        style={buttonStyle}
                      >
                        Primary Button
                      </button>
                      <button 
                        className="px-4 py-2 text-sm font-medium border transition-colors"
                        style={{
                          backgroundColor: 'transparent',
                          color: brandTokens.primary,
                          borderColor: brandTokens.primary,
                          borderRadius: `${brandTokens.radius}px`,
                        }}
                      >
                        Secondary Button
                      </button>
                    </div>
                    
                    <div className="p-4 rounded" style={{ backgroundColor: brandTokens.secondary, color: brandTokens.background }}>
                      <p className="font-medium">Accent Section</p>
                      <p className="text-sm opacity-90">Using your secondary color</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => navigate('/projects')}>Cancel</Button>
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Project'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}