import React, { useState } from 'react';
import { X, Share2, Star, DollarSign, Link, Upload, Heart, CheckCircle, AlertCircle } from 'lucide-react';
import { Product } from '../types';
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
  const totalSteps = 3;

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

  const addMarketplaceUrl = () => {
    const marketplace = `store${Object.keys(formData.marketplaceUrls).length + 1}`;
    setFormData(prev => ({
      ...prev,
      marketplaceUrls: { ...prev.marketplaceUrls, [marketplace]: '' }
    }));
  };

  const updateMarketplaceUrl = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      marketplaceUrls: { ...prev.marketplaceUrls, [key]: value }
    }));
  };

  const removeMarketplaceUrl = (key: string) => {
    const { [key]: removed, ...rest } = formData.marketplaceUrls;
    setFormData(prev => ({ ...prev, marketplaceUrls: rest }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.name && formData.category && formData.description);
      case 2:
        return !!(formData.personalStory && formData.whyTrusted && formData.howLongUsed);
      case 3:
        return true; // Optional step
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

    const submission: Omit<Product, 'id'> = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      rating: 10 + Math.random() * 2, // Random rating between 10-12
      reviews: Math.floor(Math.random() * 100) + 10,
      category: formData.category,
      tags: ['Community Pick', 'Peer Reviewed'],
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      marketplaceLinks: formData.marketplaceUrls,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    toast.success('Thank you for sharing your trusted item! Our team will review it soon.');
    onSubmit(submission);
  };

  if (hasSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50">
        <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-md border border-emerald-500/30 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-white mb-4">Already Submitted!</h2>
          <p className="text-slate-300 mb-6">
            You've already shared your trusted item with our community. 
            We're reviewing it and will publish it soon!
          </p>
          <button
            onClick={onClose}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-3xl border border-emerald-500/30 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-full">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Share Your Most Trusted Item</h2>
            <p className="text-slate-400">Help others discover something life-changing</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-emerald-400">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Basic Product Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">🎯</div>
                <h3 className="text-xl font-bold text-white">Tell us about your trusted item</h3>
                <p className="text-slate-400">What's the product you can't live without?</p>
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
                <div className="text-4xl mb-2">💭</div>
                <h3 className="text-xl font-bold text-white">Share your personal experience</h3>
                <p className="text-slate-400">This is what makes your recommendation valuable</p>
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

          {/* Step 3: Purchase Links (Optional) */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">🔗</div>
                <h3 className="text-xl font-bold text-white">Add purchase links (optional)</h3>
                <p className="text-slate-400">Help others find where to buy this product</p>
              </div>

              <div className="space-y-3">
                {Object.entries(formData.marketplaceUrls).map(([key, url]) => (
                  <div key={key} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => updateMarketplaceUrl(key, e.target.value)}
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 pl-10 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        placeholder="https://amazon.com/product-link..."
                      />
                      <Link className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMarketplaceUrl(key)}
                      className="px-3 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addMarketplaceUrl}
                  className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center gap-2"
                >
                  <span className="text-lg">+</span>
                  Add purchase link
                </button>
              </div>

              {/* Final Guidelines */}
              <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                <h4 className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Ready to Submit
                </h4>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• Your submission will be reviewed by our team</li>
                  <li>• We'll verify the product and your experience</li>
                  <li>• Once approved, it will appear in our community section</li>
                  <li>• Remember: only one submission per person</li>
                </ul>
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
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg"
                >
                  Submit for Review
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