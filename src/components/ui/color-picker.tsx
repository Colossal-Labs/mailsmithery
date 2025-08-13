import React, { useState } from 'react';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Input } from './input';
import { Label } from './label';

interface Props {
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

export function ColorPicker({ value, onChange, className }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const presetColors = [
    '#0C7C59', '#F2B705', '#E74C3C', '#3498DB',
    '#9B59B6', '#1ABC9C', '#F39C12', '#2ECC71',
    '#E67E22', '#95A5A6', '#34495E', '#2C3E50',
    '#111111', '#FFFFFF', '#F8F9FA', '#DEE2E6'
  ];

  const handleColorChange = (color: string) => {
    setTempValue(color);
    onChange(color);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-start text-left font-normal ${className}`}
        >
          <div className="flex items-center gap-2 w-full">
            <div
              className="w-4 h-4 rounded border border-gray-200"
              style={{ backgroundColor: value }}
            />
            <span className="flex-1">{value}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex gap-2">
              <Input
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                placeholder="#000000"
                className="flex-1"
              />
              <div
                className="w-10 h-10 rounded border border-gray-200 flex-shrink-0"
                style={{ backgroundColor: tempValue }}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Presets</Label>
            <div className="grid grid-cols-8 gap-2">
              {presetColors.map((color) => (
                <button
                  key={color}
                  className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => {
                setTempValue(value);
                setIsOpen(false);
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              size="sm" 
              onClick={() => {
                onChange(tempValue);
                setIsOpen(false);
              }}
              className="flex-1"
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}