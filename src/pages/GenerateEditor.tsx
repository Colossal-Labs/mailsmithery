import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEditor } from '../contexts/EditorContext';
import { supabaseService } from '../services/supabase';
import { EditorLeftPanel } from '../components/editor/EditorLeftPanel';
import { EditorRightPanel } from '../components/editor/EditorRightPanel';
import { ResponsiveLayout } from '../components/layout/ResponsiveLayout';
import { TouchFriendlyPreview } from '../components/layout/TouchFriendlyPreview';
import { Button } from '../components/ui/button';
import { ArrowLeft, Save, Download, Menu } from 'lucide-react';
import { toast } from 'sonner';
import { useDeviceType } from '../hooks/use-mobile';
import type { TemplatePlan, EditOperation } from '../types';
import AuthenticatedHeader from '../components/AuthenticatedHeader';

export default function GenerateEditor() {
  const { projectId, templateId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useEditor();
  const deviceType = useDeviceType();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentMjml, setCurrentMjml] = useState('');
  const [currentTemplatePlan, setCurrentTemplatePlan] = useState<TemplatePlan | null>(null);

  useEffect(() => {
    if (projectId) {
      loadProject(projectId);
    }
    if (templateId) {
      loadTemplate(templateId);
    }
  }, [projectId, templateId]);

  const loadProject = async (id: string) => {
    try {
      const project = await supabaseService.getProject(id);
      if (project) {
        dispatch({ type: 'SET_PROJECT', payload: project });
      }
    } catch (error) {
      console.error('Error loading project:', error);
      toast.error('Failed to load project');
    }
  };

  const loadTemplate = async (id: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const template = await supabaseService.getTemplate(id);
      if (template) {
        dispatch({ type: 'SET_TEMPLATE', payload: template });
        
        const latestVersion = await supabaseService.getLatestVersion(id);
        if (latestVersion) {
          dispatch({ type: 'SET_VERSION', payload: latestVersion });
          setCurrentMjml(latestVersion.mjml);
          setCurrentTemplatePlan(latestVersion.ir_json);
          compileTemplate(latestVersion.mjml);
        }
      }
    } catch (error) {
      console.error('Error loading template:', error);
      toast.error('Failed to load template');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const compileTemplate = async (mjml: string) => {
    try {
      const result = await supabaseService.compileTemplate(mjml);
      dispatch({ type: 'SET_COMPILED_HTML', payload: result.html });
      
      // Run lint checks
      const lintResults = await supabaseService.lintTemplate(mjml, result.html);
      dispatch({ type: 'SET_LINT_RESULTS', payload: lintResults });
    } catch (error) {
      console.error('Error compiling template:', error);
      toast.error('Failed to compile template');
    }
  };

  const handleGenerateTemplate = async (data: {
    emailType: string;
    subject: string;
    tone: string;
    prompt: string;
  }) => {
    if (!state.currentProject) {
      toast.error('No project selected');
      return;
    }

    setIsGenerating(true);
    try {
      const templatePlan = await supabaseService.planTemplate({
        projectId: state.currentProject.id,
        ...data,
        brandTokens: state.currentProject.brand_tokens,
      });

      setCurrentTemplatePlan(templatePlan);
      setCurrentMjml(templatePlan.mjml);
      await compileTemplate(templatePlan.mjml);
      
      toast.success('Template generated successfully!');
    } catch (error) {
      console.error('Error generating template:', error);
      toast.error('Failed to generate template');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEditTemplate = async (ops: EditOperation[], prompt?: string) => {
    if (!state.currentTemplate || !currentTemplatePlan) {
      toast.error('No template to edit');
      return;
    }

    try {
      const editResult = await supabaseService.editTemplate({
        templateId: state.currentTemplate.id,
        ops,
        prompt,
      });

      setCurrentMjml(editResult.mjml);
      await compileTemplate(editResult.mjml);
      
      toast.success('Template updated successfully!');
    } catch (error) {
      console.error('Error editing template:', error);
      toast.error('Failed to edit template');
    }
  };

  const handleSaveTemplate = async (templateName: string) => {
    if (!state.currentProject || !currentTemplatePlan || !currentMjml || !state.compiledHtml) {
      toast.error('Missing required data to save template');
      return;
    }

    setIsSaving(true);
    try {
      const result = await supabaseService.saveTemplate({
        projectId: state.currentProject.id,
        templateName,
        templateType: currentTemplatePlan.meta.emailType,
        irJson: currentTemplatePlan,
        mjml: currentMjml,
        html: state.compiledHtml,
      });

      toast.success('Template saved successfully!');
      navigate(`/generate/${state.currentProject.id}/${result.templateId}`);
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error('Failed to save template');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportHtml = () => {
    if (!state.compiledHtml) {
      toast.error('No compiled HTML to export');
      return;
    }

    const blob = new Blob([state.compiledHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentTemplatePlan?.meta.subject || 'email-template'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('HTML exported successfully!');
  };

  if (!projectId || !state.currentProject) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">No Project Selected</h2>
          <Button onClick={() => navigate('/projects')} size={deviceType === 'mobile' ? 'lg' : 'default'}>
            Go to Projects
          </Button>
        </div>
      </div>
    );
  }

  const leftPanel = (
    <EditorLeftPanel
      project={state.currentProject}
      onGenerate={handleGenerateTemplate}
      onEdit={handleEditTemplate}
      isGenerating={isGenerating}
      currentTemplatePlan={currentTemplatePlan}
    />
  );

  const middlePanel = (
    <TouchFriendlyPreview
      html={state.compiledHtml}
      mjml={currentMjml}
      previewMode={state.previewMode}
      isDarkMode={state.isDarkMode}
      showMjmlSource={state.showMjmlSource}
      isLoading={state.isLoading || isGenerating}
      onPreviewModeChange={(mode) => dispatch({ type: 'SET_PREVIEW_MODE', payload: mode })}
      onDarkModeToggle={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
      onMjmlSourceToggle={() => dispatch({ type: 'TOGGLE_MJML_SOURCE' })}
    />
  );

  const rightPanel = (
    <EditorRightPanel
      project={state.currentProject}
      template={state.currentTemplate}
      templatePlan={currentTemplatePlan}
      lintResults={state.lintResults}
      onEditRequest={handleEditTemplate}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <AuthenticatedHeader />
      
      {/* Enhanced Header with Mobile Optimization */}
      <div className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
              <Button
                variant="ghost"
                size={deviceType === 'mobile' ? 'sm' : 'sm'}
                onClick={() => navigate('/projects')}
                className="flex items-center gap-1 md:gap-2 flex-shrink-0"
              >
                <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
                {deviceType !== 'mobile' && 'Back'}
              </Button>
              {deviceType !== 'mobile' && (
                <div className="h-4 md:h-6 w-px bg-slate-300 dark:bg-slate-600 flex-shrink-0" />
              )}
              <div className="min-w-0 flex-1">
                <h1 className="text-base md:text-xl font-bold text-slate-900 dark:text-slate-100 truncate">
                  {state.currentProject.name}
                </h1>
                {currentTemplatePlan && deviceType !== 'mobile' && (
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 truncate">
                    {currentTemplatePlan.meta.subject} • {currentTemplatePlan.meta.emailType}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
              {state.compiledHtml && (
                <>
                  <Button
                    variant="outline"
                    size={deviceType === 'mobile' ? 'sm' : 'sm'}
                    onClick={handleExportHtml}
                    className="flex items-center gap-1 md:gap-2"
                  >
                    <Download className="w-3 h-3 md:w-4 md:h-4" />
                    {deviceType === 'desktop' && 'Export'}
                  </Button>
                  <Button
                    size={deviceType === 'mobile' ? 'sm' : 'sm'}
                    onClick={() => {
                      const templateName = prompt('Enter template name:');
                      if (templateName) {
                        handleSaveTemplate(templateName);
                      }
                    }}
                    disabled={isSaving}
                    className="flex items-center gap-1 md:gap-2"
                  >
                    <Save className="w-3 h-3 md:w-4 md:h-4" />
                    {isSaving ? (deviceType === 'mobile' ? 'Save...' : 'Saving...') : (deviceType === 'mobile' ? 'Save' : 'Save Version')}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Three-Panel Layout */}
      <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-120px)]">
        <ResponsiveLayout
          leftPanel={leftPanel}
          middlePanel={middlePanel}
          rightPanel={rightPanel}
        />
      </div>
    </div>
  );
}