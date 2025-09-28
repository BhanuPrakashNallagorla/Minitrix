import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ValuePropsWithConstellation from './components/ValuePropsWithConstellation';
 
import ClientTestimonials from './components/ClientTestimonials';
import CaseStudies from './components/CaseStudies';
import ComparisonTable from './components/ComparisonTable';
import EnterpriseSolutions from './components/EnterpriseSolutions';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FooterDataWeave from './components/FooterDataWeave';
import FooterLivingBrand from './components/FooterLivingBrand';
import BlackholeBackground from './components/BlackholeBackground';
import CustomizableSLMs from './components/CustomizableSLMs';
import UseCases from './components/UseCasesNew';
import AboutUs from './components/AboutUs';
import InsightsHub from './components/InsightsHub';
import Industries from './components/Industries';
import ChatWidget from './components/ChatWidget';
import BlogArticle from './components/BlogArticle';
import './styles/themes.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'blog' | 'services' | 'usecases' | 'about' | 'industries' | 'footer-data-weave' | 'footer-living-brand' | 'article'>('home');
  const [currentArticleId, setCurrentArticleId] = useState<string | null>(null);

  const handleNavigation = (page: 'home' | 'blog' | 'services' | 'usecases' | 'about' | 'industries') => {
    setCurrentPage(page);
    setCurrentArticleId(null);
    // Scroll to top when navigating between pages
    window.scrollTo(0, 0);
  };

  const handleArticleNavigation = (articleId: string) => {
    setCurrentArticleId(articleId);
    setCurrentPage('article');
    window.scrollTo(0, 0);
  };

  const handleBackToBlog = () => {
    setCurrentPage('blog');
    setCurrentArticleId(null);
    window.scrollTo(0, 0);
  };

  // Scroll to top on initial load and page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Global handler for "Book Demo" actions from anywhere in the app
  useEffect(() => {
    const handler = () => {
      if (currentPage !== 'home') {
        setCurrentPage('home');
        setTimeout(() => {
          const contactSection = document.getElementById('contact-section');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      } else {
        const contactSection = document.getElementById('contact-section');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('book-demo' as any, handler as EventListener);
    return () => {
      window.removeEventListener('book-demo' as any, handler as EventListener);
    };
  }, [currentPage]);

  const handleFooterPreview = (footerType: 'footer-data-weave' | 'footer-living-brand') => {
    setCurrentPage(footerType);
  };

  if (currentPage === 'article' && currentArticleId) {
    return (
      <div className="min-h-screen bg-black text-white relative">
        <BlogArticle articleId={currentArticleId} onBack={handleBackToBlog} />
        <ChatWidget />
      </div>
    );
  }

  if (currentPage === 'blog') {
    return (
      <div className="min-h-screen bg-black text-white relative">
        <Navigation onNavigate={handleNavigation} currentPage={currentPage} />
        <InsightsHub onArticleClick={handleArticleNavigation} />
        <Footer onNavigate={handleNavigation} />
        <ChatWidget />
      </div>
    );
  }

  if (currentPage === 'services') {
    return (
      <div className="min-h-screen bg-black text-white relative">
        <BlackholeBackground />
        <Navigation onNavigate={handleNavigation} currentPage={currentPage} />
        <CustomizableSLMs />
        <Footer onNavigate={handleNavigation} />
        <ChatWidget />
      </div>
    );
  }

  if (currentPage === 'usecases') {
    return (
      <div className="min-h-screen bg-black text-white relative">
        <BlackholeBackground />
        <Navigation onNavigate={handleNavigation} currentPage={currentPage} />
        <UseCases />
        <Footer onNavigate={handleNavigation} />
        <ChatWidget />
      </div>
    );
  }

  if (currentPage === 'about') {
    return (
      <div className="min-h-screen bg-black text-white relative">
        <Navigation onNavigate={handleNavigation} currentPage={currentPage} />
        <AboutUs />
        <Footer onNavigate={handleNavigation} />
        <ChatWidget />
      </div>
    );
  }

  if (currentPage === 'industries') {
    return (
      <div className="min-h-screen bg-black text-white relative">
        <Navigation onNavigate={handleNavigation} currentPage={currentPage} />
        <Industries />
        <Footer onNavigate={handleNavigation} />
        <ChatWidget />
      </div>
    );
  }

  if (currentPage === 'footer-data-weave') {
    return (
      <div className="min-h-screen bg-black text-white relative">
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => setCurrentPage('home')}
              className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              ← Back to Home
            </button>
            <h1 className="text-3xl font-bold mb-4">Footer Option A: Interactive Data Weave</h1>
            <p className="text-gray-300 mb-8">
              This footer features a live generative canvas background with glowing lines that form a neural network pattern. 
              The animation subtly reacts to mouse movement for enhanced interactivity.
            </p>
            <div className="flex gap-4 mb-8">
              <button 
                onClick={() => handleFooterPreview('footer-living-brand')}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                View Option B
              </button>
            </div>
          </div>
        </div>
        <FooterDataWeave onNavigate={handleNavigation} />
      </div>
    );
  }

  if (currentPage === 'footer-living-brand') {
    return (
      <div className="min-h-screen bg-black text-white relative">
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => setCurrentPage('home')}
              className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              ← Back to Home
            </button>
            <h1 className="text-3xl font-bold mb-4">Footer Option B: Living Brand Statement</h1>
            <p className="text-gray-300 mb-8">
              This footer features an animated headline that cycles through key value propositions every 3.5 seconds, 
              creating a dynamic and persuasive call-to-action experience.
            </p>
            <div className="flex gap-4 mb-8">
              <button 
                onClick={() => handleFooterPreview('footer-data-weave')}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                View Option A
              </button>
            </div>
          </div>
        </div>
        <FooterLivingBrand onNavigate={handleNavigation} />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <BlackholeBackground />
      <Navigation onNavigate={handleNavigation} currentPage={currentPage} />
      <Hero />
      <ValuePropsWithConstellation />
      
      <ClientTestimonials />
      <CaseStudies />
      <ComparisonTable />
      <EnterpriseSolutions />
      <Contact />
      <Footer onNavigate={handleNavigation} />
      <ChatWidget />
    </div>
  );
}

export default App;