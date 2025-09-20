
const TrustedCompanies = () => {
  const companies = [
    { 
      name: 'VectorFlow AI',
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12">
          <path fill="#3B82F6" d="M4 4l16 8-16 8V4z"/>
          <circle cx="20" cy="12" r="2" fill="#06B6D4"/>
        </svg>
      )
    },
    { 
      name: 'Neural Dynamics',
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12">
          <circle cx="6" cy="12" r="3" fill="#8B5CF6"/>
          <circle cx="18" cy="12" r="3" fill="#EC4899"/>
          <circle cx="12" cy="6" r="2" fill="#F59E0B"/>
          <circle cx="12" cy="18" r="2" fill="#10B981"/>
          <path stroke="#6B7280" strokeWidth="2" d="M6 12h12M12 6v12"/>
        </svg>
      )
    },
    { 
      name: 'Quantum Labs',
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12">
          <path fill="#059669" d="M12 2L22 12L12 22L2 12L12 2z"/>
          <path fill="#FFFFFF" d="M12 6L18 12L12 18L6 12L12 6z"/>
          <circle cx="12" cy="12" r="2" fill="#059669"/>
        </svg>
      )
    },
    { 
      name: 'Cortex Systems',
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#DC2626"/>
          <path fill="#FFFFFF" d="M8 8h8v2H8zM8 12h6v2H8zM8 16h4v2H8z"/>
        </svg>
      )
    },
    { 
      name: 'Nexus Intelligence',
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12">
          <path fill="#7C3AED" d="M12 2L2 7v10l10 5 10-5V7L12 2z"/>
          <path fill="#FFFFFF" d="M12 6L6 9v6l6 3 6-3V9L12 6z"/>
          <circle cx="12" cy="12" r="1" fill="#7C3AED"/>
        </svg>
      )
    },
    { 
      name: 'Prism Analytics',
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12">
          <path fill="#0891B2" d="M2 12L12 2L22 12L12 22L2 12z"/>
          <path fill="#67E8F9" d="M12 2L22 12L12 12L2 12L12 2z"/>
        </svg>
      )
    },
    { 
      name: 'EdgeAI Corp',
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12">
          <rect x="4" y="4" width="16" height="16" rx="2" fill="#F59E0B"/>
          <path fill="#FFFFFF" d="M8 8v8l8-4L8 8z"/>
        </svg>
      )
    },
    { 
      name: 'Tensor Dynamics',
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12">
          <circle cx="12" cy="12" r="10" fill="#BE185D"/>
          <path fill="#FFFFFF" d="M8 12h8M12 8v8M9 9l6 6M15 9l-6 6"/>
        </svg>
      )
    }
  ];

  // Duplicate for seamless scroll
  const scrollingCompanies = [...companies, ...companies];

  return (
    <section className="section-dark section-transition relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-dark">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{color: 'var(--dark-text-secondary)'}}>
            Join leading AI companies and startups building the future with our SLM solutions
          </p>
        </div>

        {/* Scrolling Logo Container */}
        <div className="relative">
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll-left">
              {scrollingCompanies.map((company, index) => (
                <div
                  key={index}
                  className="flex-none mx-8 flex flex-col items-center justify-center group"
                >
                  <div className="opacity-60 hover:opacity-100 transition-all duration-300 group-hover:scale-110 cursor-pointer filter grayscale hover:grayscale-0 mb-2">
                    {company.logo}
                  </div>
                  <span className="text-xs font-medium transition-colors duration-300" style={{color: 'var(--dark-text-tertiary)'}}>
                    {company.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Gradient Fade Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none" style={{background: 'linear-gradient(to right, var(--dark-bg-primary), transparent)'}}></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none" style={{background: 'linear-gradient(to left, var(--dark-bg-primary), transparent)'}}></div>
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;