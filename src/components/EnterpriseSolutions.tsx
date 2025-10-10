import { useState } from 'react';
import { 
  Shield, 
  Users, 
  Settings, 
  CheckCircle, 
  Star,
  Lock,
  Headphones
} from 'lucide-react';

const EnterpriseSolutions = () => {
  const [activeTab, setActiveTab] = useState('slms');

  const solutions = {
    slms: {
      title: 'Enterprise-Level Customizable SLMs',
      features: [
        'Industry-Specific Models: Healthcare diagnostic assistants, financial compliance analyzers, legal document processors',
        'Custom Training Pipelines: Your proprietary data, your competitive advantage',
        'Scalable Architecture: From department-level deployment to enterprise-wide implementation',
        'Integration-Ready: APIs, SDKs, and connectors for seamless workflow integration'
      ]
    },
    chatbots: {
      title: 'Intelligent Custom Chatbots',
      features: [
        'Domain-Specific Conversational AI: Customer service, internal support, sales assistance',
        'Multi-Modal Capabilities: Text, voice, and document processing in one solution',
        'Brand-Aligned Personalities: Chatbots that reflect your company\'s tone and expertise',
        'Advanced Context Management: Maintains conversation history and understands complex queries'
      ]
    },
    applications: {
      title: 'Specialized AI Applications',
      features: [
        'Document Intelligence: Contract analysis, invoice processing, compliance monitoring',
        'Decision Support Systems: Data-driven recommendations with explainable AI',
        'Automated Workflows: AI-powered process automation tailored to your operations',
        'Knowledge Management: Internal AI assistants trained on your company\'s knowledge base'
      ]
    }
  };



  return (
    <section className="section-dark section-transition relative py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-cyan-900/5"></div>
        {/* Floating Elements */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-pulse"
            style={{
              backgroundColor: 'var(--accent-primary)',
              opacity: 0.2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 gradient-text-dark">
            Beyond Models: Complete AI Solutions for Enterprise
          </h2>
          <p className="text-lg sm:text-xl max-w-4xl mx-auto mb-8 sm:mb-12" style={{color: 'var(--dark-text-secondary)'}}>
            Custom SLMs, intelligent chatbots, and enterprise AI systems built specifically for your business requirements
          </p>
          
          {/* Key Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto">
            <div className="rounded-xl p-6" style={{backgroundColor: 'var(--dark-bg-secondary)', border: '1px solid var(--dark-border)'}}>
              <Star className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-2" style={{color: 'var(--dark-text-primary)'}}>50+</div>
              <div className="text-sm" style={{color: 'var(--dark-text-secondary)'}}>Successful Enterprise Deployments</div>
            </div>
            <div className="rounded-xl p-6" style={{backgroundColor: 'var(--dark-bg-secondary)', border: '1px solid var(--dark-border)'}}>
              <Users className="h-8 w-8 mx-auto mb-3" style={{color: 'var(--accent-primary)'}} />
              <div className="text-2xl font-bold mb-2" style={{color: 'var(--dark-text-primary)'}}>PhD-Level</div>
              <div className="text-sm" style={{color: 'var(--dark-text-secondary)'}}>AI Engineers & Solutions Architects</div>
            </div>
            <div className="rounded-xl p-6" style={{backgroundColor: 'var(--dark-bg-secondary)', border: '1px solid var(--dark-border)'}}>
              <Shield className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-2" style={{color: 'var(--dark-text-primary)'}}>SOC 2 Type II</div>
              <div className="text-sm" style={{color: 'var(--dark-text-secondary)'}}>Enterprise Security Certified</div>
            </div>
          </div>
        </div>

        {/* What We Build */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12" style={{color: 'var(--dark-text-primary)'}}>What We Build</h3>
          
          {/* Solution Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(solutions).map(([key, solution]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95`}
                style={{
                  backgroundColor: 'var(--dark-bg-secondary)',
                  border: activeTab === key ? '1px solid var(--accent-primary)' : '1px solid var(--dark-border)',
                  color: activeTab === key ? 'var(--dark-text-primary)' : 'var(--dark-text-secondary)'
                }}
              >
                {solution.title.split(':')[0]}
              </button>
            ))}
          </div>

          {/* Active Solution Content */}
          <div className="card-dark backdrop-blur-sm rounded-2xl p-8">
            <h4 className="text-2xl font-bold mb-6" style={{color: 'var(--dark-text-primary)'}}>{solutions[activeTab as keyof typeof solutions].title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {solutions[activeTab as keyof typeof solutions].features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <span style={{color: 'var(--dark-text-secondary)'}}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enterprise Features */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12" style={{color: 'var(--dark-text-primary)'}}>Enterprise Features & Capabilities</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Security & Compliance */}
            <div className="card-dark backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Lock className="h-8 w-8 text-red-400" />
                <h4 className="text-xl font-bold" style={{color: 'var(--dark-text-primary)'}}>Security & Compliance</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-sm" style={{color: 'var(--dark-text-secondary)'}}>Air-Gapped Deployment: Complete isolation from external networks</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-sm" style={{color: 'var(--dark-text-secondary)'}}>SOC 2 Type II Certified: Enterprise-grade security standards</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-sm" style={{color: 'var(--dark-text-secondary)'}}>Industry Compliance: HIPAA, GDPR, SOX, PCI-DSS ready</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-sm" style={{color: 'var(--dark-text-secondary)'}}>Audit Trails: Complete logging and monitoring for regulatory requirements</span>
                </li>
              </ul>
            </div>

            {/* Customization & Control */}
            <div className="card-dark backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Settings className="h-8 w-8 text-blue-400" />
                <h4 className="text-xl font-bold" style={{color: 'var(--dark-text-primary)'}}>Customization & Control</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-sm" style={{color: 'var(--dark-text-secondary)'}}>White-Label Solutions: Your branding, your customer experience</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-sm" style={{color: 'var(--dark-text-secondary)'}}>Fine-Tuning Capabilities: Continuous improvement based on usage patterns</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-sm" style={{color: 'var(--dark-text-secondary)'}}>Role-Based Access: Granular permissions and user management</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-sm" style={{color: 'var(--dark-text-secondary)'}}>Custom Analytics: Business intelligence dashboards tailored to your KPIs</span>
                </li>
              </ul>
            </div>

            {/* Enterprise Support */}
            <div className="card-dark backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Headphones className="h-8 w-8 text-green-400" />
                <h4 className="text-xl font-bold" style={{color: 'var(--dark-text-primary)'}}>Enterprise Support</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-sm" style={{color: 'var(--dark-text-secondary)'}}>Dedicated Engineering Team: Direct access to AI engineers and solutions architects</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-sm" style={{color: 'var(--dark-text-secondary)'}}>24/7 Monitoring: Proactive system health monitoring and maintenance</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-sm" style={{color: 'var(--dark-text-secondary)'}}>SLA Guarantees: Uptime, response time, and performance commitments</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-sm" style={{color: 'var(--dark-text-secondary)'}}>Regular Updates: Quarterly model improvements and feature releases</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EnterpriseSolutions;
