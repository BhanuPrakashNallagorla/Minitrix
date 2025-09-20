import { useState, useEffect } from 'react';
import { Check, X, AlertCircle, Zap, Shield, DollarSign, TrendingUp, Clock, Target } from 'lucide-react';

const ComparisonTable = () => {
  const [visibleRows, setVisibleRows] = useState<number[]>([]);

  const comparisons = [
    { feature: 'Cost Model', llm: 'Pay per token ($0.03-0.12/1K)', slm: 'One-time investment', llmGood: false, slmGood: true, icon: DollarSign },
    { feature: 'Data Privacy', llm: 'External servers (risk)', slm: 'Your infrastructure (secure)', llmGood: false, slmGood: true, icon: Shield },
    { feature: 'Performance', llm: 'Generic responses', slm: 'Domain-optimized (3x faster)', llmGood: false, slmGood: true, icon: Zap },
    { feature: 'Scaling Costs', llm: 'Exponential growth', slm: 'Fixed operational cost', llmGood: false, slmGood: true, icon: TrendingUp },
    { feature: 'Response Time', llm: '2-5 seconds', slm: '50-200ms average', llmGood: false, slmGood: true, icon: Clock },
    { feature: 'Accuracy', llm: '70-85% domain tasks', slm: '90-98% specialized tasks', llmGood: false, slmGood: true, icon: Target },
    { feature: 'Customization', llm: 'Limited prompting only', slm: 'Full model training & fine-tuning', llmGood: false, slmGood: true, icon: Target }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rowIndex = parseInt(entry.target.getAttribute('data-row') || '0');
            setVisibleRows(prev => [...prev, rowIndex]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const rows = document.querySelectorAll('[data-row]');
    rows.forEach(row => observer.observe(row));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-dark section-transition relative py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-cyan-900/5"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 gradient-text-dark">
            Why Smart Companies Choose SLMs Over LLMs
          </h2>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8" style={{color: 'var(--dark-text-secondary)'}}>
            Stop overpaying for generic AI. Get superior performance with purpose-built models.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div className="rounded-xl p-6" style={{backgroundColor: 'var(--dark-bg-secondary)', border: '1px solid var(--dark-border)'}}>
              <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-2" style={{color: 'var(--dark-text-primary)'}}>80% Cost Savings</div>
              <div className="text-sm" style={{color: 'var(--dark-text-secondary)'}}>Compared to LLM APIs</div>
            </div>
            <div className="rounded-xl p-6" style={{backgroundColor: 'var(--dark-bg-secondary)', border: '1px solid var(--dark-border)'}}>
              <Zap className="h-8 w-8 mx-auto mb-3" style={{color: 'var(--accent-primary)'}} />
              <div className="text-2xl font-bold mb-2" style={{color: 'var(--dark-text-primary)'}}>3x Faster</div>
              <div className="text-sm" style={{color: 'var(--dark-text-secondary)'}}>Response times</div>
            </div>
            <div className="rounded-xl p-6" style={{backgroundColor: 'var(--dark-bg-secondary)', border: '1px solid var(--dark-border)'}}>
              <Shield className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-2" style={{color: 'var(--dark-text-primary)'}}>100% Private</div>
              <div className="text-sm" style={{color: 'var(--dark-text-secondary)'}}>Your data stays secure</div>
            </div>
          </div>
        </div>

        <div className="card-dark backdrop-blur-sm rounded-2xl overflow-hidden">
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr style={{borderBottom: '1px solid var(--dark-border)'}}>
                  <th className="text-left p-4 sm:p-6 text-sm sm:text-lg font-bold" style={{color: 'var(--dark-text-primary)'}}>Feature</th>
                  <th className="text-center p-4 sm:p-6 text-sm sm:text-lg font-bold text-red-400">Traditional LLMs</th>
                  <th className="text-center p-4 sm:p-6 text-sm sm:text-lg font-bold gradient-text-dark">
                    Our Custom SLMs
                  </th>
                </tr>
              </thead>
            <tbody>
              {comparisons.map((comparison, index) => (
                <tr
                  key={index}
                  data-row={index}
                  className={`transition-all duration-500 ${
                    visibleRows.includes(index) 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ borderBottom: '1px solid var(--dark-border)', transitionDelay: `${index * 100}ms` }}
                >
                  <td className="p-3 sm:p-6">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <comparison.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" style={{color: 'var(--accent-primary)'}} />
                      <span className="font-semibold text-sm sm:text-base" style={{color: 'var(--dark-text-primary)'}}>{comparison.feature}</span>
                    </div>
                  </td>
                  <td className="p-3 sm:p-6 text-center">
                    <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                      <div className="flex-shrink-0">
                        <X className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                      </div>
                      <span className="text-xs sm:text-sm" style={{color: 'var(--dark-text-secondary)'}}>{comparison.llm}</span>
                    </div>
                  </td>
                  <td className="p-3 sm:p-6 text-center">
                    <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                      <div className="flex-shrink-0">
                        <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                      </div>
                      <span className="font-medium text-xs sm:text-sm" style={{color: 'var(--dark-text-primary)'}}>{comparison.slm}</span>
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>

          {/* Bottom CTA */}
          <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 p-8" style={{borderTop: '1px solid var(--dark-border)'}}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <AlertCircle className="h-6 w-6" style={{color: 'var(--accent-primary)'}} />
                  <span className="text-lg font-semibold" style={{color: 'var(--dark-text-primary)'}}>Ready to cut your AI costs by 80%?</span>
                </div>
                <p style={{color: 'var(--dark-text-secondary)'}}>Join 500+ companies already saving millions with custom SLMs</p>
              </div>
              <div className="text-center md:text-right mt-4 md:mt-0">
                <button className="btn-secondary-dark px-6 py-2 rounded-lg font-semibold">
                  <span className="gradient-text-dark">Get Your ROI Analysis</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;