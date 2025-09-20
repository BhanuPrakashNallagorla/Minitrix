import { Heart, DollarSign, ShoppingCart, TrendingUp, Clock, Shield, Building2, Truck, ChevronDown } from 'lucide-react';

const CaseStudies = () => {
  const caseStudies = [
    {
      icon: Heart,
      industry: 'Healthcare Provider',
      title: 'HIPAA-Compliant AI Transformation',
      description: 'Major healthcare network replaced expensive LLM APIs with custom SLMs for patient data analysis',
      image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&h=250&fit=crop&crop=center',
      metrics: [
        { label: 'Cost Reduction', value: '75%', icon: TrendingUp },
        { label: 'Compliance', value: 'HIPAA', icon: Shield },
        { label: 'Implementation', value: '6 weeks', icon: Clock }
      ],
      results: 'Achieved full regulatory compliance while reducing AI operational costs by $1.8M annually',
      gradient: 'from-green-500 to-emerald-400'
    },
    {
      icon: DollarSign,
      industry: 'Financial Services',
      title: 'Real-time Fraud Detection',
      description: 'Investment firm deployed specialized SLMs for transaction monitoring and risk assessment',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center',
      metrics: [
        { label: 'Response Time', value: '60% faster', icon: TrendingUp },
        { label: 'Accuracy', value: '94.5%', icon: Shield },
        { label: 'ROI', value: '340%', icon: Clock }
      ],
      results: 'Improved fraud detection accuracy while maintaining strict regulatory standards',
      gradient: 'from-blue-500 to-cyan-400'
    },
    {
      icon: ShoppingCart,
      industry: 'E-commerce Platform',
      title: 'Personalized Shopping Experience',
      description: 'Online retailer implemented SLMs for product recommendations and customer service automation',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center',
      metrics: [
        { label: 'Annual Savings', value: '$2M', icon: TrendingUp },
        { label: 'Accuracy Boost', value: '40%', icon: Shield },
        { label: 'Customer Satisfaction', value: '95%', icon: Clock }
      ],
      results: 'Increased conversion rates by 35% while dramatically reducing AI infrastructure costs',
      gradient: 'from-purple-500 to-pink-400'
    },
    {
      icon: Building2,
      industry: 'Manufacturing',
      title: 'Predictive Maintenance System',
      description: 'Global manufacturer deployed SLMs for equipment monitoring and predictive maintenance scheduling',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop&crop=center',
      metrics: [
        { label: 'Downtime Reduction', value: '65%', icon: TrendingUp },
        { label: 'Maintenance Costs', value: '-$3.2M', icon: DollarSign },
        { label: 'Efficiency Gain', value: '28%', icon: Clock }
      ],
      results: 'Eliminated unexpected equipment failures while reducing maintenance costs by over $3M annually',
      gradient: 'from-orange-500 to-red-400'
    },
    {
      icon: Truck,
      industry: 'Logistics & Supply Chain',
      title: 'Smart Route Optimization',
      description: 'Transportation company implemented SLMs for dynamic route planning and delivery optimization',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=250&fit=crop&crop=center',
      metrics: [
        { label: 'Fuel Savings', value: '45%', icon: TrendingUp },
        { label: 'Delivery Speed', value: '+30%', icon: Clock },
        { label: 'Customer Rating', value: '4.9/5', icon: Shield }
      ],
      results: 'Optimized delivery routes resulting in 45% fuel savings and 30% faster delivery times',
      gradient: 'from-indigo-500 to-purple-400'
    }
  ];

  return (
    <section className="section-dark section-transition relative py-24">
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-px rounded-full animate-twinkle"
              style={{
                backgroundColor: 'var(--accent-primary)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-dark">
            Proven Results Across Industries
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{color: 'var(--dark-text-secondary)'}}>
            See how leading organizations achieved dramatic cost savings and performance improvements
          </p>
        </div>

        <div className="relative">
          <div className="flex overflow-x-auto gap-8 pb-4 scrollbar-hide">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="group relative p-8 card-dark backdrop-blur-sm rounded-2xl transition-all duration-500 hover:transform hover:-translate-y-3 hover:shadow-2xl flex-shrink-0 w-96"
              >
              {/* Gradient Glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${study.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
              
              {/* Image */}
              <div className="relative mb-6 overflow-hidden rounded-xl">
                <img 
                  src={study.image} 
                  alt={study.industry}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className={`absolute bottom-4 left-4 p-2 bg-gradient-to-r ${study.gradient} rounded-lg`}>
                  <study.icon className="h-6 w-6 text-white" />
                </div>
              </div>

              {/* Header */}
              <div className="mb-6">
                <div className="font-semibold text-sm uppercase tracking-wide mb-2" style={{color: 'var(--accent-primary)'}}>
                  {study.industry}
                </div>
                <h3 className="text-xl font-bold" style={{color: 'var(--dark-text-primary)'}}>{study.title}</h3>
              </div>

              {/* Description */}
              <p className="mb-8 leading-relaxed" style={{color: 'var(--dark-text-secondary)'}}>{study.description}</p>

              {/* Metrics */}
              <div className="space-y-4 mb-8">
                {study.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="flex items-center justify-between p-3 rounded-lg" style={{backgroundColor: 'var(--dark-bg-secondary)'}}>
                    <div className="flex items-center space-x-3">
                      <metric.icon className="h-5 w-5" style={{color: 'var(--dark-text-tertiary)'}} />
                      <span style={{color: 'var(--dark-text-secondary)'}}>{metric.label}</span>
                    </div>
                    <span className="font-bold" style={{color: 'var(--dark-text-primary)'}}>{metric.value}</span>
                  </div>
                ))}
              </div>

              {/* Results */}
              <div className="pt-6" style={{borderTop: '1px solid var(--dark-border)'}}>
                <p className="font-semibold italic" style={{color: 'var(--dark-text-primary)'}}>"{study.results}"</p>
              </div>

              {/* Hover Effect Arrow */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <div className={`w-3 h-3 bg-gradient-to-r ${study.gradient} rounded-full`}></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Horizontal Scroll Indicator */}
        <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 rotate-90 hidden xl:flex flex-col items-center space-y-2">
          <div className="w-px h-16 opacity-60" style={{background: `linear-gradient(to bottom, transparent, var(--accent-primary), transparent)`}}></div>
          <div className="animate-bounce">
            <ChevronDown className="h-6 w-6 opacity-80" style={{color: 'var(--accent-primary)'}} />
          </div>
          <div className="w-px h-16 opacity-60" style={{background: `linear-gradient(to bottom, transparent, var(--accent-primary), transparent)`}}></div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default CaseStudies;