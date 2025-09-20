import React from 'react';

const GeometricBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Floating Geometric Shapes */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={`absolute border border-cyan-400/20 ${
            i % 3 === 0 ? 'rotate-45' : i % 3 === 1 ? 'rotate-12' : '-rotate-12'
          } animate-float-slow`}
          style={{
            width: `${20 + (i % 4) * 15}px`,
            height: `${20 + (i % 4) * 15}px`,
            left: `${5 + (i % 8) * 12}%`,
            top: `${10 + (i % 6) * 15}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${6 + i % 4}s`
          }}
        />
      ))}

      {/* Particle Network */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}

      {/* Large Wireframe Elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-blue-500/10 rounded-full animate-spin-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border-2 border-cyan-500/10 transform rotate-45 animate-pulse-slow"></div>
      
      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-900/20 via-transparent to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-cyan-900/20 via-transparent to-transparent rounded-full blur-3xl"></div>
    </div>
  );
};

export default GeometricBackground;