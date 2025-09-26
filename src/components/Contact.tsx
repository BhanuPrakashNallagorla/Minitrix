import React, { useState } from 'react';
import { Send, Mail, Phone, MessageSquare } from 'lucide-react';
import { post } from '../lib/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    role: '',
    projectDetails: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // field-level validation
    validateField(e.target.name, e.target.value);
  };

  const validateField = (name: string, value: string) => {
    let msg = '';
    if (['fullName', 'company', 'role'].includes(name)) {
      if (!value || value.trim().length < 2) msg = 'This field is required';
    }
    if (name === 'email') {
      const emailRegex = /\S+@\S+\.[\w-]{2,}/;
      if (!emailRegex.test(value)) msg = 'Please enter a valid email address';
    }
    setErrors(prev => ({ ...prev, [name]: msg }));
    return msg === '';
  };

  const validateAll = () => {
    const result: Record<string, string> = {};
    result.fullName = formData.fullName.trim().length >= 2 ? '' : 'Full name is required';
    result.company = formData.company.trim().length >= 2 ? '' : 'Company is required';
    result.role = formData.role.trim().length >= 2 ? '' : 'Role is required';
    result.email = /\S+@\S+\.[\w-]{2,}/.test(formData.email) ? '' : 'Valid email is required';
    setErrors(result);
    return Object.values(result).every(v => v === '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(null);
    if (!validateAll()) return;
    try {
      setIsSubmitting(true);
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        company: formData.company,
        role: formData.role,
        projectDetails: formData.projectDetails,
      };
      await post('/api/contact', payload);
      setSubmitMessage('Thanks! Your request has been received. We will contact you shortly.');
      setFormData({ fullName: '', email: '', company: '', role: '', projectDetails: '' });
      setErrors({});
    } catch (err: any) {
      const serverError = err?.data?.errors?.[0]?.msg || err.message || 'Submission failed';
      setSubmitMessage(`Error: ${serverError}`);
    } finally {
      setIsSubmitting(false);
    }
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
                      className={`input-dark w-full px-4 py-3 rounded-lg font-medium ${
                        errors.fullName ? 'border-red-500' : formData.fullName ? 'border-green-500' : ''
                      }`}
                      required
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                    )}
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
                      className={`input-dark w-full px-4 py-3 rounded-lg font-medium ${
                        errors.email ? 'border-red-500' : formData.email ? 'border-green-500' : ''
                      }`}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
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
                      className={`input-dark w-full px-4 py-3 rounded-lg font-medium ${
                        errors.company ? 'border-red-500' : formData.company ? 'border-green-500' : ''
                      }`}
                      required
                    />
                    {errors.company && (
                      <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                    )}
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
                      className={`input-dark w-full px-4 py-3 rounded-lg font-medium ${
                        errors.role ? 'border-red-500' : formData.role ? 'border-green-500' : ''
                      }`}
                      required
                    />
                    {errors.role && (
                      <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                    )}
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

                {submitMessage && (
                  <div className={`text-sm ${submitMessage.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>
                    {submitMessage}
                  </div>
                )}

                <button disabled={isSubmitting} className="btn-primary-dark w-full py-4 rounded-lg font-bold text-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Get My Custom Quote
                    </>
                  )}
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
