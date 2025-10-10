import { BlogPost } from '../../types/blog';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

interface FeaturedPostProps {
  post: BlogPost;
}

const FeaturedPost = ({ post }: FeaturedPostProps) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      'Enterprise AI': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'SLM Technology': 'bg-blue-600/20 text-blue-300 border-blue-600/30',
      'Case Studies': 'bg-blue-400/20 text-blue-300 border-blue-400/30',
      'Data Privacy & Security': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Industry Insights': 'bg-blue-600/20 text-blue-300 border-blue-600/30',
      'Company News': 'bg-blue-400/20 text-blue-300 border-blue-400/30'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <article className="relative bg-gradient-to-br from-neutral-900/90 to-neutral-800/90 backdrop-blur-sm rounded-3xl border border-neutral-700 hover:border-accent-mint/50 transition-all duration-700 overflow-hidden group">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-400/5"></div>
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
        {/* Content */}
        <div className="flex flex-col justify-center space-y-6">
          {/* Featured Badge */}
          <div className="flex items-center space-x-3">
            <div className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full">
              <span className="text-blue-400 text-sm font-semibold">Featured Article</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(post.category)}`}>
              {post.category}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight group-hover:text-blue-400 transition-colors duration-500">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-gray-300 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-white font-medium">{post.author.name}</span>
                <span className="text-gray-500 ml-1">• {post.author.role}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 shadow-lg hover:shadow-blue-500/25 group">
              <span>Read Full Article</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative">
          <div className="aspect-[4/3] bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl border border-neutral-700 flex items-center justify-center group-hover:border-accent-mint/30 transition-all duration-500">
            <div className="text-center">
              <div className="text-neutral-600 text-lg mb-2">Featured Image</div>
              <div className="text-neutral-700 text-sm">1200x900 px</div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-accent-mint/20 to-brand-blue/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-brand-blue/20 to-accent-mint/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200"></div>
        </div>
      </div>
    </article>
  );
};

export default FeaturedPost;
