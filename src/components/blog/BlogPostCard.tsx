import { BlogPost } from '../../types/blog';
import { Calendar, Clock, User } from 'lucide-react';

interface BlogPostCardProps {
  post: BlogPost;
  className?: string;
}

const BlogPostCard = ({ post, className = '' }: BlogPostCardProps) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      'SLM Technology': 'bg-brand-blue/20 text-brand-blue border-brand-blue/30',
      'Case Studies': 'bg-accent-mint/20 text-accent-mint border-accent-mint/30',
      'Data Privacy & Security': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Industry Insights': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Company News': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <article className={`group bg-neutral-900/80 backdrop-blur-sm rounded-2xl border border-neutral-800 hover:border-accent-mint/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-mint/10 overflow-hidden ${className}`}>
      {/* Featured Image */}
      <div className="relative overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
          <div className="text-neutral-600 text-sm">Featured Image</div>
        </div>
        
        {/* Category Tag */}
        <div className="absolute top-4 left-4">
          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(post.category)}`}>
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Post Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-mint transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-400 leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime} min read</span>
          </div>
        </div>

        {/* Read More Button */}
        <div className="mt-6">
          <button className="inline-flex items-center text-accent-mint hover:text-accent-mint-light font-semibold transition-colors duration-300 group-hover:translate-x-1">
            Read More
            <svg className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
