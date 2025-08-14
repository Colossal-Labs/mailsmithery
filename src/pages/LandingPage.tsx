import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Sparkles, Mail, Palette, Users, Zap, Target, TrendingUp } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0C7C59] via-[#0C7C59] to-[#0a6b4e] text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center bg-[#F2B705]/20 text-[#F2B705] px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Beta Access - All Features Free Until December 2025
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                AI-Powered Email Templates That
                <span className="text-[#F2B705]"> Match Your Brand</span>
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Extract your brand elements automatically and generate stunning, responsive email templates in minutes. 
                The only platform that truly understands your brand identity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#F2B705] text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#d9a004] transition-colors flex items-center justify-center">
                  Start Free Beta
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button className="border border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors">
                  Watch Demo
                </button>
              </div>
              <div className="flex items-center space-x-8 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#F2B705] mr-2" />
                  No Credit Card Required
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#F2B705] mr-2" />
                  2-Minute Setup
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/images/ai_email_marketing_automation_hero_image.jpg" 
                alt="AI Email Marketing Automation" 
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#0C7C59] rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Template Generation</div>
                    <div className="text-lg font-bold text-gray-900">2.3 seconds</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Future of Email Design is Here
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop spending hours on email design. Let AI create brand-consistent, professional templates in seconds.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-[#0C7C59] rounded-lg flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI Template Generation</h3>
              <p className="text-gray-600 leading-relaxed">
                Generate unlimited email templates with AI that understands your brand voice, colors, and style guidelines.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-[#F2B705] rounded-lg flex items-center justify-center mb-6">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Brand Extraction</h3>
              <p className="text-gray-600 leading-relaxed">
                Automatically extract logos, colors, fonts, and design elements from your website or brand assets.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-[#0C7C59] rounded-lg flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Responsive Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Every template is mobile-optimized and tested across 25+ email clients for perfect rendering.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-[#F2B705] rounded-lg flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Template Library</h3>
              <p className="text-gray-600 leading-relaxed">
                Access 500+ professionally designed templates across industries, all customizable to your brand.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-[#0C7C59] rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Team Collaboration</h3>
              <p className="text-gray-600 leading-relaxed">
                Real-time collaboration with approval workflows, commenting, and role-based permissions.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-[#F2B705] rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Track template performance with advanced analytics and A/B testing capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Three Simple Steps to Perfect Email Templates
            </h2>
            <p className="text-xl text-gray-600">
              From brand extraction to email deployment in under 5 minutes
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#0C7C59] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Extract Your Brand</h3>
              <p className="text-gray-600 leading-relaxed">
                Upload your logo or website URL. Our AI automatically extracts your colors, fonts, and brand elements.
              </p>
              <img 
                src="/images/brand_identity_design_elements_color_logo_typography.jpg" 
                alt="Brand extraction process" 
                className="rounded-lg mt-6 w-full h-48 object-cover"
              />
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-[#F2B705] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Generate Templates</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose from 500+ templates or describe what you need. AI creates brand-consistent designs instantly.
              </p>
              <img 
                src="/images/modern_colorful_email_newsletter_templates.jpg" 
                alt="Template generation" 
                className="rounded-lg mt-6 w-full h-48 object-cover"
              />
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-[#0C7C59] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Export & Use</h3>
              <p className="text-gray-600 leading-relaxed">
                Export to HTML, integrate with your ESP, or use our direct integrations with 25+ platforms.
              </p>
              <img 
                src="/images/email_marketing_dashboard_analytics_interface.jpg" 
                alt="Export and integration" 
                className="rounded-lg mt-6 w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#0C7C59] to-[#0a6b4e] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center bg-[#F2B705]/20 text-[#F2B705] px-6 py-3 rounded-full text-lg font-medium mb-8">
            <Sparkles className="w-5 h-5 mr-2" />
            Limited Time: Beta Access Free Until December 2025
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Email Design Process?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join thousands of marketers already using MailSmithery to create stunning email templates in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#F2B705] text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#d9a004] transition-colors flex items-center justify-center">
              Start Free Beta Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <Link 
              to="/pricing" 
              className="border border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              View Pricing Plans
            </Link>
          </div>
          <p className="text-sm text-gray-300 mt-4">
            No credit card required • Full access during beta • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;