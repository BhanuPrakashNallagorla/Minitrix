import { useState } from 'react';
import { 
  Heart, 
  Scale, 
  Factory, 
  TrendingUp,
  Shield,
  FileText,
  BarChart3,
  Target,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface UseCase {
  id: string;
  title: string;
  summary: string;
  description: string;
  industry: string;
  metrics: { label: string; value: string }[];
  icon: React.ReactNode;
  visual: React.ReactNode;
}

const UseCases = () => {
  const [selectedUseCase, setSelectedUseCase] = useState('1');
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  const useCases: UseCase[] = [
    {
      id: '1',
      title: 'Automated Risk Assessment',
      summary: 'AI-powered credit scoring and loan approval with regulatory compliance built-in.',
      description: 'Our specialized AI models analyze thousands of data points in real-time to provide accurate risk assessments for loan applications. Built with regulatory compliance at its core, the system ensures adherence to financial regulations while delivering superior accuracy compared to traditional scoring methods.',
      industry: 'Financial Services',
      metrics: [
        { label: 'Accuracy Rate', value: '94.5%' },
        { label: 'ROI Increase', value: '340%' }
      ],
      icon: <TrendingUp className="h-8 w-8" />,
      visual: (
        <div className="w-full h-64 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
          <div className="text-center">
            <BarChart3 className="h-16 w-16 text-blue-400 mx-auto mb-4" />
            <div className="text-sm text-gray-300">Risk Assessment Dashboard</div>
          </div>
        </div>
      )
    },
    {
      id: '2',
      title: 'Fraud Detection & Prevention',
      summary: 'Real-time transaction monitoring with advanced pattern recognition.',
      description: 'Advanced machine learning algorithms continuously monitor transaction patterns to identify and prevent fraudulent activities in real-time. Our system learns from historical data and adapts to new fraud patterns, providing unmatched protection for financial institutions.',
      industry: 'Financial Services',
      metrics: [
        { label: 'Detection Rate', value: '99.2%' },
        { label: 'Cost Reduction', value: '75%' }
      ],
      icon: <Shield className="h-8 w-8" />,
      visual: (
        <div className="w-full h-64 bg-gradient-to-br from-red-500/20 to-orange-400/20 rounded-2xl flex items-center justify-center border border-red-500/30">
          <div className="text-center">
            <Shield className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <div className="text-sm text-gray-300">Fraud Detection System</div>
          </div>
        </div>
      )
    },
    {
      id: '3',
      title: 'Clinical Decision Support',
      summary: 'AI-assisted diagnosis and treatment recommendations with medical evidence.',
      description: 'Enhance clinical decision-making with AI that analyzes patient data, medical history, and current symptoms to provide evidence-based diagnostic suggestions and treatment recommendations.',
      industry: 'Healthcare',
      metrics: [
        { label: 'Diagnostic Accuracy', value: '96%' },
        { label: 'Decision Speed', value: '45% Faster' }
      ],
      icon: <Heart className="h-8 w-8" />,
      visual: (
        <div className="w-full h-64 bg-gradient-to-br from-pink-500/20 to-red-400/20 rounded-2xl flex items-center justify-center border border-pink-500/30">
          <div className="text-center">
            <Heart className="h-16 w-16 text-pink-400 mx-auto mb-4" />
            <div className="text-sm text-gray-300">Clinical Decision System</div>
          </div>
        </div>
      )
    },
    {
      id: '4',
      title: 'Contract Analysis & Review',
      summary: 'Automated contract review with risk identification and clause optimization.',
      description: 'Streamline legal workflows with AI-powered contract analysis that identifies risks, suggests optimizations, and ensures compliance with legal standards.',
      industry: 'Legal Tech',
      metrics: [
        { label: 'Review Accuracy', value: '95%' },
        { label: 'Time Reduction', value: '70%' }
      ],
      icon: <Scale className="h-8 w-8" />,
      visual: (
        <div className="w-full h-64 bg-gradient-to-br from-amber-500/20 to-yellow-400/20 rounded-2xl flex items-center justify-center border border-amber-500/30">
          <div className="text-center">
            <FileText className="h-16 w-16 text-amber-400 mx-auto mb-4" />
            <div className="text-sm text-gray-300">Contract Analysis Platform</div>
          </div>
        </div>
      )
    },
    {
      id: '5',
      title: 'Personalized Recommendations',
      summary: 'AI-driven product recommendations based on customer behavior and preferences.',
      description: 'Boost sales with intelligent recommendation engines that analyze customer behavior, purchase history, and preferences to deliver personalized product suggestions.',
      industry: 'E-Commerce',
      metrics: [
        { label: 'Conversion Increase', value: '35%' },
        { label: 'Revenue Growth', value: '250%' }
      ],
      icon: <Target className="h-8 w-8" />,
      visual: (
        <div className="w-full h-64 bg-gradient-to-br from-emerald-500/20 to-teal-400/20 rounded-2xl flex items-center justify-center border border-emerald-500/30">
          <div className="text-center">
            <Target className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
            <div className="text-sm text-gray-300">Recommendation Engine</div>
          </div>
        </div>
      )
    },
    {
      id: '6',
      title: 'Predictive Maintenance',
      summary: 'AI-powered equipment monitoring and failure prediction.',
      description: 'Prevent costly downtime with predictive maintenance systems that monitor equipment health and predict failures before they occur.',
      industry: 'Manufacturing',
      metrics: [
        { label: 'Downtime Reduction', value: '85%' },
        { label: 'Cost Savings', value: '300%' }
      ],
      icon: <Factory className="h-8 w-8" />,
      visual: (
        <div className="w-full h-64 bg-gradient-to-br from-indigo-500/20 to-purple-400/20 rounded-2xl flex items-center justify-center border border-indigo-500/30">
          <div className="text-center">
            <Factory className="h-16 w-16 text-indigo-400 mx-auto mb-4" />
            <div className="text-sm text-gray-300">Predictive Maintenance System</div>
          </div>
        </div>
      )
    }
  ];

  const currentUseCase = useCases.find(useCase => useCase.id === selectedUseCase) || useCases[0];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
            Transforming Industries with Specialized AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            See how our custom Small Language Models are delivering unparalleled performance, 
            security, and cost savings for enterprise leaders.
          </p>
        </div>
      </section>

      {/* Interactive Tabbed Layout - Desktop */}
      <section className="py-20 px-6 hidden lg:block">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-8 h-[600px]">
            {/* Left Column: Navigation Menu */}
            <div className="col-span-4 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Use Cases</h3>
              <div className="space-y-2">
                {useCases.map((useCase) => (
                  <button
                    key={useCase.id}
                    onClick={() => setSelectedUseCase(useCase.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      selectedUseCase === useCase.id
                        ? 'bg-gradient-to-r from-blue-500/20 to-cyan-400/20 border-l-4 border-blue-400 text-blue-400'
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                    }`}
                  >
                    <div className="font-medium">{useCase.title}</div>
                    <div className="text-sm text-gray-400 mt-1">{useCase.industry}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Dynamic Content Panel */}
            <div className="col-span-8 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <div className="h-full flex flex-col">
                {/* Large Visual */}
                <div className="mb-8">
                  {currentUseCase.visual}
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h2 className="text-3xl font-semibold text-white mb-4">
                    {currentUseCase.title}
                  </h2>
                  
                  <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                    {currentUseCase.description}
                  </p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    {currentUseCase.metrics.map((metric, index) => (
                      <div key={index} className="text-center p-4 bg-gray-800/50 rounded-xl border border-gray-600">
                        <div className="text-3xl font-bold text-cyan-400 mb-2">
                          {metric.value}
                        </div>
                        <div className="text-gray-300 text-sm">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button 
                    onClick={() => {
                      if (currentUseCase.id === '1') {
                        window.open('/case-study-risk-assessment.html', '_blank');
                      } else if (currentUseCase.id === '2') {
                        window.open('/case-study-fraud-detection.html', '_blank');
                      } else if (currentUseCase.id === '3') {
                        window.open('/case-study-clinical-decision.html', '_blank');
                      } else if (currentUseCase.id === '4') {
                        window.open('/case-study-contract-analysis.html', '_blank');
                      } else if (currentUseCase.id === '5') {
                        window.open('/case-study-personalized-recommendations.html', '_blank');
                      } else if (currentUseCase.id === '6') {
                        window.open('/case-study-predictive-maintenance.html', '_blank');
                      } else {
                        // For other use cases, you can add more case studies or show a coming soon message
                        alert('More case studies coming soon!');
                      }
                    }}
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center group"
                  >
                    View Case Study
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Accordion Layout */}
      <section className="py-20 px-6 lg:hidden">
        <div className="max-w-4xl mx-auto space-y-4">
          {useCases.map((useCase) => (
            <div key={useCase.id} className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden">
              {/* Accordion Header */}
              <button
                onClick={() => setExpandedMobile(expandedMobile === useCase.id ? null : useCase.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors duration-200"
              >
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{useCase.title}</h3>
                  <p className="text-gray-400 text-sm">{useCase.summary}</p>
                </div>
                {expandedMobile === useCase.id ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>

              {/* Accordion Content */}
              {expandedMobile === useCase.id && (
                <div className="p-6 pt-0 border-t border-gray-700">
                  {/* Visual */}
                  <div className="mb-6">
                    {useCase.visual}
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {useCase.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {useCase.metrics.map((metric, index) => (
                      <div key={index} className="text-center p-3 bg-gray-800/50 rounded-lg border border-gray-600">
                        <div className="text-2xl font-bold text-cyan-400 mb-1">
                          {metric.value}
                        </div>
                        <div className="text-gray-300 text-xs">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button 
                    onClick={() => {
                      if (useCase.id === '1') {
                        window.open('/case-study-risk-assessment.html', '_blank');
                      } else if (useCase.id === '2') {
                        window.open('/case-study-fraud-detection.html', '_blank');
                      } else if (useCase.id === '3') {
                        window.open('/case-study-clinical-decision.html', '_blank');
                      } else if (useCase.id === '4') {
                        window.open('/case-study-contract-analysis.html', '_blank');
                      } else if (useCase.id === '5') {
                        window.open('/case-study-personalized-recommendations.html', '_blank');
                      } else if (useCase.id === '6') {
                        window.open('/case-study-predictive-maintenance.html', '_blank');
                      } else {
                        // For other use cases, you can add more case studies or show a coming soon message
                        alert('More case studies coming soon!');
                      }
                    }}
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center group"
                  >
                    View Case Study
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 px-6 mt-20 bg-gradient-to-r from-gray-900/80 to-gray-800/60 backdrop-blur-sm border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
            Ready to Transform Your AI Strategy?
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Every industry has unique challenges. Let's discuss how a custom SLM can deliver 
            transformational results for your specific use case.
          </p>
          
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('book-demo'))}
            className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white text-xl font-semibold rounded-xl transition-all duration-300 shadow-2xl hover:shadow-cyan-400/25 hover:scale-105 group"
          >
            Schedule Your Custom Consultation
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          
          <p className="text-gray-400 mt-6">
            Free consultation • Industry-specific insights • Custom ROI analysis
          </p>
        </div>
      </section>
    </div>
  );
};

export default UseCases;
