import React, { useState } from 'react';
import { X, Star, DollarSign, Loader2, CheckCircle } from 'lucide-react';
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
    category: '',
    price: '',
    productUrl: '',
    personalReview: ''
  });

  const categories = [
    'Tech Essentials', 'Home & Kitchen', 'Outdoor Gear', 'Office Must-Haves',
    'Travel Accessories', 'Fitness Equipment', 'Smart Home', 'Fashion',
    'Books & Learning', 'Pet Essentials', 'Beauty & Wellness', 'Tools & Hardware'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.description || !formData.personalReview) {
      toast.error('Please fill in all required fields');
      return;
    }

    const submission: Omit<Product, 'id'> = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      rating: 10 + Math.random() * 2,
      reviews: Math.floor(Math.random() * 100) + 10,
      category: formData.category,
      tags: ['Community Pick', 'Peer Recommended'],
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      marketplaceLinks: formData.productUrl ? { amazon: formData.productUrl } : {},
      affiliateLinks: {},
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    toast.success('Thank you for sharing! Your recommendation will appear after approval.');
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
      <div className="bg-slate-800 rounded-lg p-6 w-full max-w-2xl border border-white/10 relative max-h-[90vh] overflow-y-auto">
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
            <h2 className="text-2xl font-bold text-white">Recommend a Product</h2>
            <p className="text-slate-400">Share what you love with the community</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-slate-300 mb-2 text-sm font-medium">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
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
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-2 text-sm font-medium">
                  Price
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 pl-8 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                  <DollarSign className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-300 mb-2 text-sm font-medium">
                  Product Link (optional)
                </label>
                <input
                  type="url"
                  name="productUrl"
                  value={formData.productUrl}
                  onChange={handleChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  placeholder="https://www.amazon.com/..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-300 mb-2 text-sm font-medium">
                  What it is *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 h-20"
                  placeholder="Brief description of the product..."
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-300 mb-2 text-sm font-medium">
                  Why you recommend it *
                </label>
                <textarea
                  name="personalReview"
                  value={formData.personalReview}
                  onChange={handleChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 h-32"
                  placeholder="Share your experience with this product and why others should consider it..."
                  required
                />
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
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
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