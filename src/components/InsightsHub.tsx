import { useState } from 'react';
import { ArrowRight, Clock, User, Code, TrendingUp, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: 'Thought Leadership' | 'Solution Deep Dives' | 'Technical Guides';
  readTime: string;
  date: string;
  author: string;
  tags?: string[];
  metric?: string;
  clientLogo?: string;
}

interface InsightsHubProps {
  onArticleClick?: (articleId: string) => void;
}

const InsightsHub: React.FC<InsightsHubProps> = ({ onArticleClick }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample data - replace with actual content
  const featuredArticle: Article = {
    id: 'featured-1',
    title: 'The Hidden Threat: 3 Data Privacy Risks Every Enterprise Must Address in 2024',
    excerpt: 'As AI systems become more sophisticated, the privacy risks they pose are evolving rapidly. Discover the three critical vulnerabilities that could expose your organization to unprecedented data breaches.',
    category: 'Thought Leadership',
    readTime: '8 min read',
    date: '2024-01-15',
    author: 'Minitrix Research Team'
  };

  const solutionDeepDives: Article[] = [
    {
      id: 'solution-1',
      title: 'HealthCorp: Healthcare Case Study - Achieving 99.2% Accuracy in Medical Diagnosis',
      excerpt: 'Discover how HealthCorp transformed their diagnostic processes, achieving 99.2% accuracy and 70% time reduction through AI-powered medical diagnosis systems across 15 facilities.',
      category: 'Solution Deep Dives',
      readTime: '12 min read',
      date: '2024-01-10',
      author: 'Solutions Team',
      metric: '99.2% Accuracy • $4.2M Savings',
      clientLogo: 'HealthCorp'
    },
    {
      id: 'solution-2',
      title: 'FinanceFirst: Financial Services - Fraud Detection at Scale',
      excerpt: 'Discover how FinanceFirst achieved 99.8% fraud detection accuracy while processing 1M+ daily transactions, reducing false positives by 70% and preventing $15M+ in annual losses through real-time AI-powered fraud prevention.',
      category: 'Solution Deep Dives',
      readTime: '10 min read',
      date: '2024-01-08',
      author: 'Solutions Team',
      metric: '99.8% Accuracy • $15M+ Prevented',
      clientLogo: 'FinanceFirst'
    },
    {
      id: 'solution-3',
      title: 'ManufacturePro: Manufacturing - Predictive Maintenance Revolution',
      excerpt: 'Discover how ManufacturePro achieved 85% downtime reduction and 40% cost savings through AI-driven predictive maintenance across 500+ machines, transforming their manufacturing operations and achieving 95% prediction accuracy.',
      category: 'Solution Deep Dives',
      readTime: '9 min read',
      date: '2024-01-05',
      author: 'Solutions Team',
      metric: '85% Downtime Reduction • $920K Savings',
      clientLogo: 'ManufacturePro'
    }
  ];

  const technicalGuides: Article[] = [
    {
      id: 'tech-1',
      title: 'A Developer\'s Guide to On-Premise SLM Deployment',
      excerpt: 'Complete walkthrough for deploying small language models in enterprise environments.',
      category: 'Technical Guides',
      readTime: '15 min read',
      date: '2024-01-12',
      author: 'Engineering Team',
      tags: ['Docker', 'Kubernetes', 'Security']
    },
    {
      id: 'tech-2',
      title: 'Model Quantization: Performance vs. Accuracy Trade-offs',
      excerpt: 'Deep dive into quantization techniques for optimizing AI model performance.',
      category: 'Technical Guides',
      readTime: '18 min read',
      date: '2024-01-09',
      author: 'ML Engineering',
      tags: ['Quantization', 'Performance', 'Optimization']
    },
    {
      id: 'tech-3',
      title: 'Securing AI Pipelines: Best Practices Guide',
      excerpt: 'Essential security measures for production AI systems.',
      category: 'Technical Guides',
      readTime: '12 min read',
      date: '2024-01-06',
      author: 'Security Team',
      tags: ['Security', 'DevOps', 'Best Practices']
    }
  ];

  const allArticles = [featuredArticle, ...solutionDeepDives, ...technicalGuides];

  const filteredArticles = selectedFilter === 'All' 
    ? allArticles 
    : allArticles.filter(article => article.category === selectedFilter);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % solutionDeepDives.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + solutionDeepDives.length) % solutionDeepDives.length);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - Featured Insight */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                Featured Insight
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {featuredArticle.title}
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                {featuredArticle.excerpt}
              </p>
              <div className="flex items-center space-x-6 mb-8 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{featuredArticle.readTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{featuredArticle.author}</span>
                </div>
              </div>
              <button 
                onClick={() => onArticleClick?.(featuredArticle.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center space-x-2 group"
              >
                <span>Read the Article</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-12 border border-blue-500/20">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Shield className="w-12 h-12 text-blue-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">Data Privacy</div>
                      <div className="text-gray-400">Critical Focus Area</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold text-red-400">3</div>
                      <div className="text-sm text-gray-400">Hidden Risks</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-yellow-400">2024</div>
                      <div className="text-sm text-gray-400">Critical Year</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-green-400">100%</div>
                      <div className="text-sm text-gray-400">Enterprise Impact</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Deep Dives Section */}
      <section className="relative py-20 px-6 bg-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Proven in Action</h2>
              <p className="text-xl text-gray-300">Real-World Results from Our Solutions</p>
            </div>
            <div className="hidden md:flex space-x-4">
              <button 
                onClick={prevSlide}
                className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextSlide}
                className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutionDeepDives.map((article, index) => (
              <div 
                key={article.id}
                className={`bg-gray-800/30 rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group ${
                  index === currentSlide ? 'ring-2 ring-blue-500/30' : ''
                }`}
              >
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                      Case Study
                    </div>
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="text-4xl font-bold text-green-400 mb-2">{article.metric}</div>
                  <div className="text-sm text-gray-400 mb-4">{article.clientLogo}</div>
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-gray-400 text-sm">
                    <span>{article.readTime}</span>
                    <span>{article.date}</span>
                  </div>
                  <button 
                    onClick={() => onArticleClick?.(article.id)}
                    className="text-blue-400 hover:text-blue-300 font-medium flex items-center space-x-1 group"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Guides Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">From the Engineers' Desk</h2>
            <p className="text-xl text-gray-300">Technical Guides for Implementation</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technicalGuides.map((guide) => (
              <div 
                key={guide.id}
                className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group"
              >
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                      Technical Guide
                    </div>
                    <Code className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 font-mono group-hover:text-purple-400 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {guide.excerpt}
                </p>
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {guide.tags?.map((tag) => (
                      <span 
                        key={tag}
                        className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full text-sm font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-gray-400 text-sm">
                    <span>{guide.readTime}</span>
                    <span>{guide.author}</span>
                  </div>
                  <button 
                    onClick={() => onArticleClick?.(guide.id)}
                    className="text-purple-400 hover:text-purple-300 font-medium flex items-center space-x-1 group"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore All Insights Section */}
      <section className="relative py-20 px-6 bg-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Explore All Insights</h2>
            <p className="text-xl text-gray-300">Comprehensive Archive of Our Knowledge</p>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['All', 'Thought Leadership', 'Solution Deep Dives', 'Technical Guides'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedFilter === filter
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          
          {/* Articles List */}
          <div className="space-y-6">
            {filteredArticles.map((article) => (
              <div 
                key={article.id}
                className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        article.category === 'Thought Leadership' ? 'bg-blue-600/20 text-blue-400' :
                        article.category === 'Solution Deep Dives' ? 'bg-green-600/20 text-green-400' :
                        'bg-purple-600/20 text-purple-400'
                      }`}>
                        {article.category}
                      </span>
                      <div className="flex items-center space-x-4 text-gray-400 text-sm">
                        <span>{article.date}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <button 
                      onClick={() => onArticleClick?.(article.id)}
                      className="text-blue-400 hover:text-blue-300 font-medium flex items-center space-x-1 group"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InsightsHub;
