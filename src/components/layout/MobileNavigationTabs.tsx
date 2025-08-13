import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import {
  Settings,
  Eye,
  History,
  Maximize2,
  Minimize2,
  Menu,
  X
} from 'lucide-react';

interface MobileNavigationTabsProps {
  leftPanel: React.ReactNode;
  middlePanel: React.ReactNode;
  rightPanel: React.ReactNode;
  activeTab: 'controls' | 'preview' | 'blocks';
  onTabChange: (tab: 'controls' | 'preview' | 'blocks') => void;
  isFullscreen: boolean;
  onFullscreenToggle: () => void;
  className?: string;
}

export function MobileNavigationTabs({
  leftPanel,
  middlePanel,
  rightPanel,
  activeTab,
  onTabChange,
  isFullscreen,
  onFullscreenToggle,
  className
}: MobileNavigationTabsProps) {
  return (
    <div className={cn('h-full flex flex-col', className)}>
      {/* Enhanced Mobile Tab Navigation */}
      <div className="border-b bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm sticky top-0 z-40">
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <div className="flex items-center justify-between px-3 py-2">
            <TabsList className="grid w-full max-w-xs grid-cols-3 h-9">
              <TabsTrigger 
                value="controls" 
                className="flex items-center gap-1 text-xs px-2 py-1"
              >
                <Settings className="w-3 h-3" />
                <span className="hidden xs:inline">Controls</span>
              </TabsTrigger>
              <TabsTrigger 
                value="preview" 
                className="flex items-center gap-1 text-xs px-2 py-1"
              >
                <Eye className="w-3 h-3" />
                <span className="hidden xs:inline">Preview</span>
              </TabsTrigger>
              <TabsTrigger 
                value="blocks" 
                className="flex items-center gap-1 text-xs px-2 py-1"
              >
                <History className="w-3 h-3" />
                <span className="hidden xs:inline">Blocks</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={onFullscreenToggle}
                className="h-8 w-8 p-0"
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
          
          {/* Mobile Tab Content with Better Scrolling */}
          <TabsContent value="controls" className="mt-0">
            <div className={cn(
              "overflow-y-auto transition-all duration-300",
              isFullscreen ? "h-[100vh]" : "h-[calc(100vh-120px)]"
            )}>
              {leftPanel}
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="mt-0">
            <div className={cn(
              "transition-all duration-300",
              isFullscreen ? "h-[100vh]" : "h-[calc(100vh-120px)]"
            )}>
              {middlePanel}
            </div>
          </TabsContent>
          
          <TabsContent value="blocks" className="mt-0">
            <div className={cn(
              "overflow-y-auto transition-all duration-300",
              isFullscreen ? "h-[100vh]" : "h-[calc(100vh-120px)]"
            )}>
              {rightPanel}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Enhanced Mobile Layout Hook
export function useMobileLayout() {
  const [activeTab, setActiveTab] = React.useState<'controls' | 'preview' | 'blocks'>('preview');
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);
  
  return {
    activeTab,
    setActiveTab,
    isFullscreen,
    toggleFullscreen
  };
}