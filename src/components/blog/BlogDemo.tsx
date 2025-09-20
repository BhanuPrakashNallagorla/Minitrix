import { useState } from 'react';
import { blogPosts } from '../../data/blogPosts';
import BlogIndex from './BlogIndex';
import BlogPost from './BlogPost';

const BlogDemo = () => {
  const [currentView, setCurrentView] = useState<'index' | 'post'>('index');
  const [selectedPost, setSelectedPost] = useState(blogPosts[0]);

  const handleBackToBlog = () => {
    setCurrentView('index');
  };


  if (currentView === 'post') {
    return (
      <BlogPost 
        post={selectedPost}
        onBack={handleBackToBlog}
      />
    );
  }

  return (
    <BlogIndex 
      onPostSelect={(postId) => {
        const post = blogPosts.find(p => p.id === postId);
        if (post) {
          setSelectedPost(post);
          setCurrentView('post');
        }
      }}
    />
  );
};

export default BlogDemo;
