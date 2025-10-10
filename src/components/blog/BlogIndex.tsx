import { useState } from 'react';
import { blogPosts } from '../../data/blogPosts';

interface BlogIndexProps {
  onPostSelect?: (postId: string) => void;
}

type FilterType = 'all' | 'technology' | 'case-studies' | 'security';

const BlogIndex = ({ onPostSelect }: BlogIndexProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);
  
  const getFilteredPosts = () => {
    if (activeFilter === 'all') return regularPosts;
    
    const filterMap = {
      'technology': ['Enterprise AI', 'SLM Technology'],
      'case-studies': ['Case Studies'],
      'security': ['Data Privacy & Security']
    };
    
    return regularPosts.filter(post => 
      filterMap[activeFilter]?.includes(post.category)
    );
  };
  
  const filteredPosts = getFilteredPosts();

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
              Minitrix Insights
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Expert perspectives on enterprise AI, Small Language Models, and the future of intelligent automation
            </p>
          </div>
        </div>
      </header>

      {/* Simple Filter Tags */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { id: 'all' as FilterType, label: 'All' },
              { id: 'technology' as FilterType, label: 'Technology' },
              { id: 'case-studies' as FilterType, label: 'Case Studies' },
              { id: 'security' as FilterType, label: 'Security' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="bg-black">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Featured Post */}
          {activeFilter === 'all' && featuredPost && (
            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-light text-white mb-2">Featured Article</h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto"></div>
              </div>
              
              <article 
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 hover:bg-gray-900/70 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
                onClick={() => onPostSelect?.(featuredPost.id)}
              >
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-blue-300 bg-blue-500/10 rounded-full border border-blue-500/20">
                    {featuredPost.category}
                  </span>
                </div>
                <h3 className="text-3xl font-light text-white mb-4 leading-tight hover:text-blue-300 transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span>{featuredPost.author.name}</span>
                    <span>•</span>
                    <span>{new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                    <span>•</span>
                    <span>{featuredPost.readingTime} min read</span>
                  </div>
                </div>
              </article>
            </div>
          )}

          {/* Articles Grid */}
          <div className="space-y-8">
            {filteredPosts.map((post) => (
              <article 
                key={post.id}
                className="bg-gray-900/30 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:bg-gray-900/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
                onClick={() => onPostSelect?.(post.id)}
              >
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-blue-300 bg-blue-500/10 rounded-full border border-blue-500/20">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-2xl font-light text-white mb-3 leading-tight hover:text-blue-300 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-400 space-x-4">
                  <span>{post.author.name}</span>
                  <span>•</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                  <span>•</span>
                  <span>{post.readingTime} min read</span>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-200 font-medium shadow-lg hover:shadow-xl">
              Load More Articles
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogIndex;
