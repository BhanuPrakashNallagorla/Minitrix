import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onNavigate?: (page: 'home' | 'blog' | 'services' | 'usecases' | 'about' | 'industries') => void;
  currentPage?: 'home' | 'blog' | 'services' | 'usecases' | 'about' | 'industries';
}

const Navigation = ({ onNavigate, currentPage = 'home' }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', key: 'home' as const },
    { label: 'Blog', key: 'blog' as const },
    { label: 'Services', key: 'services' as const },
    { label: 'Use Cases', key: 'usecases' as const },
    { label: 'Industries', key: 'industries' as const },
    { label: 'About Us', key: 'about' as const }
  ];

  const handleMenuClick = (pageKey: 'home' | 'blog' | 'services' | 'usecases' | 'about' | 'industries') => {
    onNavigate?.(pageKey);
  };

  const isActiveItem = (pageKey: string) => {
    return currentPage === pageKey;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-lg border-b border-gray-800' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-lg" aria-label="Logo placeholder" />
            <span className="text-3xl md:text-4xl font-extrabold leading-none gradient-text-animated">
              Minitrix
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => {
              const isActive = isActiveItem(item.key);
              return (
                <button
                  key={item.key}
                  onClick={() => handleMenuClick(item.key)}
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium relative group hover:scale-105 hover:-translate-y-0.5"
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </button>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact-section');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  // If not on home page, navigate to home first
                  onNavigate?.('home');
                  setTimeout(() => {
                    const contactSection = document.getElementById('contact-section');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }
              }}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 shadow-lg hover:shadow-blue-500/25"
            >
              Book Demo
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-b border-gray-800">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => {
              const isActive = isActiveItem(item.key);
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    setIsOpen(false);
                    handleMenuClick(item.key);
                  }}
                  className={`block py-2 font-medium w-full text-left transition-colors duration-200 ${
                    isActive ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <button 
              onClick={() => {
                setIsOpen(false);
                const contactSection = document.getElementById('contact-section');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  // If not on home page, navigate to home first
                  onNavigate?.('home');
                  setTimeout(() => {
                    const contactSection = document.getElementById('contact-section');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-2 rounded-lg font-semibold mt-4 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 shadow-lg hover:shadow-blue-500/25"
            >
              Book Demo
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;