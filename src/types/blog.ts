export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    bio: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  readingTime: number;
  featured?: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export type BlogFilterType = 'all' | 'slm-technology' | 'case-studies' | 'data-privacy' | 'industry-insights' | 'company-news';
