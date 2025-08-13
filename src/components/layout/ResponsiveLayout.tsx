import React, { useState, useEffect } from 'react';
import { useDeviceType } from '../../hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { cn } from '../../lib/utils';
import { 
  Menu, 
  Settings, 
  Eye, 
  History, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface ResponsiveLayoutProps {
  leftPanel: React.ReactNode;
  middlePanel: React.ReactNode;
  rightPanel: React.ReactNode;
  className?: string;
}

type PanelView = 'controls' | 'preview' | 'blocks';

export function ResponsiveLayout({ 
  leftPanel, 
  middlePanel, 
  rightPanel, 
  className 
}: ResponsiveLayoutProps) {
  const deviceType = useDeviceType();
  const [activeMobilePanel, setActiveMobilePanel] = useState<PanelView>('preview');
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Auto-close panels when device type changes
  useEffect(() => {
    if (deviceType === 'desktop') {
      setIsLeftPanelOpen(false);
      setIsRightPanelOpen(false);
      setIsFullscreen(false);
    }
  }, [deviceType]);

  if (deviceType === 'mobile') {
    return (
      <div className={cn('h-full flex flex-col', className)}>
        {/* Mobile Tab Navigation */}
        <div className="border-b bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm sticky top-0 z-40">
          <Tabs value={activeMobilePanel} onValueChange={(value) => setActiveMobilePanel(value as PanelView)}>
            <div className="flex items-center justify-between px-4 py-2">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="controls" className="flex items-center gap-1 text-xs">
                  <Settings className="w-3 h-3" />
                  Controls
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center gap-1 text-xs">
                  <Eye className="w-3 h-3" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="blocks" className="flex items-center gap-1 text-xs">
                  <History className="w-3 h-3" />
                  Blocks
                </TabsTrigger>
              </TabsList>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="ml-2"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
            </div>
            
            {/* Mobile Tab Content */}
            <TabsContent value="controls" className="mt-0">
              <div className="h-[calc(100vh-120px)] overflow-y-auto">
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
              <div className="h-[calc(100vh-120px)] overflow-y-auto">
                {rightPanel}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  if (deviceType === 'tablet') {
    return (
      <div className={cn('h-full flex', className)}>
        {/* Left Panel - Collapsible Sheet */}
        <Sheet open={isLeftPanelOpen} onOpenChange={setIsLeftPanelOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="fixed top-20 left-4 z-50 md:hidden"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <div className="h-full overflow-y-auto">
              {leftPanel}
            </div>
          </SheetContent>
        </Sheet>

        {/* Main Content Area */}
        <div className="flex-1 flex">
          {/* Middle Panel - Preview */}
          <div className="flex-1">
            {middlePanel}
          </div>
          
          {/* Right Panel - Collapsible */}
          <div className={cn(
            "transition-all duration-300 border-l bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm",
            isRightPanelOpen ? "w-80" : "w-12"
          )}>
            <div className="h-full flex flex-col">
              <div className="p-2 border-b">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
                  className="w-full"
                >
                  {isRightPanelOpen ? (
                    <ChevronRight className="w-4 h-4" />
                  ) : (
                    <ChevronLeft className="w-4 h-4" />
                  )}
                </Button>
              </div>
              {isRightPanelOpen && (
                <div className="flex-1 overflow-y-auto">
                  {rightPanel}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Layout (preserved original three-panel layout)
  return (
    <div className={cn('h-full flex', className)}>
      {/* Left Panel - Controls */}
      <div className="w-80 border-r bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm overflow-y-auto">
        {leftPanel}
      </div>

      {/* Middle Panel - Preview */}
      <div className="flex-1 bg-slate-50/50 dark:bg-slate-950/50">
        {middlePanel}
      </div>

      {/* Right Panel - Versions & Blocks */}
      <div className="w-80 border-l bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm overflow-y-auto">
        {rightPanel}
      </div>
    </div>
  );
}