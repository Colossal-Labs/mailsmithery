import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Layout, Palette, Type, Image, Zap, Wand2 } from 'lucide-react';
import type { TemplatePlan, EditOperation } from '../../types';

interface Props {
  onEdit: (ops: EditOperation[], prompt?: string) => void;
  currentTemplatePlan: TemplatePlan;
  isMobile?: boolean;
}

export function QuickEditActions({ onEdit, currentTemplatePlan, isMobile = false }: Props) {
  const quickActions = [
    {
      category: 'Layout',
      icon: Layout,
      actions: [
        {
          label: 'Big Hero',
          fullLabel: 'Big Hero Image',
          description: 'Make header a large image hero section',
          ops: [
            { op: 'update-style', targetId: 'hero-1', path: 'mj-section.padding', value: '80px 20px' },
            { op: 'update-style', targetId: 'hero-1', path: 'mj-section.background-size', value: 'cover' }
          ] as EditOperation[]
        },
        {
          label: 'Add Products',
          fullLabel: 'Add Product Grid',
          description: 'Insert 3-column product showcase',
          ops: [
            { 
              op: 'insert-after', 
              targetId: 'hero-1', 
              nodeMjml: '<mj-section data-id="products-new"><mj-column><mj-text>Product Grid</mj-text></mj-column></mj-section>' 
            }
          ] as EditOperation[]
        },
        {
          label: 'Remove Footer',
          fullLabel: 'Remove Footer',
          description: 'Hide the footer section',
          ops: [
            { op: 'remove', targetId: 'footer-1' }
          ] as EditOperation[]
        }
      ]
    },
    {
      category: 'Style',
      icon: Palette,
      actions: [
        {
          label: 'Green Buttons',
          fullLabel: 'Green Buttons',
          description: 'Change primary buttons to green',
          ops: [
            { op: 'update-style', targetId: 'cta-hero-1', path: 'mj-button.background-color', value: '#00A060' }
          ] as EditOperation[]
        },
        {
          label: 'Pill Buttons',
          fullLabel: 'Pill Buttons',
          description: 'Make buttons completely rounded',
          ops: [
            { op: 'update-style', targetId: 'cta-hero-1', path: 'mj-button.border-radius', value: '25px' }
          ] as EditOperation[]
        },
        {
          label: 'Dark Theme',
          fullLabel: 'Dark Theme',
          description: 'Apply dark color scheme',
          ops: [
            { op: 'update-style', targetId: 'hero-1', path: 'mj-section.background-color', value: '#1a1a1a' },
            { op: 'update-style', targetId: 'headline-hero-1', path: 'mj-text.color', value: '#ffffff' }
          ] as EditOperation[]
        }
      ]
    },
    {
      category: 'Content',
      icon: Type,
      actions: [
        {
          label: 'Bigger Text',
          fullLabel: 'Bigger Text',
          description: 'Increase body text to 16px',
          ops: [
            { op: 'update-style', targetId: 'content-text-content-1', path: 'mj-text.font-size', value: '16px' }
          ] as EditOperation[]
        },
        {
          label: 'Bold Headlines',
          fullLabel: 'Bold Headlines',
          description: 'Make all headlines bolder',
          ops: [
            { op: 'update-style', targetId: 'headline-hero-1', path: 'mj-text.font-weight', value: '900' }
          ] as EditOperation[]
        },
        {
          label: 'Add Testimonial',
          fullLabel: 'Add Testimonial',
          description: 'Insert customer testimonial section',
          ops: [
            { 
              op: 'insert-after', 
              targetId: 'hero-1', 
              nodeMjml: '<mj-section data-id="testimonial-1" padding="40px 20px"><mj-column><mj-text align="center" font-style="italic">"This product changed my life!" - Happy Customer</mj-text></mj-column></mj-section>' 
            }
          ] as EditOperation[]
        }
      ]
    }
  ];

  const handleQuickAction = (ops: EditOperation[], label: string) => {
    onEdit(ops, `Quick action: ${label}`);
  };

  if (isMobile) {
    // Mobile: Show actions as compact grid
    return (
      <div className="space-y-3">
        {quickActions.map((category) => {
          const IconComponent = category.icon;
          return (
            <div key={category.category}>
              <div className="flex items-center gap-2 mb-2">
                <IconComponent className="w-3 h-3 text-slate-600" />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {category.category}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {category.actions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action.ops, action.fullLabel)}
                    className="h-auto py-2 px-2 text-xs"
                  >
                    <div className="text-center">
                      <div className="font-medium">{action.label}</div>
                    </div>
                  </Button>
                ))}
              </div>
              
              {category.category !== 'Content' && <Separator className="mt-3" />}
            </div>
          );
        })}
        
        <div className="mt-4 pt-3 border-t">
          <div className="flex items-center gap-2 mb-2">
            <Wand2 className="w-3 h-3 text-purple-600" />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Template Info
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="text-xs text-slate-600">Sections</div>
              <Badge variant="secondary" className="text-xs mt-1">
                {currentTemplatePlan.sections.length}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-xs text-slate-600">Type</div>
              <Badge variant="outline" className="text-xs mt-1 capitalize">
                {currentTemplatePlan.meta.emailType.slice(0, 8)}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-xs text-slate-600">Tone</div>
              <Badge variant="outline" className="text-xs mt-1 capitalize">
                {currentTemplatePlan.meta.tone}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop/Tablet: Full layout
  return (
    <div className="space-y-4">
      {quickActions.map((category) => {
        const IconComponent = category.icon;
        return (
          <div key={category.category} className="overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <IconComponent className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {category.category}
              </span>
            </div>
            
            <div className="grid gap-2 overflow-hidden">
              {category.actions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction(action.ops, action.fullLabel)}
                  className="justify-start text-left h-auto py-2 px-3 overflow-hidden"
                >
                  <div className="flex items-center gap-2 w-full overflow-hidden">
                    <Zap className="w-3 h-3 text-blue-500 flex-shrink-0" />
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <div className="text-xs font-medium truncate">{action.fullLabel}</div>
                      <div className="text-xs text-slate-500 truncate">{action.description}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
            
            {category.category !== 'Content' && <Separator className="mt-4" />}
          </div>
        );
      })}
      
      <div className="mt-6 pt-4 border-t">
        <div className="flex items-center gap-2 mb-3">
          <Wand2 className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Template Info
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-600">Sections:</span>
            <Badge variant="secondary" className="text-xs">
              {currentTemplatePlan.sections.length}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-600">Type:</span>
            <Badge variant="outline" className="text-xs capitalize">
              {currentTemplatePlan.meta.emailType}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-600">Tone:</span>
            <Badge variant="outline" className="text-xs capitalize">
              {currentTemplatePlan.meta.tone}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}