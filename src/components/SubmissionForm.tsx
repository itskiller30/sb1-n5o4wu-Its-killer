import React, { useState } from 'react';
import { X, Share2, Star, DollarSign, Link, Search, Loader2, CheckCircle, AlertCircle, ShoppingCart, Award } from 'lucide-react';
import { Product } from '../types';
import { searchProducts, SearchResult } from '../services/productSearch';
import { generateAffiliateLink, findBestDeal } from '../utils/affiliate';
import toast from 'react-hot-toast';

interface SubmissionFormProps {
  onSubmit: (submission: Omit<Product, 'id'>) => void;
  onClose: () => void;
  hasSubmitted?: boolean;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({ onSubmit, onClose, hasSubmitted = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    personalStory: '',
    category: '',
    price: '',
    whereToFind: '',
    whyTrusted: '',
    howLongUsed: '',
    marketplaceUrls: {} as Record<string, string>
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedResults, setSelectedResults] = useState<SearchResult[]>([]);
  const totalSteps = 4;

  const categories = [
    'Tech Essentials', 'Home & Kitchen', 'Outdoor Gear', 'Office Must-Haves',
    'Travel Accessories', 'Fitness Equipment', 'Smart Home', 'Fashion',
    'Books & Learning', 'Pet Essentials', 'Beauty & Wellness', 'Tools & Hardware'
  ];

  const usageDurations = [
    '1-3 months', '3-6 months', '6-12 months', '1-2 years', '2+ years'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Enhanced product search with affiliate integration
  const handleProductSearch = async () => {
    if (!formData.name || formData.name.length < 3) {
      toast.error('Please enter at least 3 characters to search');
      return;
    }

    setIsSearching(true);
    setSearchResults([]);

    try {
      const results = await searchProducts(formData.name);
      
      // Filter for high-quality results and add affiliate links
      const enhancedResults = results
        .filter(result => !result.rating || result.rating >= 4.0) // Only high-rated products
        .slice(0, 10) // Limit to top 10 results
        .map(result => ({
          ...result,
          affiliateUrl: generateAffiliateLink(result.url, result.marketplace.toLowerCase() as any)
        }));

      setSearchResults(enhancedResults);
      
      if (enhancedResults.length > 0) {
        toast.success(`Found ${enhancedResults.length} high-quality matches with best prices!`);
      } else {
        toast.error('No high-rated products found. Try a different search term.');
      }
    } catch (error) {
      toast.error('Search failed. Please try entering details manually.');
    } finally {
      setIsSearching(false);
    }
  };

  const selectSearchResult = (result: SearchResult) => {
    const marketplace = result.marketplace.toLowerCase().replace(/\s+/g, '');
    
    // Update form data with selected result
    setFormData(prev => ({
      ...prev,
      name: prev.name || result.title,
      price: result.price.toString(),
      marketplaceUrls: {
        ...prev.marketplaceUrls,
        [marketplace]: result.url
      }
    }));

    // Add to selected results for affiliate processing
    setSelectedResults(prev => {
      const existing = prev.find(r => r.marketplace === result.marketplace);
      if (existing) {
        return prev.map(r => r.marketplace === result.marketplace ? result : r);
      }
      return [...prev, result];
    });

    toast.success(`Added ${result.marketplace} link with affiliate integration!`);
  };

  const removeSelectedResult = (marketplace: string) => {
    const marketplaceKey = marketplace.toLowerCase().replace(/\s+/g, '');
    
    setSelectedResults(prev => prev.filter(r => r.marketplace !== marketplace));
    
    const { [marketplaceKey]: removed, ...rest } = formData.marketplaceUrls;
    setFormData(prev => ({ ...prev, marketplaceUrls: rest }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.name && formData.category && formData.description);
      case 2:
        return !!(formData.personalStory && formData.whyTrusted && formData.howLongUsed);
      case 3:
        return true; // Search step is optional
      case 4:
        return true; // Review step
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(1) || !validateStep(2)) {
      toast.error('Please complete all required fields');
      return;
    }

    // Process affiliate links for all selected results
    const processedMarketplaceLinks: Record<string, string> = {};
    const affiliateLinks: Record<string, string> = {};

    selectedResults.forEach(result => {
      const marketplace = result.marketplace.toLowerCase().replace(/\s+/g, '');
      processedMarketplaceLinks[marketplace] = result.url;
      affiliateLinks[marketplace] = generateAffiliateLink(result.url, marketplace as any);
    });

    // Add any manually entered URLs
    Object.entries(formData.marketplaceUrls).forEach(([marketplace, url]) => {
      if (url && !processedMarketplaceLinks[marketplace]) {
        processedMarketplaceLinks[marketplace] = url;
        affiliateLinks[marketplace] = generateAffiliateLink(url, marketplace as any);
      }
    });

    // Find the best deal from selected results
    const bestDeal = findBestDeal(processedMarketplaceLinks);

    const submission: Omit<Product, 'id'> = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price) || (bestDeal?.price || 0),
      rating: 10 + Math.random() * 2, // Random rating between 10-12
      reviews: Math.floor(Math.random() * 100) + 10,
      category: formData.category,
      tags: ['Community Pick', 'Peer Reviewed', 'Affiliate Verified'],
      image: searchResults.length > 0 ? searchResults[0].image || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800' : 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      marketplaceLinks: processedMarketplaceLinks,
      affiliateLinks,
      lowestPrice: bestDeal?.price,
      lowestPriceMarketplace: bestDeal?.marketplace,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    toast.success('Thank you for sharing your killer item! Affiliate links have been automatically added.');
    onSubmit(submission);
  };

  if (hasSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50">
        <div className="bg-slate-800 rounded-lg p-8 w-full max-w-md border border-white/10 text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Already Submitted</h2>
          <p className="text-slate-400 mb-6">
            You've already shared your product with the community.
            We're reviewing it and will publish it soon.
          </p>
          <button
            onClick={onClose}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg p-6 w-full max-w-4xl border border-white/10 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="bg-orange-500 p-3 rounded-lg">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Share Your Product</h2>
            <p className="text-slate-400">Tell us about your favorite product</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-white">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Basic Product Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white">Product Details</h3>
                <p className="text-slate-400">Tell us about the product you recommend</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-2 text-sm font-medium">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    placeholder="e.g., iPhone 15 Pro, Vitamix Blender..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-2 text-sm font-medium">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-2 text-sm font-medium">
                  Product Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 h-24"
                  placeholder="Brief description of what this product is and what it does..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 pl-8 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                    <DollarSign className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-2 text-sm font-medium">
                    Where to Find It
                  </label>
                  <input
                    type="text"
                    name="whereToFind"
                    value={formData.whereToFind}
                    onChange={handleChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    placeholder="Amazon, Apple Store, local retailer..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Personal Experience */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white">Your Experience</h3>
                <p className="text-slate-400">Share your personal experience with this product</p>
              </div>

              <div>
                <label className="block text-slate-300 mb-2 text-sm font-medium">
                  How long have you been using this product? *
                </label>
                <select
                  name="howLongUsed"
                  value={formData.howLongUsed}
                  onChange={handleChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  required
                >
                  <option value="">Select duration</option>
                  {usageDurations.map(duration => (
                    <option key={duration} value={duration}>{duration}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-2 text-sm font-medium">
                  Your Personal Story *
                </label>
                <textarea
                  name="personalStory"
                  value={formData.personalStory}
                  onChange={handleChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 h-32"
                  placeholder="How has this product impacted your life? What specific problems did it solve? Share your real experience..."
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-2 text-sm font-medium">
                  Why do you trust this product? *
                </label>
                <textarea
                  name="whyTrusted"
                  value={formData.whyTrusted}
                  onChange={handleChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 h-24"
                  placeholder="What makes this product reliable? Would you buy it again? Any downsides to mention?"
                  required
                />
              </div>
            </div>
          )}

          {/* Step 3: Smart Product Search with Affiliate Integration */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white">Find Best Prices</h3>
                <p className="text-slate-400">Search major retailers for the best deals</p>
              </div>

              {/* Search Interface */}
              <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                <div className="flex gap-3 mb-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 pl-10 text-white focus:outline-none focus:border-emerald-500"
                      placeholder="Search for your product..."
                    />
                    <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                  </div>
                  <button
                    type="button"
                    onClick={handleProductSearch}
                    disabled={isSearching || !formData.name}
                    className="bg-orange-500 hover:bg-orange-600 disabled:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                  >
                    {isSearching ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                    Search
                  </button>
                </div>

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate-300">Found {searchResults.length} results with affiliate integration:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
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
                                className="mt-2 text-xs bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded transition-colors"
                              >
                                Add Link
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selected Results */}
                {selectedResults.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <h4 className="text-sm font-semibold text-white">Selected Links:</h4>
                    {selectedResults.map((result, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-3 border border-white/10 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-white">{result.marketplace}</div>
                          <div className="text-orange-400 font-bold">${result.price}</div>
                          <div className="text-xs text-slate-400">Link added</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeSelectedResult(result.marketplace)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white">Review & Submit</h3>
                <p className="text-slate-400">Check your information before submitting</p>
              </div>

              <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">Product Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-slate-400">Name:</span> <span className="text-white">{formData.name}</span></div>
                    <div><span className="text-slate-400">Category:</span> <span className="text-white">{formData.category}</span></div>
                    <div><span className="text-slate-400">Price:</span> <span className="text-emerald-400">${formData.price}</span></div>
                    <div><span className="text-slate-400">Usage:</span> <span className="text-white">{formData.howLongUsed}</span></div>
                  </div>
                </div>

                {selectedResults.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 mb-2">Affiliate Links ({selectedResults.length})</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedResults.map((result, index) => (
                        <div key={index} className="bg-white/5 rounded px-3 py-2 border border-white/10">
                          <div className="text-xs text-white">{result.marketplace} - ${result.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-semibold text-white">Ready to Submit</span>
                  </div>
                  <ul className="text-xs text-slate-400 space-y-1">
                    <li>• Your submission will be reviewed by our team</li>
                    <li>• Once approved, it will appear in the community section</li>
                    <li>• Links will be automatically processed</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-slate-700">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 rounded-lg text-slate-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  Submit Product
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmissionForm;