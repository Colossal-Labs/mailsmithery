import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#0C7C59] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900">MailSmithery</span>
          </Link>

          {/* Desktop Navigation - Only valid pages */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive('/') 
                  ? 'text-[#0C7C59]' 
                  : 'text-gray-600 hover:text-[#0C7C59]'
              }`}
            >
              Home
            </Link>
            <Link
              to="/pricing"
              className={`font-medium transition-colors ${
                isActive('/pricing') 
                  ? 'text-[#0C7C59]' 
                  : 'text-gray-600 hover:text-[#0C7C59]'
              }`}
            >
              Pricing
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-gray-600 hover:text-[#0C7C59]">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-[#0C7C59] text-white hover:bg-[#0a6b4e]">
                Start Free Beta
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={`font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-[#0C7C59]' 
                    : 'text-gray-600 hover:text-[#0C7C59]'
                }`}
              >
                Home
              </Link>
              <Link
                to="/pricing"
                onClick={() => setIsOpen(false)}
                className={`font-medium transition-colors ${
                  isActive('/pricing') 
                    ? 'text-[#0C7C59]' 
                    : 'text-gray-600 hover:text-[#0C7C59]'
                }`}
              >
                Pricing
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-[#0C7C59]">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-[#0C7C59] text-white hover:bg-[#0a6b4e]">
                    Start Free Beta
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;