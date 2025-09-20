import React, { useState } from 'react';
import { Send, Mail, Phone, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    role: '',
    projectDetails: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <section id="contact-section" className="section-dark section-transition relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-dark">
            Ready to Transform Your AI Strategy?
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{color: 'var(--dark-text-secondary)'}}>
            Join leading companies who have already cut their AI costs by 80% while improving performance
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <div className="card-dark backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6" style={{color: 'var(--dark-text-primary)'}}>Get Your Custom SLM Quote</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: 'var(--dark-text-secondary)'}}>
                      Full Name <span style={{color: 'var(--accent-primary)'}}>*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="input-dark w-full px-4 py-3 rounded-lg font-medium"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: 'var(--dark-text-secondary)'}}>
                      Business Email <span style={{color: 'var(--accent-primary)'}}>*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-dark w-full px-4 py-3 rounded-lg font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: 'var(--dark-text-secondary)'}}>
                      Company Name <span style={{color: 'var(--accent-primary)'}}>*</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="input-dark w-full px-4 py-3 rounded-lg font-medium"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: 'var(--dark-text-secondary)'}}>
                      Your Role / Title <span style={{color: 'var(--accent-primary)'}}>*</span>
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="input-dark w-full px-4 py-3 rounded-lg font-medium"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: 'var(--dark-text-secondary)'}}>
                    Project Details <span style={{color: 'var(--dark-text-tertiary)'}}>(Optional)</span>
                  </label>
                  <textarea
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleInputChange}
                    rows={4}
                    className="input-dark w-full px-4 py-3 rounded-lg font-medium resize-none"
                    placeholder="Tell us about your AI use case, current challenges, or specific requirements..."
                  />
                </div>

                <button className="btn-primary-dark w-full py-4 rounded-lg font-bold text-lg">
                  <Send className="h-5 w-5 mr-2" />
                  Get My Custom Quote
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="card-dark backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{backgroundColor: 'var(--accent-primary)'}}>
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold" style={{color: 'var(--dark-text-primary)'}}>Call Us Directly</h4>
                  <p className="text-sm" style={{color: 'var(--dark-text-secondary)'}}>Speak with our AI experts</p>
                </div>
              </div>
              <p className="text-2xl font-bold mb-2" style={{color: 'var(--accent-primary)'}}>+1 (555) 123-4567</p>
              <p className="text-sm" style={{color: 'var(--dark-text-tertiary)'}}>Mon-Fri, 9 AM - 6 PM PST</p>
            </div>

            <div className="card-dark backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{backgroundColor: 'var(--accent-primary)'}}>
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold" style={{color: 'var(--dark-text-primary)'}}>Email Support</h4>
                  <p className="text-sm" style={{color: 'var(--dark-text-secondary)'}}>Get detailed responses</p>
                </div>
              </div>
              <p className="text-xl font-bold mb-2" style={{color: 'var(--accent-primary)'}}>hello@minitrix.ai</p>
              <p className="text-sm" style={{color: 'var(--dark-text-tertiary)'}}>Response within 2 hours</p>
            </div>

            <div className="card-dark backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{backgroundColor: 'var(--accent-primary)'}}>
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold" style={{color: 'var(--dark-text-primary)'}}>Live Chat</h4>
                  <p className="text-sm" style={{color: 'var(--dark-text-secondary)'}}>Instant assistance</p>
                </div>
              </div>
              <p className="text-lg font-bold mb-2" style={{color: 'var(--accent-primary)'}}>Chat Now</p>
              <p className="text-sm" style={{color: 'var(--dark-text-tertiary)'}}>Available 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
