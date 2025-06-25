import React, { useState } from 'react';
import { X, Star, DollarSign, Search, Loader2 } from 'lucide-react';
import { Product } from '../types';
import { searchProducts, SearchResult } from '../services/productSearch';
import toast from 'react-hot-toast';

interface SubmissionFormProps {
  onSubmit: (submission: Omit<Product, 'id'>) => void;
  onClose: () => void;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    personalStory: '',
    marketplaceUrls: {} as Record<string, string>
  });

  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const categories = [
    'Tech Essentials', 'Home & Kitchen', 'Outdoor Gear', 'Office Must-Haves',
    'Travel Accessories', 'Fitness Equipment', 'Smart Home', 'Fashion',
    'Books & Learning', 'Pet Essentials', 'Beauty & Wellness', 'Tools & Hardware'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProductSearch = async () => {
    if (!formData.name || formData.name.length < 3) {
      toast.error('Please enter at least 3 characters to search');
      return;
    }

    setIsSearching(true);
    setSearchResults([]);

    try {
      const results = await searchProducts(formData.name);
      setSearchResults(results.slice(0, 6)); // Limit to 6 results
      
      if (results.length > 0) {
        toast.success(`Found ${results.length} matches!`);
      } else {
        toast.error('No products found. Try a different search term.');
      }
    } catch (error) {
      toast.error('Search failed. Please try entering details manually.');
    } finally {
      setIsSearching(false);
    }
  };

  const selectSearchResult = (result: SearchResult) => {
    const marketplace = result.marketplace.toLowerCase().replace(/\s+/g, '');
    
    setFormData(prev => ({
      ...prev,
      name: prev.name || result.title,
      price: result.price.toString(),
      marketplaceUrls: {
        ...prev.marketplaceUrls,
        [marketplace]: result.url
      }
    }));

    toast.success(`Added ${result.marketplace} link!`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.category || !formData.personalStory) {
      toast.error('Please fill in all required fields');
      return;
    }

    const submission: Omit<Product, 'id'> = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      rating: 10 + Math.random() * 2, // Random rating between 10-12
      reviews: Math.floor(Math.random() * 100) + 10,
      category: formData.category,
      tags: ['Community Pick', 'Verified'],
      image: searchResults.length > 0 ? searchResults[0].image || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800' : 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      marketplaceLinks: formData.marketplaceUrls,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    toast.success('Thank you for sharing your recommendation!');
    onSubmit(submission);
  };

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-2xl border border-emerald-500/30 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-full">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Share Your Favorite Product</h2>
            <p className="text-slate-400">Help others discover amazing items</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 mb-2 text-sm font-medium">
                Product Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-emerald-500"
                  placeholder="e.g., iPhone 15 Pro, Vitamix Blender..."
                  required
                />
                <button
                  type="button"
                  onClick={handleProductSearch}
                  disabled={isSearching}
                  className="absolute right-2 top-2 bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded transition-colors"
                >
                  {isSearching ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 mb-2 text-sm font-medium">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/50">
              <h4 className="text-sm font-semibold text-slate-300 mb-3">Found {searchResults.length} results:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-40 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <div key={index} className="bg-slate-800/50 rounded-lg p-3 border border-slate-600/30">
                    <div className="flex items-start gap-3">
                      {result.image && (
                        <img src={result.image} alt={result.title} className="w-12 h-12 rounded object-cover" />
                      )}
                      <div className="flex-1 min-w-0">
                        <h5 className="text-sm font-medium text-white line-clamp-2">{result.title}</h5>
                        <div className="flex items-center justify-between mt-2">
                          <div className="text-emerald-400 font-bold">${result.price}</div>
                          <div className="text-xs text-slate-400">{result.marketplace}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => selectSearchResult(result)}
                          className="mt-2 text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded transition-colors"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-300 mb-2 text-sm font-medium">
              Product Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 h-24"
              placeholder="Brief description of what this product is and what it does..."
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2 text-sm font-medium">
              Your Personal Story *
            </label>
            <textarea
              name="personalStory"
              value={formData.personalStory}
              onChange={handleChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 h-32"
              placeholder="Why do you love this product? How has it helped you? Share your honest experience..."
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2 text-sm font-medium">
              Approximate Price
            </label>
            <div className="relative">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 pl-8 text-white focus:outline-none focus:border-emerald-500"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
              <DollarSign className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg"
            >
              Submit Recommendation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmissionForm;