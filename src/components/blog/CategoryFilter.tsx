import { BlogFilterType } from '../../types/blog';
import { blogCategories } from '../../data/blogPosts';

interface CategoryFilterProps {
  activeFilter: BlogFilterType;
  onFilterChange: (filter: BlogFilterType) => void;
}

const CategoryFilter = ({ activeFilter, onFilterChange }: CategoryFilterProps) => {

  const filters = [
    { id: 'all' as BlogFilterType, name: 'All Articles', count: blogCategories.reduce((sum, cat) => sum + cat.count, 0) },
    ...blogCategories.map(cat => ({
      id: cat.slug as BlogFilterType,
      name: cat.name,
      count: cat.count
    }))
  ];

  return (
    <div className="sticky top-20 z-40 bg-black/80 backdrop-blur-lg border-b border-neutral-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                activeFilter === filter.id
                  ? 'bg-accent-mint text-black shadow-lg shadow-accent-mint/25'
                  : 'bg-neutral-800/50 text-gray-300 hover:bg-neutral-700 hover:text-white border border-neutral-700 hover:border-accent-mint/30'
              }`}
            >
              <span>{filter.name}</span>
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeFilter === filter.id
                  ? 'bg-black/20 text-black'
                  : 'bg-neutral-700 text-gray-400'
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
