import { useState } from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';

// Custom Icons
const CostSavingsIcon = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8 text-white" fill="currentColor">
    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
    <path d="M19 15L19.5 17.5L22 18L19.5 18.5L19 21L18.5 18.5L16 18L18.5 17.5L19 15Z" />
    <path d="M5 15L5.5 17.5L8 18L5.5 18.5L5 21L4.5 18.5L2 18L4.5 17.5L5 15Z" />
  </svg>
);

const SecurityIcon = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8 text-white" fill="currentColor">
    <path d="M12 2L22 6V12C22 17.55 18.84 22.74 12 24C5.16 22.74 2 17.55 2 12V6L12 2Z" />
    <path d="M9 12L11 14L15 10" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PerformanceIcon = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8 text-white" fill="currentColor">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
  </svg>
);

const CustomizableIcon = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8 text-white" fill="currentColor">
    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5A3.5 3.5 0 0 1 15.5 12A3.5 3.5 0 0 1 12 15.5Z" />
    <path d="M19.43 12.98C19.47 12.66 19.5 12.33 19.5 12C19.5 11.67 19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.97 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H10C9.75 2 9.54 2.18 9.51 2.42L9.13 5.07C8.52 5.32 7.96 5.66 7.44 6.05L4.95 5.05C4.72 4.96 4.46 5.05 4.34 5.27L2.34 8.73C2.21 8.95 2.27 9.22 2.46 9.37L4.57 11.02C4.53 11.34 4.5 11.67 4.5 12C4.5 12.33 4.53 12.65 4.57 12.97L2.46 14.63C2.27 14.78 2.21 15.05 2.34 15.27L4.34 18.73C4.46 18.95 4.73 19.03 4.95 18.95L7.44 17.94C7.96 18.34 8.52 18.68 9.13 18.93L9.51 21.58C9.54 21.82 9.75 22 10 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.94L19.05 18.95C19.28 19.04 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98Z" />
  </svg>
);

const OwnershipIcon = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8 text-white" fill="currentColor">
    <path d="M5 16L3 5H1V3H4L6 14H18L20 7H8V5H21.68C21.89 5 22.06 5.17 22.06 5.38C22.06 5.45 22.04 5.52 22.01 5.58L19.58 14.47C19.5 14.75 19.25 14.95 18.95 14.95H6.75L7.25 17H19V19H6C5.45 19 5 18.55 5 18C5 17.85 5.04 17.71 5.12 17.58L5 16ZM7 22C8.1 22 9 21.1 9 20S8.1 18 7 18 5 18.9 5 20 5.9 22 7 22ZM17 22C18.1 22 19 21.1 19 20S18.1 18 17 18 15 18.9 15 20 15.9 22 17 22Z" />
    <path d="M12 2L14 8H20L15 12L17 18L12 14L7 18L9 12L4 8H10L12 2Z" />
  </svg>
);

const MigrationIcon = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8 text-white" fill="currentColor">
    <path d="M4 12L1 9L4 6V8H16V4H18V8H20V10H18V14H20V16H18V20H16V16H4V14H16V10H4V12Z" />
    <path d="M20 12L23 15L20 18V16H8V20H6V16H4V14H6V10H4V8H6V4H8V8H20V10H8V14H20V12Z" />
  </svg>
);

const ValueProps = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const valueProps = [
    {
      icon: CostSavingsIcon,
      title: 'Saves Cost',
      description: '60-80% reduction in AI operational expenses',
      detailedDescription: 'Eliminate expensive API calls and reduce infrastructure costs with our efficient SLMs that deliver the same quality at a fraction of the price.',
      color: 'from-green-500 to-emerald-400',
      stat: '$2M+ Annual Savings',
      metric: '80%',
      metricLabel: 'Cost Reduction'
    },
    {
      icon: SecurityIcon,
      title: 'Security',
      description: 'Your data never leaves your infrastructure',
      detailedDescription: 'Deploy on-premises or in your private cloud. Complete data sovereignty with enterprise-grade security and compliance.',
      color: 'from-blue-500 to-cyan-400',
      stat: '100% Data Privacy',
      metric: '0',
      metricLabel: 'Data Breaches'
    },
    {
      icon: PerformanceIcon,
      title: 'High Performance',
      description: '3x faster inference with domain-specific optimization',
      detailedDescription: 'Optimized architectures and specialized training deliver lightning-fast responses without compromising accuracy.',
      color: 'from-yellow-500 to-orange-400',
      stat: '< 50ms Response',
      metric: '3x',
      metricLabel: 'Faster'
    },
    {
      icon: CustomizableIcon,
      title: 'Customizable',
      description: 'Tailored AI models built for your specific use cases',
      detailedDescription: 'Fine-tuned models trained on your domain data, understanding your business context and terminology.',
      color: 'from-purple-500 to-pink-400',
      stat: 'Industry Specific',
      metric: '95%',
      metricLabel: 'Accuracy'
    },
    {
      icon: OwnershipIcon,
      title: 'Ownership',
      description: 'Deploy once, use forever - no usage fees',
      detailedDescription: 'Own your AI infrastructure completely. No per-token charges, no usage limits, no vendor lock-in.',
      color: 'from-indigo-500 to-blue-400',
      stat: 'Zero Usage Fees',
      metric: '∞',
      metricLabel: 'Usage Limit'
    },
    {
      icon: MigrationIcon,
      title: 'LLM to SLM',
      description: 'Seamless migration from expensive LLM providers',
      detailedDescription: 'Smooth transition with compatibility layers and migration tools. Maintain functionality while cutting costs.',
      color: 'from-cyan-500 to-teal-400',
      stat: '48hr Migration',
      metric: '48h',
      metricLabel: 'Migration Time'
    }
  ];

  return (
    <section className="section-dark section-transition relative py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 gradient-text-dark">
            Why Choose Our SLMs?
          </h2>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed" style={{color: 'var(--dark-text-secondary)'}}>
            Transform your AI strategy with purpose-built Small Language Models that deliver enterprise-grade results at a fraction of the cost
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => (
            <div
              key={index}
              className="card-dark group relative p-8 backdrop-blur-sm rounded-2xl transition-all duration-500 hover:transform hover:-translate-y-4 hover:shadow-2xl animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Animated Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${prop.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-all duration-500`}></div>
              
              {/* Floating Particles */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-2 h-2 bg-gradient-to-r ${prop.color} rounded-full opacity-0 group-hover:opacity-60 transition-all duration-1000 animate-twinkle`}
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${15 + i * 25}%`,
                      animationDelay: `${i * 0.5}s`
                    }}
                  />
                ))}
              </div>
              
              {/* Icon with Pulse Animation */}
              <div className={`relative inline-flex p-4 bg-gradient-to-r ${prop.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <prop.icon />
                <div className={`absolute inset-0 bg-gradient-to-r ${prop.color} rounded-2xl animate-pulse-slow opacity-0 group-hover:opacity-30`}></div>
              </div>

              {/* Large Metric Display */}
              <div className="absolute top-6 right-6 text-right opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                <div className={`text-4xl font-bold bg-gradient-to-r ${prop.color} bg-clip-text text-transparent`}>
                  {prop.metric}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  {prop.metricLabel}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-4 transition-colors duration-300" style={{color: 'var(--dark-text-primary)'}}>
                {prop.title}
              </h3>
              
              {/* Dynamic Description */}
              <div className="relative overflow-hidden">
                <p className={`leading-relaxed transition-all duration-500 ${hoveredCard === index ? 'opacity-0 transform -translate-y-4' : 'opacity-100 transform translate-y-0'}`} style={{color: 'var(--dark-text-secondary)'}}>
                  {prop.description}
                </p>
                <p className={`absolute inset-0 leading-relaxed transition-all duration-500 ${hoveredCard === index ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`} style={{color: 'var(--dark-text-primary)'}}>
                  {prop.detailedDescription}
                </p>
              </div>
              
              {/* Interactive Stat Badge */}
              <div className="mt-6 flex items-center justify-between">
                <div className={`inline-flex px-4 py-2 bg-gradient-to-r ${prop.color} bg-opacity-20 rounded-full text-sm font-semibold border border-transparent transition-all duration-300`} style={{color: 'var(--dark-text-primary)', borderColor: 'var(--dark-border)'}}>
                  {prop.stat}
                </div>
                
                {/* Explore More Arrow */}
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="h-5 w-5" style={{color: 'var(--accent-secondary)'}} />
                </div>
              </div>

              {/* Progress Bar Animation */}
              <div className="absolute bottom-0 left-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-x-0 group-hover:scale-x-100 origin-center" style={{background: 'linear-gradient(90deg, transparent, var(--accent-secondary), transparent)'}}></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="btn-primary-dark inline-flex items-center space-x-2 px-8 py-4 rounded-lg font-semibold group">
            <TrendingUp className="h-5 w-5 group-hover:animate-bounce" />
            <span className="font-medium">See Detailed Comparison</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ValueProps;