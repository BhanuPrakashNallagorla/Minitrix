import { ArrowLeft } from 'lucide-react';
import { BlogPost as BlogPostType } from '../../types/blog';

interface BlogPostProps {
  post: BlogPostType;
  onBack?: () => void;
}

const BlogPost = ({ post, onBack }: BlogPostProps) => {


  // Convert markdown content to HTML with special styling for key elements
  const formatContent = (content: string) => {
    return content
      // Main title (H1)
      .replace(/^#{1}\s+(.+)$/gm, '<h1 class="text-4xl md:text-5xl font-light text-white mb-8 mt-0 leading-tight">$1</h1>')
      // Section headings (H2) - Enhanced with better spacing and styling
      .replace(/^#{2}\s+(.+)$/gm, '<h2 class="text-3xl font-light text-white mb-8 mt-16 leading-tight border-b border-blue-400/30 pb-4">$1</h2>')
      // Subsection headings (H3) - Better hierarchy
      .replace(/^#{3}\s+(.+)$/gm, '<h3 class="text-xl font-semibold text-blue-400 mb-6 mt-10 leading-tight">$1</h3>')
      // Enhanced key data points with better styling
      .replace(/\*\*\$(\d+(?:,\d+)*(?:\.\d+)?)\*\*/g, '<span class="inline-block px-2 py-1 font-bold text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded text-lg shadow-lg">$$$1</span>')
      .replace(/\*\*(\d+(?:\.\d+)?%)\*\*/g, '<span class="inline-block px-2 py-1 font-bold text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded text-lg shadow-lg">$1</span>')
      .replace(/\*\*(\d+-\d+\s*(?:months?|month))\*\*/g, '<span class="inline-block px-2 py-1 font-bold text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded text-lg shadow-lg">$1</span>')
      .replace(/\*\*(\d+x)\*\*/g, '<span class="inline-block px-2 py-1 font-bold text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded text-lg shadow-lg">$1</span>')
      .replace(/\*\*(\d+(?:,\d+)*(?:\.\d+)?\s*(?:ms|seconds?|minutes?))\*\*/g, '<span class="inline-block px-2 py-1 font-bold text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded text-lg shadow-lg">$1</span>')
      // Other bold text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
      // Enhanced blockquotes with better styling
      .replace(/^>\s+(.+)$/gm, '<blockquote class="border-l-4 border-blue-400 pl-8 py-6 my-10 bg-gradient-to-r from-gray-900/60 to-gray-800/40 italic text-xl text-gray-200 leading-relaxed rounded-r-xl shadow-lg backdrop-blur-sm">$1</blockquote>')
      // Enhanced code blocks for formulas
      .replace(/```([\s\S]*?)```/g, '<div class="bg-gradient-to-r from-gray-900 to-gray-800 border-2 border-blue-400/30 rounded-xl p-8 my-10 shadow-xl"><div class="text-sm text-blue-400 mb-3 font-medium">Formula</div><code class="text-white font-mono text-lg leading-relaxed block">$1</code></div>')
      // Enhanced lists with better spacing
      .replace(/^- (.+)$/gm, '<li class="text-gray-300 mb-4 leading-relaxed pl-2">$1</li>')
      .replace(/(<li[^>]*>[\s\S]*?<\/li>)/g, '<ul class="list-disc list-inside mb-8 space-y-2 ml-6 text-lg">$1</ul>')
      // Regular paragraphs with better line height
      .replace(/^([^<\n#>-].+)$/gm, '<p class="text-gray-300 leading-relaxed mb-6 text-lg">$1</p>')
      // Clean up
      .replace(/<\/ul>\s*<ul[^>]*>/g, '')
      .replace(/(<p[^>]*><\/p>)/g, '');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6 py-6">
          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Insights
            </button>
          )}
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-16">
        {/* Article Header */}
        <header className="mb-16">
          <div className="mb-12">
            <span className="inline-block px-4 py-2 text-sm font-medium text-cyan-400 bg-cyan-400/10 rounded-full border border-cyan-400/30 mb-8">
              {post.category}
            </span>
            <h1 className="text-5xl md:text-6xl font-light leading-tight mb-10 text-white">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center text-base text-gray-400 space-x-6 border-t border-gray-700 pt-6">
              <span className="flex items-center">
                <span className="text-cyan-400 mr-2">By</span>
                {post.author.name}
              </span>
              <span className="text-gray-600">•</span>
              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
              <span className="text-gray-600">•</span>
              <span className="flex items-center">
                <span className="text-cyan-400 mr-1">{post.readingTime}</span>
                min read
              </span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="article-content">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
          />
          
          {/* CTA Section */}
          <div className="mt-16 p-8 bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-700 rounded-xl backdrop-blur-sm">
            <div className="text-center">
              <h3 className="text-2xl font-light text-white mb-4">
                Ready to Calculate Your TCO?
              </h3>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                See how much you could save with a custom Small Language Model solution.
              </p>
              <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                Get Your Custom ROI Analysis Today
              </button>
            </div>
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-16 pt-12 border-t border-gray-700">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex-shrink-0 flex items-center justify-center">
              <span className="text-white font-medium text-lg">
                {post.author.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h3 className="font-medium text-white mb-1">{post.author.name}</h3>
              <p className="text-sm text-blue-400 mb-2">{post.author.role}</p>
              <p className="text-gray-300 leading-relaxed">{post.author.bio}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
