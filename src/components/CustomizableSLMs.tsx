import React, { useState } from 'react';
import { Shield, Zap, Database, Settings, Building2, Heart, Scale, Users, ArrowRight, X, Send } from 'lucide-react';

const CustomizableSLMs = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    countryCode: '+1',
    phone: '',
    additionalInfo: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
    alert('Thank you for your interest! We will contact you within 2 hours.');
    setShowModal(false);
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      role: '',
      countryCode: '+1',
      phone: '',
      additionalInfo: ''
    });
  };

  const countries = [
    { code: '+1', flag: '🇺🇸', name: 'United States' },
    { code: '+1', flag: '🇨🇦', name: 'Canada' },
    { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: '+33', flag: '🇫🇷', name: 'France' },
    { code: '+39', flag: '🇮🇹', name: 'Italy' },
    { code: '+34', flag: '🇪🇸', name: 'Spain' },
    { code: '+31', flag: '🇳🇱', name: 'Netherlands' },
    { code: '+46', flag: '🇸🇪', name: 'Sweden' },
    { code: '+47', flag: '🇳🇴', name: 'Norway' },
    { code: '+45', flag: '🇩🇰', name: 'Denmark' },
    { code: '+41', flag: '🇨🇭', name: 'Switzerland' },
    { code: '+43', flag: '🇦🇹', name: 'Austria' },
    { code: '+32', flag: '🇧🇪', name: 'Belgium' },
    { code: '+91', flag: '🇮🇳', name: 'India' },
    { code: '+86', flag: '🇨🇳', name: 'China' },
    { code: '+81', flag: '🇯🇵', name: 'Japan' },
    { code: '+82', flag: '🇰🇷', name: 'South Korea' },
    { code: '+65', flag: '🇸🇬', name: 'Singapore' },
    { code: '+61', flag: '🇦🇺', name: 'Australia' },
    { code: '+64', flag: '🇳🇿', name: 'New Zealand' },
    { code: '+55', flag: '🇧🇷', name: 'Brazil' },
    { code: '+52', flag: '🇲🇽', name: 'Mexico' },
    { code: '+54', flag: '🇦🇷', name: 'Argentina' },
    { code: '+27', flag: '🇿🇦', name: 'South Africa' }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent leading-tight">
            AI That Speaks Your Language. And Your Business.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We build custom, on-premise Small Language Models that deliver unparalleled accuracy, speed, and security, 
            fine-tuned on your unique enterprise data.
          </p>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="py-20 px-6 bg-gray-900/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-12">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mr-6">
              <Shield className="h-6 w-6 text-red-400" />
            </div>
            <h2 className="text-4xl font-light text-white">The Challenge: The Limits of Generic AI</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-red-400 mb-3">Escalating Costs</h3>
                <p className="text-gray-300 leading-relaxed">
                  Generic LLM APIs create unpredictable, exponentially growing expenses. What starts as a $500 monthly experiment 
                  quickly becomes a $50,000+ budget drain as your usage scales.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-red-400 mb-3">Performance Limitations</h3>
                <p className="text-gray-300 leading-relaxed">
                  One-size-fits-all models deliver mediocre 60-70% accuracy on specialized tasks, requiring expensive 
                  workarounds and constant human oversight.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-red-400 mb-3">Security & Compliance Risks</h3>
                <p className="text-gray-300 leading-relaxed">
                  Every API call sends your sensitive data to external servers, creating compliance nightmares and 
                  potential regulatory violations averaging $15M in fines.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-red-400 mb-3">Lack of Control</h3>
                <p className="text-gray-300 leading-relaxed">
                  You're locked into external providers' roadmaps, pricing changes, and service limitations with 
                  no ability to customize for your specific business needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
              Our Solution: A Proprietary, High-Performance AI Asset
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Transform AI from a recurring expense into a strategic competitive advantage with custom Small Language Models 
              that understand your business, your data, and your industry.
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-2xl p-8 border border-blue-500/20">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mb-4">
                90-98%
              </div>
              <p className="text-gray-300 text-lg">Accuracy on specialized tasks vs 60-70% from generic models</p>
            </div>
            
            <div className="text-center bg-gradient-to-r from-green-500/10 to-emerald-400/10 rounded-2xl p-8 border border-green-500/20">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent mb-4">
                80%
              </div>
              <p className="text-gray-300 text-lg">Lower operational costs compared to LLM API subscriptions</p>
            </div>
            
            <div className="text-center bg-gradient-to-r from-purple-500/10 to-pink-400/10 rounded-2xl p-8 border border-purple-500/20">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent mb-4">
                3x
              </div>
              <p className="text-gray-300 text-lg">Faster response times with on-premise deployment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-6 bg-gray-900/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-light text-white text-center mb-16">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-cyan-400/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mb-6">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Industry-Specific Models</h3>
              <p className="text-gray-300 leading-relaxed">
                Our SLMs are trained on your industry's terminology, regulations, and best practices. Whether you're in 
                healthcare, finance, or legal services, your model speaks your language fluently and understands the 
                nuances that matter to your business.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-cyan-400/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl flex items-center justify-center mb-6">
                <Database className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Scalable On-Premise Architecture</h3>
              <p className="text-gray-300 leading-relaxed">
                Deploy on your infrastructure—cloud, on-premises, or hybrid. Our architecture scales with your needs 
                while maintaining complete data sovereignty and eliminating external dependencies that create security 
                vulnerabilities and compliance risks.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-cyan-400/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-400 rounded-xl flex items-center justify-center mb-6">
                <Settings className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Custom Training Pipelines</h3>
              <p className="text-gray-300 leading-relaxed">
                We build automated training pipelines that continuously improve your model using your proprietary data. 
                Your SLM gets smarter over time, learning from your specific use cases and becoming increasingly valuable 
                as a competitive asset.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-cyan-400/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-400 rounded-xl flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Integration-Ready APIs & SDKs</h3>
              <p className="text-gray-300 leading-relaxed">
                Seamlessly integrate with your existing systems through our comprehensive APIs and SDKs. We provide 
                detailed documentation, code examples, and ongoing technical support to ensure smooth deployment and 
                optimal performance across your technology stack.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal Use Cases Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-light text-white text-center mb-16">Ideal Use Cases</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-b from-blue-900/20 to-blue-800/10 rounded-2xl p-8 border border-blue-500/20">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Healthcare</h3>
              <p className="text-gray-300 leading-relaxed">
                HIPAA-compliant models for clinical decision support, medical record analysis, and patient communication. 
                Our healthcare SLMs understand medical terminology, drug interactions, and treatment protocols while 
                maintaining the highest security standards for patient data.
              </p>
            </div>

            <div className="bg-gradient-to-b from-green-900/20 to-green-800/10 rounded-2xl p-8 border border-green-500/20">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl flex items-center justify-center mb-6">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Financial Services</h3>
              <p className="text-gray-300 leading-relaxed">
                Regulatory-compliant models for risk assessment, fraud detection, and customer service. Our financial SLMs 
                are trained on market data, regulatory requirements, and industry best practices to deliver accurate, 
                compliant results for mission-critical applications.
              </p>
            </div>

            <div className="bg-gradient-to-b from-purple-900/20 to-purple-800/10 rounded-2xl p-8 border border-purple-500/20">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-400 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Legal Tech</h3>
              <p className="text-gray-300 leading-relaxed">
                Specialized models for contract analysis, legal research, and document review. Our legal SLMs understand 
                complex legal language, precedents, and jurisdictional differences to accelerate legal workflows while 
                maintaining attorney-client privilege.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Point Section */}
      <section className="py-20 px-6 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-light text-white text-center mb-12">Proven Results in High-Stakes Environments</h2>
          
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/60 rounded-2xl p-12 border border-cyan-400/30">
            <blockquote className="text-xl text-gray-200 leading-relaxed mb-8 italic">
              "Our custom SLM transformed our legal document review process. What used to take our team 10 hours now 
              takes 3 hours, with higher accuracy than our previous solution. The model understands our specific contract 
              language and flags issues that generic AI completely missed."
            </blockquote>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent mb-2">
                  70%
                </div>
                <p className="text-gray-300 text-lg">Time Reduction</p>
              </div>
              
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mb-2">
                  98%
                </div>
                <p className="text-gray-300 text-lg">Accuracy Rate</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-400">— Chief Technology Officer, Fortune 500 Legal Services Firm</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-light text-white text-center mb-16">Our Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Discovery & Data Strategy</h3>
              <p className="text-gray-300 leading-relaxed">
                We analyze your use cases, data sources, and performance requirements to design the optimal SLM 
                architecture for your specific needs and compliance requirements.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Model Development & Fine-Tuning</h3>
              <p className="text-gray-300 leading-relaxed">
                Our team develops and fine-tunes your custom SLM using your proprietary data, industry best practices, 
                and advanced training techniques to achieve optimal performance.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Secure Deployment & Integration</h3>
              <p className="text-gray-300 leading-relaxed">
                We deploy your SLM on your chosen infrastructure and integrate it seamlessly with your existing systems, 
                ensuring security, compliance, and optimal performance.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Ongoing Support & Optimization</h3>
              <p className="text-gray-300 leading-relaxed">
                We provide continuous monitoring, performance optimization, and model updates to ensure your SLM 
                evolves with your business and maintains peak performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-900/80 to-gray-800/60 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
            Ready to Build Your Proprietary AI Asset?
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Stop paying exponentially growing API fees for generic AI that doesn't understand your business. 
            Transform AI from a cost center into a competitive advantage with a custom Small Language Model 
            that delivers superior performance, complete data control, and predictable costs.
          </p>
          
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('book-demo'))}
            className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xl font-semibold rounded-lg transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 group"
          >
            Schedule Your Custom SLM Consultation
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          
          <p className="text-gray-400 mt-6">
            Free consultation • No commitment required • Custom ROI analysis included
          </p>
        </div>
      </section>

      {/* Contact Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Schedule Your Consultation</h2>
                  <p className="text-gray-400 text-sm">Let's discuss your AI transformation</p>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800/50 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name and Business Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name <span className="text-cyan-400">*</span></label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 hover:border-gray-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Business Email <span className="text-cyan-400">*</span></label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 hover:border-gray-500"
                      required
                    />
                  </div>
                </div>

                {/* Company Name and Role/Title */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Company Name <span className="text-cyan-400">*</span></label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 hover:border-gray-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Your Role / Title <span className="text-cyan-400">*</span></label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 hover:border-gray-500"
                      required
                    />
                  </div>
                </div>

                {/* Phone Number and Additional Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number <span className="text-gray-500">(Optional)</span></label>
                    <div className="flex gap-2">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        className="w-20 px-2 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 hover:border-gray-500 text-sm"
                      >
                        {countries.map((country, index) => (
                          <option key={`${country.code}-${index}`} value={country.code}>
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="flex-1 px-3 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 hover:border-gray-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Additional Information <span className="text-gray-500">(Optional)</span></label>
                    <textarea
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 hover:border-gray-500 resize-none"
                    ></textarea>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-600/50 text-gray-300 rounded-lg hover:bg-gray-800/50 hover:border-gray-500 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-4 py-3 text-white rounded-lg font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/25 active:scale-[0.98] flex items-center justify-center space-x-2"
                  >
                    <Send className="h-5 w-5" />
                    <span>Schedule Consultation</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizableSLMs;
