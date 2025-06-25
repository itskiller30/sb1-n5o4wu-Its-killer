import React, { useState } from 'react';
import { X, Share2, Star, DollarSign, Link, Upload } from 'lucide-react';
import { Product } from '../types';
import toast from 'react-hot-toast';

interface SubmissionFormProps {
  onSubmit: (submission: Omit<Product, 'id'>) => void;
  onClose: () => void;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    personalReview: '',
    category: '',
    price: '',
    whereToFind: '',
    whyRecommend: '',
    marketplaceUrls: {} as Record<string, string>
  });

  const categories = [
    'Tech Essentials', 'Home & Kitchen', 'Outdoor Gear', 'Office Must-Haves',
    'Travel Accessories', 'Fitness Equipment', 'Smart Home', 'Fashion',
    'Books & Learning', 'Pet Essentials', 'Beauty & Wellness'
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.personalReview || !formData.category) {
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
      tags: [],
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      marketplaceLinks: formData.marketplaceUrls,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    toast.success('Thank you for sharing! Our team will review your submission.');
    onSubmit(submission);
  };

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-2xl border border-slate-700 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-full">
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Share a Product You Love</h2>
            <p className="text-slate-400">Help others discover something amazing</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
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
                placeholder="What's this amazing product?"
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

          {/* Description */}
          <div>
            <label className="block text-slate-300 mb-2 text-sm font-medium">
              Product Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 h-24"
              placeholder="Brief description of what this product is..."
              required
            />
          </div>

          {/* Personal Review */}
          <div>
            <label className="block text-slate-300 mb-2 text-sm font-medium">
              Your Personal Review *
            </label>
            <textarea
              name="personalReview"
              value={formData.personalReview}
              onChange={handleChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 h-32"
              placeholder="Why do you love this product? How has it improved your life? Be specific about your experience..."
              required
            />
          </div>

          {/* Price and Where to Find */}
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
                placeholder="Amazon, local store, brand website..."
              />
            </div>
          </div>

          {/* Purchase Links */}
          <div>
            <label className="block text-slate-300 mb-2 text-sm font-medium">
              Purchase Links (Optional)
            </label>
            <div className="space-y-3">
              {Object.entries(formData.marketplaceUrls).map(([key, url]) => (
                <div key={key} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => updateMarketplaceUrl(key, e.target.value)}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 pl-10 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      placeholder="https://..."
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
                <Plus className="w-4 h-4" />
                Add purchase link
              </button>
            </div>
          </div>

          {/* Submission Guidelines */}
          <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
            <h4 className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" />
              Submission Guidelines
            </h4>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>• Only share products you personally own and use</li>
              <li>• Be honest about both pros and cons</li>
              <li>• Include specific details about your experience</li>
              <li>• Our team will review before publishing</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-4">
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
              Submit for Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmissionForm;