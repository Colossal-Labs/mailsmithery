import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Wand2, Palette, Mail, Volume2, MessageSquare, Zap, Settings } from 'lucide-react';
import { useDeviceType } from '../../hooks/use-mobile';
import type { Project, TemplatePlan, EditOperation } from '../../types';
import { QuickEditActions } from './QuickEditActions';

interface Props {
  project: Project;
  onGenerate: (data: { emailType: string; subject: string; tone: string; prompt: string }) => void;
  onEdit: (ops: EditOperation[], prompt?: string) => void;
  isGenerating: boolean;
  currentTemplatePlan?: TemplatePlan | null;
}

const emailTypes = [
  { value: 'announcement', label: 'Announcement', description: 'Product launches, updates' },
  { value: 'newsletter', label: 'Newsletter', description: 'Regular content updates' },
  { value: 'promotional', label: 'Promotional', description: 'Sales, discounts, offers' },
  { value: 'transactional', label: 'Transactional', description: 'Receipts, confirmations' },
  { value: 'welcome', label: 'Welcome', description: 'Onboarding sequences' },
  { value: 'reminder', label: 'Reminder', description: 'Appointments, deadlines' },
];

const tones = [
  { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
  { value: 'professional', label: 'Professional', description: 'Formal and business-like' },
  { value: 'urgent', label: 'Urgent', description: 'Time-sensitive messaging' },
  { value: 'casual', label: 'Casual', description: 'Relaxed and informal' },
  { value: 'luxury', label: 'Luxury', description: 'Premium and sophisticated' },
  { value: 'playful', label: 'Playful', description: 'Fun and energetic' },
];

export function EditorLeftPanel({ project, onGenerate, onEdit, isGenerating, currentTemplatePlan }: Props) {
  const deviceType = useDeviceType();
  const [emailType, setEmailType] = useState('announcement');
  const [subject, setSubject] = useState('');
  const [tone, setTone] = useState('friendly');
  const [prompt, setPrompt] = useState('');
  const [customizePrompt, setCustomizePrompt] = useState('');

  const handleGenerate = () => {
    if (!prompt.trim()) {
      return;
    }
    onGenerate({ emailType, subject, tone, prompt });
  };

  const handleCustomize = () => {
    if (!customizePrompt.trim() || !currentTemplatePlan) {
      return;
    }
    // For now, we'll generate simple edit operations based on common requests
    const ops = generateEditOperationsFromPrompt(customizePrompt);
    onEdit(ops, customizePrompt);
    setCustomizePrompt('');
  };

  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';

  return (
    <div className={`${isMobile ? 'p-4' : 'p-6'} space-y-${isMobile ? '4' : '6'}`}>
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <Settings className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-blue-600`} />
        <h2 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold`}>Template Controls</h2>
      </div>

      {/* Brand Preview - Optimized for Mobile */}
      <Card>
        <CardHeader className={`${isMobile ? 'pb-2' : 'pb-3'}`}>
          <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-sm' : 'text-sm'}`}>
            <Palette className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
            Brand Tokens
          </CardTitle>
        </CardHeader>
        <CardContent className={isMobile ? 'pb-3' : ''}>
          <div className="flex gap-2 mb-3">
            <div 
              className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} rounded border`}
              style={{ backgroundColor: project.brand_tokens.primary }}
              title="Primary"
            />
            <div 
              className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} rounded border`}
              style={{ backgroundColor: project.brand_tokens.secondary }}
              title="Secondary"
            />
            <div 
              className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} rounded border`}
              style={{ backgroundColor: project.brand_tokens.text }}
              title="Text"
            />
            <div 
              className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} rounded border`}
              style={{ backgroundColor: project.brand_tokens.background }}
              title="Background"
            />
          </div>
          <div className="text-xs text-slate-500">
            {project.brand_tokens.fontStack.split(',')[0]} • {project.brand_tokens.radius}px radius
          </div>
        </CardContent>
      </Card>

      {/* Template Generation - Mobile Optimized */}
      {!currentTemplatePlan && (
        <Card>
          <CardHeader className={isMobile ? 'pb-3' : ''}>
            <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-base' : ''}`}>
              <Wand2 className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
              Generate Template
            </CardTitle>
            <CardDescription className={isMobile ? 'text-sm' : ''}>
              Create a new email template with AI
            </CardDescription>
          </CardHeader>
          <CardContent className={`space-y-${isMobile ? '3' : '4'}`}>
            <div className="space-y-2">
              <Label className={`flex items-center gap-2 ${isMobile ? 'text-sm' : ''}`}>
                <Mail className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                Email Type
              </Label>
              <Select value={emailType} onValueChange={setEmailType}>
                <SelectTrigger className={isMobile ? 'h-10' : ''}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {emailTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div>
                        <div className={`font-medium ${isMobile ? 'text-sm' : ''}`}>{type.label}</div>
                        {!isMobile && (
                          <div className="text-xs text-slate-500">{type.description}</div>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className={isMobile ? 'text-sm' : ''}>Subject Line</Label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter email subject"
                className={isMobile ? 'h-10' : ''}
              />
            </div>

            <div className="space-y-2">
              <Label className={`flex items-center gap-2 ${isMobile ? 'text-sm' : ''}`}>
                <Volume2 className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                Tone
              </Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className={isMobile ? 'h-10' : ''}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      <div>
                        <div className={`font-medium ${isMobile ? 'text-sm' : ''}`}>{t.label}</div>
                        {!isMobile && (
                          <div className="text-xs text-slate-500">{t.description}</div>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className={`flex items-center gap-2 ${isMobile ? 'text-sm' : ''}`}>
                <MessageSquare className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                Description
              </Label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your email template (e.g., 'Create an announcement email with hero image, product grid, and call-to-action buttons')"
                rows={isMobile ? 3 : 4}
                className={isMobile ? 'text-sm' : ''}
              />
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={!prompt.trim() || isGenerating}
              className="w-full"
              size={isMobile ? 'lg' : 'default'}
            >
              {isGenerating ? 'Generating...' : 'Generate Template'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Template Customization - Mobile Optimized */}
      {currentTemplatePlan && (
        <>
          <Card>
            <CardHeader className={isMobile ? 'pb-3' : ''}>
              <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-base' : ''}`}>
                <Zap className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                Quick Edits
              </CardTitle>
              <CardDescription className={isMobile ? 'text-sm' : ''}>
                Common template modifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QuickEditActions 
                onEdit={onEdit} 
                currentTemplatePlan={currentTemplatePlan}
                isMobile={isMobile}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className={isMobile ? 'pb-3' : ''}>
              <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-base' : ''}`}>
                <MessageSquare className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                Custom Changes
              </CardTitle>
              <CardDescription className={isMobile ? 'text-sm' : ''}>
                Describe specific modifications
              </CardDescription>
            </CardHeader>
            <CardContent className={`space-y-${isMobile ? '3' : '4'}`}>
              <Textarea
                value={customizePrompt}
                onChange={(e) => setCustomizePrompt(e.target.value)}
                placeholder="E.g., 'Make the hero section taller', 'Change button color to green', 'Add a testimonial section'"
                rows={isMobile ? 2 : 3}
                className={isMobile ? 'text-sm' : ''}
              />
              <Button 
                onClick={handleCustomize}
                disabled={!customizePrompt.trim()}
                className="w-full"
                size={isMobile ? 'lg' : 'default'}
              >
                Apply Changes
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

// Helper function to generate edit operations from prompt
function generateEditOperationsFromPrompt(prompt: string): EditOperation[] {
  // This is a simplified implementation - in a real app, you'd parse the prompt more intelligently
  const ops: EditOperation[] = [];
  
  if (prompt.toLowerCase().includes('color')) {
    ops.push({
      op: 'update-style',
      targetId: 'cta-hero-1',
      path: 'mj-button.background-color',
      value: '#22c55e'
    });
  }
  
  if (prompt.toLowerCase().includes('taller') || prompt.toLowerCase().includes('bigger')) {
    ops.push({
      op: 'update-style',
      targetId: 'hero-1',
      path: 'mj-section.padding',
      value: '80px 20px'
    });
  }
  
  return ops;
}