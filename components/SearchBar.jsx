"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Initialize search term from URL
  useEffect(() => {
    const initialSearch = searchParams.get('title') || '';
    setSearchTerm(initialSearch);
    if (initialSearch) {
      fetchResults(initialSearch);
    }
  }, [searchParams]);

  // Debounced search with 500ms delay
  const debouncedSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (term.trim()) {
      params.set('title', term.trim());
    } else {
      params.delete('title');
    }
    
    router.push(`?${params.toString()}`, { scroll: false });
    fetchResults(term.trim());
  }, 500);

  // Fetch results from your MongoDB API
  const fetchResults = async (term) => {
    if (!term) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/topics?title=${encodeURIComponent(term)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch results');
      }
      
      const { topics } = await response.json();
      setResults(topics || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('title');
    router.push(`?${params.toString()}`, { scroll: false });
    setResults([]);
  };

  return (
    <div className="search-container">
      <div className="relative">
        <input 
          type="text" 
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search topics by title..."
          className="w-full p-3 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {loading && (
        <div className="mt-3 text-center text-gray-500">Searching...</div>
      )}

      {!loading && results.length > 0 && (
        <div className="mt-4 space-y-3">
          <h3 className="font-semibold text-lg">Search Results ({results.length})</h3>
          <div className="space-y-2">
            {results.map((topic) => (
              <div key={topic._id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <h4 className="font-medium">{topic.title}</h4>
                {topic.description && (
                  <p className="text-sm text-gray-600 mt-1">{topic.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && searchTerm && results.length === 0 && (
        <div className="mt-3 text-center text-gray-500">
          No topics found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
}