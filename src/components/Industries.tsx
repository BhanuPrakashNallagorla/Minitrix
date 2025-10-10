import { useState } from 'react';
import { ArrowRight, Calendar, Building2, Heart, Factory, ShoppingCart, Truck, Shield, CheckCircle } from 'lucide-react';

interface Industry {
  id: string;
  name: string;
  icon: React.ReactNode;
  headline: string;
  challenge: string;
  solution: string;
  useCases: string[];
  impact: string;
}

const Industries = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const industries: Industry[] = [
    {
      id: 'financial-services',
      name: 'Financial Services',
      icon: <Building2 className="w-12 h-12" />,
      headline: 'Optimizing Risk Assessment and Regulatory Compliance in Real-Time',
      challenge: 'Financial institutions face an increasingly complex regulatory landscape while needing to make split-second decisions on loans, investments, and risk management. Traditional AI models often lack the nuanced understanding of financial regulations, market dynamics, and institutional-specific risk profiles that are crucial for accurate decision-making.',
      solution: 'Minitrix develops custom SLMs trained on your institution\'s historical data, regulatory requirements, and market-specific knowledge. Our models understand financial terminology, compliance frameworks, and risk patterns unique to your operations, enabling more accurate predictions and automated compliance monitoring.',
      useCases: [
        'Automated loan underwriting with 95% accuracy',
        'Real-time fraud detection and prevention',
        'Regulatory compliance monitoring and reporting',
        'Market risk analysis and portfolio optimization',
        'Customer service automation for complex financial queries'
      ],
      impact: 'Transform your financial operations with AI that speaks your language and understands your risks.'
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      icon: <Heart className="w-12 h-12" />,
      headline: 'Accelerating Diagnosis and Treatment with Clinical Intelligence',
      challenge: 'Healthcare providers struggle with information overload, diagnostic accuracy, and the need to stay current with rapidly evolving medical knowledge. Generic AI solutions often lack the clinical context and medical expertise required for safe, effective healthcare applications.',
      solution: 'Our healthcare-specific SLMs are trained on medical literature, clinical guidelines, and your institution\'s patient data patterns. These models understand medical terminology, treatment protocols, and can assist with clinical decision-making while maintaining strict privacy and compliance standards.',
      useCases: [
        'Clinical decision support for accurate diagnosis',
        'Medical image analysis and interpretation',
        'Drug interaction and dosage optimization',
        'Patient risk stratification and early warning systems',
        'Automated medical documentation and coding'
      ],
      impact: 'Enhance patient outcomes with AI that understands the complexity and nuance of medical practice.'
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing',
      icon: <Factory className="w-12 h-12" />,
      headline: 'Optimizing Production and Predicting Failure Before It Happens',
      challenge: 'Manufacturing operations generate massive amounts of data from sensors, equipment, and processes, but turning this data into actionable insights remains challenging. Downtime is costly, quality issues are expensive, and optimization opportunities are often missed due to the complexity of manufacturing systems.',
      solution: 'Minitrix creates manufacturing-specific SLMs that understand your production processes, equipment patterns, and quality metrics. Our models can predict equipment failures, optimize production schedules, and identify quality issues before they impact your bottom line.',
      useCases: [
        'Predictive maintenance to prevent costly downtime',
        'Quality control and defect detection automation',
        'Production schedule optimization and resource allocation',
        'Supply chain disruption prediction and mitigation',
        'Energy consumption optimization across facilities'
      ],
      impact: 'Revolutionize your manufacturing operations with AI that predicts, optimizes, and prevents before problems occur.'
    },
    {
      id: 'retail-ecommerce',
      name: 'Retail & E-Commerce',
      icon: <ShoppingCart className="w-12 h-12" />,
      headline: 'Personalizing Customer Experience and Optimizing Inventory at Scale',
      challenge: 'Retail businesses face intense competition, changing consumer preferences, and the challenge of managing inventory across multiple channels. Understanding customer behavior, predicting demand, and delivering personalized experiences at scale requires sophisticated AI that understands retail dynamics.',
      solution: 'Our retail-focused SLMs analyze customer behavior patterns, seasonal trends, and market dynamics specific to your business. These models enable hyper-personalized recommendations, accurate demand forecasting, and optimized pricing strategies that drive revenue growth.',
      useCases: [
        'Personalized product recommendations and dynamic pricing',
        'Inventory optimization and demand forecasting',
        'Customer sentiment analysis and behavior prediction',
        'Supply chain optimization and vendor management',
        'Automated customer service and chatbot interactions'
      ],
      impact: 'Transform your retail operations with AI that understands your customers as well as you do.'
    },
    {
      id: 'logistics-supply-chain',
      name: 'Logistics & Supply Chain',
      icon: <Truck className="w-12 h-12" />,
      headline: 'Streamlining Operations and Predicting Disruptions Across Global Networks',
      challenge: 'Global supply chains are increasingly complex, with multiple stakeholders, varying regulations, and constant disruption risks. Traditional logistics management struggles with real-time optimization, route planning, and proactive disruption management across diverse geographical and regulatory environments.',
      solution: 'Minitrix develops logistics-specific SLMs that understand transportation networks, regulatory requirements, and operational constraints unique to your supply chain. Our models optimize routes, predict disruptions, and automate decision-making across your entire logistics network.',
      useCases: [
        'Dynamic route optimization and fleet management',
        'Supply chain disruption prediction and mitigation',
        'Automated customs and regulatory compliance',
        'Warehouse optimization and inventory management',
        'Real-time shipment tracking and customer communication'
      ],
      impact: 'Optimize your global operations with AI that navigates complexity and predicts the unpredictable.'
    },
    {
      id: 'insurance',
      name: 'Insurance',
      icon: <Shield className="w-12 h-12" />,
      headline: 'Accelerating Claims Processing and Enhancing Risk Assessment',
      challenge: 'Insurance companies face increasing claim volumes, complex risk assessment requirements, and the need for faster, more accurate underwriting. Traditional processes are often slow, prone to human error, and struggle to incorporate the vast amount of data available for risk evaluation.',
      solution: 'Our insurance-specific SLMs understand policy language, risk factors, and claims patterns unique to your business. These models automate claims processing, enhance underwriting accuracy, and identify fraud patterns while ensuring compliance with insurance regulations.',
      useCases: [
        'Automated claims processing and damage assessment',
        'Risk assessment and premium calculation optimization',
        'Fraud detection and investigation automation',
        'Policy recommendation and cross-selling opportunities',
        'Regulatory compliance monitoring and reporting'
      ],
      impact: 'Revolutionize your insurance operations with AI that assesses risk and processes claims with unprecedented speed and accuracy.'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
            Industry-Specific Intelligence, Engineered for Your World
          </h1>
          
          {/* Industry Navigator Cards - Moved here */}
          <div className="max-w-7xl mx-auto mt-16 mb-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Solutions Engineered for Your Sector</h2>
              <p className="text-lg text-gray-300">Click any industry to explore our specialized solutions</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((industry) => (
                <div
                  key={industry.id}
                  onClick={() => scrollToSection(industry.id)}
                  onMouseEnter={() => setHoveredCard(industry.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50 cursor-pointer transition-all duration-300 group ${
                    hoveredCard === industry.id ? 'border-blue-500/50 transform -translate-y-2 shadow-2xl shadow-blue-500/10' : 'hover:border-blue-500/30'
                  }`}
                >
                  <div className="text-center">
                    <div className={`mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                      hoveredCard === industry.id ? 'bg-blue-600 text-white' : 'bg-blue-600/20 text-blue-400'
                    }`}>
                      {industry.icon}
                    </div>
                    <h3 className={`text-lg font-bold transition-colors duration-300 ${
                      hoveredCard === industry.id ? 'text-blue-400' : 'text-white'
                    }`}>
                      {industry.name}
                    </h3>
                    <div className={`mt-3 opacity-0 transition-opacity duration-300 ${
                      hoveredCard === industry.id ? 'opacity-100' : ''
                    }`}>
                      <ArrowRight className="w-4 h-4 mx-auto text-blue-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
            Generic AI offers generic solutions. Minitrix delivers purpose-built Small Language Models that understand the unique language, regulations, and operational challenges of your industry, turning your proprietary data into a competitive advantage.
          </p>
        </div>
        
        {/* Abstract background graphic */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-gradient-to-r from-blue-500/3 to-purple-500/3 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Detailed Industry Sections */}
      {industries.map((industry, index) => (
        <section 
          key={industry.id}
          id={industry.id}
          className={`relative py-20 px-6 ${index % 2 === 0 ? '' : 'bg-gray-900/20'}`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Column - Text Content */}
              <div className="space-y-8">
                <div>
                  <div className="inline-block bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    {industry.name}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                    {industry.headline}
                  </h3>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-red-400 mb-4">The Challenge</h4>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {industry.challenge}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-green-400 mb-4">Minitrix's Solution</h4>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {industry.solution}
                  </p>
                </div>
              </div>

              {/* Right Column - Key Details & Visuals */}
              <div className="space-y-8">
                <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700/50">
                  <h4 className="text-xl font-bold text-blue-400 mb-6">Key Use Cases</h4>
                  <div className="space-y-4">
                    {industry.useCases.map((useCase, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                        <span className="text-gray-300 leading-relaxed">{useCase}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl p-8 border border-blue-500/20">
                  <h4 className="text-xl font-bold text-yellow-400 mb-4">The Impact</h4>
                  <blockquote className="text-lg font-medium text-white leading-relaxed italic">
                    "{industry.impact}"
                  </blockquote>
                </div>
                
                {/* Visual Element */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl p-12 border border-gray-600/30">
                  <div className="text-center">
                    <div className="mx-auto mb-4 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      {industry.icon}
                    </div>
                    <div className="text-sm text-gray-400">Industry-Specific AI Solutions</div>
                    <div className="text-2xl font-bold text-white mt-2">{industry.name}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Final CTA Section */}
      <section className="relative py-20 px-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-t border-blue-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Transform Your AI Strategy?</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
            Every industry has unique challenges that require specialized solutions. Let's discuss how Minitrix can engineer custom AI solutions that understand your specific domain, regulations, and operational requirements.
          </p>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('book-demo'))}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 group mx-auto"
          >
            <Calendar className="w-5 h-5" />
            <span>Schedule Your Custom Consultation</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Industries;
