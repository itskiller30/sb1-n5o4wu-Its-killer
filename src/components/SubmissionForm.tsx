import React, { useState } from 'react';
import { X, ShoppingCart, Link, DollarSign, Search, Loader2 } from 'lucide-react';
import { Product } from '../types';
import { SearchResult, searchProducts } from '../services/productSearch';
import SearchResults from './SearchResults';
import toast from 'react-hot-toast';

interface SubmissionFormProps {
  onSubmit: (submission: Omit<Product, 'id'>) => void;
  onClose: () => void;
}

interface MarketplacePrice {
  price: string;
  inStock: boolean;
}

interface PriceData {
  [key: string]: MarketplacePrice;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    marketplaceUrls: {} as Record<string, string>,
    marketplaceNames: {} as Record<string, string>
  });

  const [prices, setPrices] = useState<PriceData>({});
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = async () => {
    if (!formData.name || formData.name.length < 3) {
      toast.error('Please enter at least 3 characters to search');
      return;
    }

    setIsSearching(true);
    setSearchResults([]);

    try {
      const results = await searchProducts(formData.name);
      setSearchResults(results);
      if (results.length > 0) {
        toast.success(`Found ${results.length} matching products!`);
      } else {
        toast.error('No matching products found. Try a different search term.');
      }
    } catch (error) {
      toast.error('Failed to search products. Please try entering details manually.');
    } finally {
      setIsSearching(false);
    }
  };

  const selectSearchResult = (result: SearchResult) => {
    const marketplace = result.marketplace.toLowerCase();
    
    setFormData(prev => ({
      ...prev,
      name: prev.name || result.title,
      marketplaceUrls: {
        ...prev.marketplaceUrls,
        [marketplace]: result.url
      },
      marketplaceNames: {
        ...prev.marketplaceNames,
        [marketplace]: result.marketplace
      }
    }));

    setPrices(prev => ({
      ...prev,
      [marketplace]: {
        price: result.price,
        inStock: true
      }
    }));

    setSearchResults([]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('url_')) {
      const marketplace = name.replace('url_', '');
      setFormData(prev => ({
        ...prev,
        marketplaceUrls: {
          ...prev.marketplaceUrls,
          [marketplace]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePriceChange = (marketplace: string, value: string) => {
    setPrices(prev => ({
      ...prev,
      [marketplace]: { ...prev[marketplace], price: value }
    }));
  };

  const handleStockChange = (marketplace: string, value: boolean) => {
    setPrices(prev => ({
      ...prev,
      [marketplace]: { ...prev[marketplace], inStock: value }
    }));
  };

  const validateUrl = (url: string): boolean => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const findLowestPrice = (): { price: number; marketplace: string } | null => {
    const validPrices = Object.entries(prices)
      .filter(([_, data]) => data.inStock && data.price)
      .map(([marketplace, data]) => ({
        price: parseFloat(data.price),
        marketplace: formData.marketplaceNames[marketplace] || marketplace
      }));

    return validPrices.length > 0
      ? validPrices.reduce((min, p) => p.price < min.price ? p : min)
      : null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description) {
      toast.error('Please provide a product name and description');
      return;
    }

    if (Object.keys(formData.marketplaceUrls).length === 0) {
      toast.error('Please provide at least one product link');
      return;
    }

    // Validate URLs
    const invalidUrls = Object.entries(formData.marketplaceUrls)
      .filter(([_, url]) => !validateUrl(url));
    
    if (invalidUrls.length > 0) {
      toast.error(`Please enter valid URLs for: ${invalidUrls.map(([m]) => m).join(', ')}`);
      return;
    }

    const lowestPriceInfo = findLowestPrice();

    const submission: Omit<Product, 'id'> = {
      name: formData.name,
      description: formData.description,
      price: lowestPriceInfo?.price || 0,
      rating: 10,
      reviews: 1,
      category: 'General',
      tags: [],
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      marketplaceLinks: formData.marketplaceUrls,
      lowestPrice: lowestPriceInfo?.price,
      lowestPriceMarketplace: lowestPriceInfo?.marketplace,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    toast.success('Thank you for sharing your recommendation!');
    onSubmit(submission);
  };

  const renderMarketplaceInput = (marketplace: string) => {
    const displayName = formData.marketplaceNames[marketplace] || marketplace;
    
    return (
      <div key={marketplace} className="space-y-2">
        <div className="relative">
          <input
            type="url"
            name={`url_${marketplace}`}
            value={formData.marketplaceUrls[marketplace] || ''}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 pl-12 text-white focus:outline-none focus:border-holiday-gold"
            placeholder={`${displayName} product link`}
          />
          <Link className="absolute left-4 top-3.5 w-5 h-5 text-holiday-gold" />
        </div>
        {formData.marketplaceUrls[marketplace] && (
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="number"
                value={prices[marketplace]?.price || ''}
                onChange={(e) => handlePriceChange(marketplace, e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 pl-12 text-white focus:outline-none focus:border-holiday-gold"
                placeholder="Price"
                min="0"
                step="0.01"
              />
              <DollarSign className="absolute left-4 top-2.5 w-5 h-5 text-holiday-gold" />
            </div>
            <label className="flex items-center gap-2 text-holiday-silver">
              <input
                type="checkbox"
                checked={prices[marketplace]?.inStock ?? true}
                onChange={(e) => handleStockChange(marketplace, e.target.checked)}
                className="rounded border-gray-700 bg-gray-800 text-holiday-gold focus:ring-holiday-gold"
              />
              In Stock
            </label>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-xl border border-holiday-gold/20 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <ShoppingCart className="w-8 h-8 text-holiday-gold" />
          <h2 className="text-2xl font-bold text-white">Share Your Killer Item</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-holiday-silver mb-2 text-sm">
              Product Name *
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 pr-24 text-white focus:outline-none focus:border-holiday-gold"
                placeholder="What's this amazing product called?"
                required
              />
              <button
                type="button"
                onClick={handleSearch}
                disabled={isSearching}
                className="absolute right-2 top-2 bg-holiday-gold hover:bg-holiday-gold/90 text-gray-900 px-3 py-1 rounded-lg flex items-center gap-1 transition-colors"
              >
                {isSearching ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">Search</span>
              </button>
            </div>
          </div>

          <SearchResults
            results={searchResults}
            onSelect={selectSearchResult}
            isLoading={isSearching}
          />

          <div>
            <label className="block text-holiday-silver mb-2 text-sm">
              Why do you recommend it? *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-holiday-gold h-24"
              placeholder="Tell us why this product is a must-have..."
              required
            />
          </div>

          <div className="space-y-4">
            <label className="block text-holiday-silver mb-2 text-sm">
              Where can people buy it? (Add at least one link)
            </label>
            
            {Object.keys(formData.marketplaceUrls).length === 0 ? (
              <p className="text-holiday-silver/70 text-sm italic">
                Search for a product above or enter marketplace links manually below
              </p>
            ) : null}
            
            {Object.keys(formData.marketplaceUrls).map(marketplace => 
              renderMarketplaceInput(marketplace)
            )}
            
            <button
              type="button"
              onClick={() => {
                const marketplace = `store${Object.keys(formData.marketplaceUrls).length + 1}`;
                setFormData(prev => ({
                  ...prev,
                  marketplaceUrls: {
                    ...prev.marketplaceUrls,
                    [marketplace]: ''
                  }
                }));
              }}
              className="text-holiday-gold hover:text-holiday-gold/80 text-sm font-medium"
            >
              + Add another store
            </button>
          </div>

          {findLowestPrice() && (
            <div className="bg-gray-800/50 rounded-xl p-4 border border-holiday-gold/20">
              <div className="flex items-center gap-2 text-holiday-gold">
                <DollarSign className="w-5 h-5" />
                <span className="font-semibold">Best Price:</span>
                <span>
                  ${findLowestPrice()?.price.toFixed(2)} at {findLowestPrice()?.marketplace}
                </span>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-holiday-gold hover:bg-holiday-gold/90 text-gray-900 font-semibold px-6 py-3 rounded-xl transition-colors"
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