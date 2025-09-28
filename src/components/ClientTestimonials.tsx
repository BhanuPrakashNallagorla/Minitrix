import { useState } from 'react';
import { Quote, Star, ArrowLeft, ArrowRight } from 'lucide-react';

const ClientTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "Minitrix transformed our AI strategy completely. We reduced our operational costs by 75% while maintaining the same quality of results. The migration was seamless and their team provided exceptional support throughout the process.",
      author: "Sarah Chen",
      title: "CTO",
      company: "TechFlow Dynamics",
      rating: 5,
      metrics: "75% cost reduction, 2x faster deployment"
    },
    {
      quote: "The level of customization and data security that Minitrix provides is unmatched. Having our AI models deployed on-premises gives us complete control over our sensitive data while delivering enterprise-grade performance.",
      author: "Michael Rodriguez",
      title: "Head of AI",
      company: "SecureData Corp",
      rating: 5,
      metrics: "100% data privacy, 48hr migration"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-dark section-transition relative py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-dark">
            What Our Clients Say
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{color: 'var(--dark-text-secondary)'}}>
            Hear from industry leaders who have transformed their AI operations with Minitrix
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className="card-dark backdrop-blur-sm rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-cyan-900/20 rounded-2xl"></div>
            
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 opacity-10">
              <Quote className="h-20 w-20" style={{color: 'var(--accent-primary)'}} />
            </div>

            <div className="relative z-10">
              {/* Stars Rating */}
              <div className="flex items-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl leading-relaxed mb-8 font-medium" style={{color: 'var(--dark-text-primary)'}}>
                "{testimonials[currentTestimonial].quote}"
              </blockquote>

              {/* Metrics Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-8" style={{backgroundColor: 'var(--dark-bg-secondary)', border: '1px solid var(--dark-border)', color: 'var(--accent-primary)'}}>
                {testimonials[currentTestimonial].metrics}
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold" style={{color: 'var(--dark-text-primary)'}}>
                    {testimonials[currentTestimonial].author}
                  </div>
                  <div style={{color: 'var(--dark-text-secondary)'}}>
                    {testimonials[currentTestimonial].title} at {testimonials[currentTestimonial].company}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                    style={{backgroundColor: 'var(--dark-bg-secondary)', color: 'var(--dark-text-tertiary)', borderColor: 'var(--dark-border)'}}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                    style={{backgroundColor: 'var(--dark-bg-secondary)', color: 'var(--dark-text-tertiary)', borderColor: 'var(--dark-border)'}}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300`}
                style={{
                  backgroundColor: index === currentTestimonial ? 'var(--accent-primary)' : 'var(--dark-border)',
                  transform: index === currentTestimonial ? 'scale(1.25)' : 'scale(1)'
                }}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="mb-6" style={{color: 'var(--dark-text-secondary)'}}>Ready to join these industry leaders?</p>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('book-demo'))}
            className="btn-primary-dark inline-flex items-center px-8 py-4 rounded-lg font-semibold"
          >
            Book Your Demo Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;
