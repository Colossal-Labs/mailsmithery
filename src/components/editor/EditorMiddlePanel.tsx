import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { Monitor, Smartphone, Moon, Sun, Code, Eye, RefreshCw } from 'lucide-react';

interface Props {
  html?: string;
  mjml?: string;
  previewMode: 'desktop' | 'mobile';
  isDarkMode: boolean;
  showMjmlSource: boolean;
  isLoading: boolean;
  onPreviewModeChange: (mode: 'desktop' | 'mobile') => void;
  onDarkModeToggle: () => void;
  onMjmlSourceToggle: () => void;
}

export function EditorMiddlePanel({
  html,
  mjml,
  previewMode,
  isDarkMode,
  showMjmlSource,
  isLoading,
  onPreviewModeChange,
  onDarkModeToggle,
  onMjmlSourceToggle,
}: Props) {
  const getPreviewWidth = () => {
    return previewMode === 'mobile' ? '375px' : '100%';
  };

  return (
    <div className="h-full flex flex-col">
      {/* Preview Controls */}
      <div className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              Live Preview
            </Badge>
            {html && (
              <Badge variant="outline" className="text-xs">
                {Math.round(new TextEncoder().encode(html).length / 1024)}KB
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {/* Preview Mode Toggle */}
            <div className="flex items-center border rounded-md">
              <Button
                variant={previewMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onPreviewModeChange('desktop')}
                className="rounded-r-none"
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={previewMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onPreviewModeChange('mobile')}
                className="rounded-l-none"
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Dark Mode Toggle */}
            <Button variant="outline" size="sm" onClick={onDarkModeToggle}>
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            
            {/* Source Toggle */}
            <Button variant="outline" size="sm" onClick={onMjmlSourceToggle}>
              {showMjmlSource ? <Eye className="w-4 h-4" /> : <Code className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-hidden">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-600" />
              <p className="text-slate-600 dark:text-slate-400">Generating template...</p>
            </div>
          </div>
        ) : showMjmlSource && mjml ? (
          // MJML Source View
          <div className="h-full p-4">
            <Card className="h-full">
              <ScrollArea className="h-full p-4">
                <pre className="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap font-mono">
                  {mjml}
                </pre>
              </ScrollArea>
            </Card>
          </div>
        ) : html ? (
          // HTML Preview
          <div className="h-full flex items-center justify-center p-4">
            <div 
              className="bg-white dark:bg-slate-800 shadow-2xl rounded-lg overflow-hidden transition-all duration-300"
              style={{ 
                width: getPreviewWidth(),
                maxWidth: '100%',
                height: 'fit-content',
                maxHeight: '100%'
              }}
            >
              <div className="h-full overflow-auto">
                <iframe
                  srcDoc={html}
                  className="w-full border-0"
                  style={{ 
                    minHeight: '600px',
                    backgroundColor: 'white'
                  }}
                  title="Email Preview"
                  sandbox="allow-same-origin"
                />
              </div>
            </div>
          </div>
        ) : (
          // Empty State
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-4 max-w-md">
              <div className="w-24 h-24 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                <Mail className="w-12 h-12 text-slate-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  No Template Generated
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Use the controls on the left to generate your first email template. 
                  Describe what you want and watch the magic happen!
                </p>
                <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                  <p>• Choose your email type and tone</p>
                  <p>• Describe your template requirements</p>
                  <p>• Generate and customize in real-time</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const Mail = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);