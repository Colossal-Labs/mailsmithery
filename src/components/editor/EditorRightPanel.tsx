import React, { useState, useEffect } from 'react';
import { supabaseService } from '../../services/supabase';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { History, Blocks, AlertTriangle, CheckCircle, Info, Clock, Edit } from 'lucide-react';
import type { Project, Template, Version, TemplatePlan, LintResult, EditOperation } from '../../types';

interface Props {
  project: Project;
  template?: Template;
  templatePlan?: TemplatePlan | null;
  lintResults?: LintResult;
  onEditRequest: (ops: EditOperation[], prompt?: string) => void;
}

export function EditorRightPanel({ project, template, templatePlan, lintResults, onEditRequest }: Props) {
  const [versions, setVersions] = useState<Version[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, [project.id]);

  useEffect(() => {
    if (template) {
      loadVersions();
    }
  }, [template?.id]);

  const loadTemplates = async () => {
    try {
      const templatesData = await supabaseService.getTemplates(project.id);
      setTemplates(templatesData);
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  };

  const loadVersions = async () => {
    if (!template) return;
    
    try {
      setIsLoading(true);
      const versionsData = await supabaseService.getVersions(template.id);
      setVersions(versionsData);
    } catch (error) {
      console.error('Error loading versions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSectionEdit = (sectionId: string, action: string) => {
    const ops: EditOperation[] = [];
    
    switch (action) {
      case 'remove':
        ops.push({ op: 'remove', targetId: sectionId });
        break;
      case 'duplicate':
        // For demonstration, we'll just update the section
        ops.push({ op: 'update-attr', targetId: sectionId, path: 'mj-section.padding', value: '40px 20px' });
        break;
    }
    
    if (ops.length > 0) {
      onEditRequest(ops, `${action} section ${sectionId}`);
    }
  };

  return (
    <div className="h-full">
      <Tabs defaultValue="blocks" className="h-full flex flex-col">
        <div className="p-4 pb-0">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="blocks" className="flex items-center gap-1 text-xs">
              <Blocks className="w-3 h-3" />
              Blocks
            </TabsTrigger>
            <TabsTrigger value="versions" className="flex items-center gap-1 text-xs">
              <History className="w-3 h-3" />
              History
            </TabsTrigger>
            <TabsTrigger value="lint" className="flex items-center gap-1 text-xs">
              <AlertTriangle className="w-3 h-3" />
              Lint
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          {/* Blocks/Sections Tab */}
          <TabsContent value="blocks" className="h-full mt-0">
            <div className="p-4 h-full">
              {templatePlan ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-sm mb-3">Template Sections</h3>
                    <div className="space-y-2">
                      {templatePlan.sections.map((section, index) => (
                        <Card key={section.id} className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs capitalize">
                                {section.type}
                              </Badge>
                              <span className="text-sm font-medium">{section.id}</span>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleSectionEdit(section.id, 'duplicate')}
                                className="h-6 px-2 text-xs"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleSectionEdit(section.id, 'remove')}
                                className="h-6 px-2 text-xs text-red-600 hover:text-red-700"
                              >
                                ✕
                              </Button>
                            </div>
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">
                            {section.props.headline || section.props.title || section.props.content || 'Section content'}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium text-sm mb-3">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs"
                        onClick={() => onEditRequest([
                          { op: 'insert-after', targetId: 'hero-1', nodeMjml: '<mj-section data-id="testimonial-1"><mj-column><mj-text>Great testimonial content</mj-text></mj-column></mj-section>' }
                        ], 'Add testimonial section')}
                      >
                        Add Testimonial
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs"
                        onClick={() => onEditRequest([
                          { op: 'insert-after', targetId: 'hero-1', nodeMjml: '<mj-section data-id="cta-2"><mj-column><mj-button>Call to Action</mj-button></mj-column></mj-section>' }
                        ], 'Add CTA section')}
                      >
                        Add CTA
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs"
                        onClick={() => onEditRequest([
                          { op: 'update-style', targetId: 'hero-1', path: 'mj-section.padding', value: '80px 20px' }
                        ], 'Increase hero padding')}
                      >
                        Bigger Hero
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs"
                        onClick={() => onEditRequest([
                          { op: 'update-style', targetId: 'cta-hero-1', path: 'mj-button.border-radius', value: '25px' }
                        ], 'Make buttons pill-shaped')}
                      >
                        Pill Buttons
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-slate-500 dark:text-slate-400 mt-8">
                  <Blocks className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No template loaded</p>
                  <p className="text-xs mt-1">Generate a template to see its sections</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Version History Tab */}
          <TabsContent value="versions" className="h-full mt-0">
            <ScrollArea className="h-full px-4">
              <div className="space-y-4 py-4">
                <div>
                  <h3 className="font-medium text-sm mb-3">All Templates</h3>
                  <div className="space-y-2">
                    {templates.map((tpl) => (
                      <Card key={tpl.id} className="p-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm">{tpl.name}</div>
                            <div className="text-xs text-slate-500">{formatDate(tpl.created_at)}</div>
                          </div>
                          <Badge variant="outline" className="text-xs capitalize">
                            {tpl.type}
                          </Badge>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
                
                {template && versions.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-medium text-sm mb-3">Version History</h3>
                      <div className="space-y-2">
                        {versions.map((version, index) => (
                          <Card key={version.id} className="p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span className="text-sm font-medium">
                                Version {versions.length - index}
                              </span>
                              {index === 0 && (
                                <Badge variant="default" className="text-xs">Latest</Badge>
                              )}
                            </div>
                            <div className="text-xs text-slate-500">
                              {formatDate(version.created_at)}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                              {version.ir_json.meta.subject}
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                {templates.length === 0 && (
                  <div className="text-center text-slate-500 dark:text-slate-400 mt-8">
                    <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No templates yet</p>
                    <p className="text-xs mt-1">Create your first template to see version history</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Lint Results Tab */}
          <TabsContent value="lint" className="h-full mt-0">
            <ScrollArea className="h-full px-4">
              <div className="space-y-4 py-4">
                {lintResults ? (
                  <>
                    {/* Errors */}
                    {lintResults.errors.length > 0 && (
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-sm text-red-600">
                            <AlertTriangle className="w-4 h-4" />
                            Errors ({lintResults.errors.length})
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {lintResults.errors.map((error, index) => (
                            <div key={index} className="text-sm p-2 bg-red-50 dark:bg-red-900/20 rounded border-l-2 border-red-500">
                              <div className="font-medium text-red-800 dark:text-red-200">{error.message}</div>
                              {error.fix && (
                                <div className="text-xs text-red-600 dark:text-red-300 mt-1">
                                  Fix: {error.fix}
                                </div>
                              )}
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )}

                    {/* Warnings */}
                    {lintResults.warnings.length > 0 && (
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-sm text-yellow-600">
                            <AlertTriangle className="w-4 h-4" />
                            Warnings ({lintResults.warnings.length})
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {lintResults.warnings.map((warning, index) => (
                            <div key={index} className="text-sm p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded border-l-2 border-yellow-500">
                              <div className="font-medium text-yellow-800 dark:text-yellow-200">{warning.message}</div>
                              {warning.fix && (
                                <div className="text-xs text-yellow-600 dark:text-yellow-300 mt-1">
                                  Fix: {warning.fix}
                                </div>
                              )}
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )}

                    {/* Performance */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Performance
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Size</span>
                          <div className="flex items-center gap-2">
                            <Badge variant={lintResults.performance.sizeGrade === 'A' ? 'default' : 'secondary'}>
                              {lintResults.performance.sizeKB.toFixed(1)}KB
                            </Badge>
                            <Badge variant="outline">
                              Grade {lintResults.performance.sizeGrade}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Accessibility */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm">
                          <Info className="w-4 h-4 text-blue-600" />
                          Accessibility
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Alt Text Coverage</span>
                          <Badge variant={lintResults.accessibility.altTextCoverage === 100 ? 'default' : 'destructive'}>
                            {lintResults.accessibility.altTextCoverage.toFixed(0)}%
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Unsubscribe Link</span>
                          <Badge variant={lintResults.deliverability.hasUnsubscribe ? 'default' : 'destructive'}>
                            {lintResults.deliverability.hasUnsubscribe ? 'Present' : 'Missing'}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Suggestions */}
                    {lintResults.suggestions.length > 0 && (
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-sm text-blue-600">
                            <Info className="w-4 h-4" />
                            Suggestions ({lintResults.suggestions.length})
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {lintResults.suggestions.map((suggestion, index) => (
                            <div key={index} className="text-sm p-2 bg-blue-50 dark:bg-blue-900/20 rounded border-l-2 border-blue-500">
                              <div className="font-medium text-blue-800 dark:text-blue-200">{suggestion.message}</div>
                              {suggestion.fix && (
                                <div className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                                  Tip: {suggestion.fix}
                                </div>
                              )}
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )}
                  </>
                ) : (
                  <div className="text-center text-slate-500 dark:text-slate-400 mt-8">
                    <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No lint results</p>
                    <p className="text-xs mt-1">Generate a template to see accessibility and performance analysis</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}