import React from 'react';

interface FooterPreviewDemoProps {
  onNavigateToPreview: (footerType: 'footer-data-weave' | 'footer-living-brand') => void;
}

const FooterPreviewDemo: React.FC<FooterPreviewDemoProps> = ({ onNavigateToPreview }) => {
  return (
    <div className="section-dark py-16" style={{ backgroundColor: '#ff0000', minHeight: '200px' }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6" style={{ color: 'white' }}>🎨 FOOTER PREVIEW DEMO - TEST</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          We've developed two innovative footer designs that transform the traditional static footer 
          into a dynamic brand experience. Click below to preview each concept live.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-3 text-blue-400">Option A: Interactive Data Weave</h3>
            <p className="text-gray-300 text-sm mb-4">
              Features a live generative canvas with neural network patterns that respond to mouse movement. 
              Perfect for showcasing our AI expertise through visual metaphor.
            </p>
            <button 
              onClick={() => onNavigateToPreview('footer-data-weave')}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Preview Data Weave →
            </button>
          </div>
          
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-3 text-green-400">Option B: Living Brand Statement</h3>
            <p className="text-gray-300 text-sm mb-4">
              Features animated headlines that cycle through key value propositions, 
              creating a dynamic and persuasive call-to-action experience.
            </p>
            <button 
              onClick={() => onNavigateToPreview('footer-living-brand')}
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Preview Living Brand →
            </button>
          </div>
        </div>
        
        <div className="text-sm text-gray-400">
          <p>Both concepts maintain full accessibility, responsive design, and performance optimization.</p>
        </div>
      </div>
    </div>
  );
};

export default FooterPreviewDemo;
