import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search articles..." }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-md mx-auto lg:mx-0">
      <div className={`relative flex items-center transition-all duration-300 ${
        isFocused ? 'transform scale-105' : ''
      }`}>
        <div className="absolute left-3 pointer-events-none">
          <Search className={`h-5 w-5 transition-colors duration-300 ${
            isFocused ? 'text-accent-mint' : 'text-gray-400'
          }`} />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full pl-10 pr-10 py-3 bg-neutral-800/50 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-mint/50 ${
            isFocused 
              ? 'border-accent-mint/50 bg-neutral-800/80' 
              : 'border-neutral-700 hover:border-neutral-600'
          }`}
        />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 p-1 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      {/* Search suggestions could go here */}
      {query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-800/95 backdrop-blur-sm border border-neutral-700 rounded-lg shadow-xl z-50 opacity-0 animate-fade-in">
          <div className="p-3 text-sm text-gray-400">
            Press Enter to search for "{query}"
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchBar;
