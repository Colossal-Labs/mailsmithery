import React, { useState } from 'react';
import { CheckCircle, Sparkles, X, ArrowRight, Users, Zap, Shield, Phone } from 'lucide-react';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const plans = {
    starter: {
      name: "Starter",
      monthlyPrice: 0,
      annualPrice: 0,
      description: "Perfect for getting started",
      features: [
        "3 brand extractions per month",
        "10 AI-generated templates per month",
        "5 template exports (PNG/JPG only)",
        "Basic template library (50 templates)",
        "Standard AI content generation",
        "Email + live chat support",
        "1 active brand profile",
        "MailSmithery watermark on exports"
      ],
      limitations: [
        "Limited template customization",
        "3 ESP integration connections"
      ],
      cta: "Get Started Free",
      popular: false
    },
    professional: {
      name: "Professional",
      monthlyPrice: 39,
      annualPrice: 35,
      description: "For small businesses & solopreneurs",
      features: [
        "Unlimited brand extractions",
        "100 AI-generated templates per month",
        "Unlimited template exports (PNG/JPG/HTML)",
        "Full template library (500+ templates)",
        "Advanced AI with brand voice consistency",
        "Priority email + chat support",
        "5 active brand profiles",
        "Remove MailSmithery branding",
        "10 ESP integration connections",
        "Basic analytics and performance tracking",
        "A/B testing capabilities",
        "2 team members"
      ],
      limitations: [],
      cta: "Start Free Trial",
      popular: true
    },
    agency: {
      name: "Agency",
      monthlyPrice: 79,
      annualPrice: 69,
      description: "For agencies & growing teams",
      features: [
        "250 AI-generated templates per month",
        "10 team members",
        "Unlimited active brand profiles",
        "White-label template exports",
        "Advanced analytics and reporting",
        "Custom template approval workflows",
        "Priority phone + email + chat support",
        "Client brand management dashboard",
        "Advanced ESP integrations (25+ platforms)",
        "Custom CSS and HTML editing",
        "Template version control and history",
        "Client presentation mode",
        "Advanced A/B testing"
      ],
      limitations: [],
      cta: "Start Free Trial",
      popular: false
    },
    enterprise: {
      name: "Enterprise",
      monthlyPrice: 199,
      annualPrice: 179,
      description: "For large organizations",
      features: [
        "Unlimited AI-generated templates",
        "Unlimited team members",
        "Custom integrations and API access",
        "Dedicated customer success manager",
        "Advanced security and compliance",
        "Custom template development services",
        "Single Sign-On (SSO) integration",
        "Advanced security certifications",
        "Custom workflow automation",
        "Advanced analytics APIs",
        "Service Level Agreements (SLAs)",
        "24/7 priority support",
        "On-premise deployment options"
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false
    }
  };

  const faqs = [
    {
      question: "What happens when the beta period ends in December 2025?",
      answer: "During the beta period, all features are completely free. Starting January 2026, the regular pricing will apply. You'll receive 30 days notice before any charges begin, and you can choose your preferred plan or continue with the free Starter plan."
    },
    {
      question: "Can I change my plan anytime?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges. There are no long-term contracts or cancellation fees."
    },
    {
      question: "Do you offer annual billing discounts?",
      answer: "Yes, we offer significant discounts for annual billing. Professional plan subscribers save 11% ($35/month vs $39/month), and Agency plan subscribers save 13% ($69/month vs $79/month) when paying annually."
    },
    {
      question: "What email service providers do you integrate with?",
      answer: "We integrate with 25+ major ESPs including Mailchimp, Constant Contact, ConvertKit, ActiveCampaign, HubSpot, Klaviyo, Campaign Monitor, and many more. Professional plans support 10 integrations, while Agency plans support 25+ platforms."
    },
    {
      question: "How accurate is the brand extraction feature?",
      answer: "Our AI brand extraction technology achieves over 90% accuracy in identifying and extracting brand elements including logos, color palettes, fonts, and design patterns from websites and brand assets."
    },
    {
      question: "Is there a free trial for paid plans?",
      answer: "During the beta period, all features are free to try. After the beta ends, we'll offer 14-day free trials for all paid plans with full access to features."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer email and live chat support for all users. Professional plans include priority support, Agency plans add phone support, and Enterprise customers get dedicated account management with 24/7 priority support."
    },
    {
      question: "Can I export templates without your branding?",
      answer: "Yes! Professional, Agency, and Enterprise plans allow you to remove MailSmithery branding from your exports. The free Starter plan includes our watermark on exports."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#0C7C59] to-[#0a6b4e] text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center bg-[#F2B705]/20 text-[#F2B705] px-6 py-3 rounded-full text-lg font-medium mb-8">
            <Sparkles className="w-5 h-5 mr-2" />
            Beta Special: All Features Free Until December 2025
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center bg-white/10 rounded-lg p-1 inline-flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-white text-[#0C7C59]'
                  : 'text-white hover:text-gray-200'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                billingCycle === 'annual'
                  ? 'bg-white text-[#0C7C59]'
                  : 'text-white hover:text-gray-200'
              }`}
            >
              Annual
              <span className="ml-2 bg-[#F2B705] text-black text-xs px-2 py-1 rounded-full">
                Save 15%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-4 gap-8">
            {Object.entries(plans).map(([key, plan]) => (
              <div
                key={key}
                className={`relative rounded-2xl shadow-lg p-8 ${
                  plan.popular
                    ? 'bg-[#0C7C59] text-white border-2 border-[#F2B705]'
                    : 'bg-white border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#F2B705] text-black px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-2 ${
                    plan.popular ? 'text-white' : 'text-gray-900'
                  }`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-4 ${
                    plan.popular ? 'text-gray-200' : 'text-gray-600'
                  }`}>
                    {plan.description}
                  </p>
                  
                  <div className="mb-4">
                    {plan.monthlyPrice === 0 ? (
                      <div className={`text-4xl font-bold ${
                        plan.popular ? 'text-white' : 'text-gray-900'
                      }`}>
                        Free
                      </div>
                    ) : key === 'enterprise' ? (
                      <div className={`text-4xl font-bold ${
                        plan.popular ? 'text-white' : 'text-gray-900'
                      }`}>
                        Custom
                      </div>
                    ) : (
                      <>
                        <div className={`text-4xl font-bold ${
                          plan.popular ? 'text-white' : 'text-gray-900'
                        }`}>
                          ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                        </div>
                        <div className={`text-sm ${
                          plan.popular ? 'text-gray-200' : 'text-gray-600'
                        }`}>
                          per month{billingCycle === 'annual' && ', billed annually'}
                        </div>
                        {billingCycle === 'annual' && plan.monthlyPrice > 0 && (
                          <div className={`text-xs mt-1 ${
                            plan.popular ? 'text-[#F2B705]' : 'text-[#0C7C59]'
                          }`}>
                            Save ${(plan.monthlyPrice - plan.annualPrice) * 12}/year
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                        plan.popular ? 'text-[#F2B705]' : 'text-[#0C7C59]'
                      }`} />
                      <span className={`text-sm ${
                        plan.popular ? 'text-white' : 'text-gray-600'
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, index) => (
                    <li key={index} className="flex items-start">
                      <X className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-red-500" />
                      <span className={`text-sm ${
                        plan.popular ? 'text-gray-200' : 'text-gray-500'
                      }`}>
                        {limitation}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-[#F2B705] text-black hover:bg-[#d9a004]'
                    : key === 'enterprise'
                    ? 'bg-[#0C7C59] text-white hover:bg-[#0a6b4e]'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about our pricing and features
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ArrowRight 
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      openFaq === index ? 'rotate-90' : ''
                    }`} 
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;