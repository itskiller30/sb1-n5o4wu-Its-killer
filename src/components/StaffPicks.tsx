import React from 'react';
import { Award, User, Calendar, Star } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface StaffPicksProps {
  products: Product[];
}

const StaffPicks: React.FC<StaffPicksProps> = ({ products }) => {
  const staffMembers = [
    { name: 'Sarah Chen', role: 'Tech Curator', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
    { name: 'Marcus Rodriguez', role: 'Lifestyle Expert', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
    { name: 'Emily Watson', role: 'Home & Kitchen', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
    { name: 'David Kim', role: 'Outdoor Gear', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <Award className="w-8 h-8 text-emerald-500" />
          <h2 className="text-3xl font-bold text-white">Staff Curated Collection</h2>
        </div>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Our expert team personally tests, uses, and stands behind every product in this collection. 
          These aren't just recommendations—they're products we use in our own lives.
        </p>
      </div>

      {/* Staff Team */}
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4 text-center">Meet Our Curators</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {staffMembers.map((member, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-16 h-16 rounded-full mx-auto border-2 border-emerald-500/50 group-hover:border-emerald-400 transition-colors"
                />
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1">
                  <User className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="text-sm font-medium text-white">{member.name}</div>
              <div className="text-xs text-slate-400">{member.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Staff Pick */}
      {products.length > 0 && (
        <div className="bg-gradient-to-br from-emerald-900/20 via-slate-800/30 to-teal-900/20 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-500/20 p-3 rounded-full">
              <Star className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">This Week's Featured Pick</h3>
              <p className="text-emerald-400 text-sm">Personally recommended by Sarah Chen</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-2xl font-bold text-white mb-4">{products[0].name}</h4>
              <p className="text-slate-300 mb-4 leading-relaxed">{products[0].description}</p>
              
              <div className="bg-slate-800/50 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-3">
                  <img
                    src={staffMembers[0].avatar}
                    alt={staffMembers[0].name}
                    className="w-10 h-10 rounded-full border border-emerald-500/50"
                  />
                  <div>
                    <div className="text-sm font-medium text-white">{staffMembers[0].name}</div>
                    <div className="text-xs text-emerald-400 mb-2">{staffMembers[0].role}</div>
                    <p className="text-sm text-slate-300 italic">
                      "I've been using this for 6 months and it's completely transformed my daily routine. 
                      The build quality is exceptional and it delivers exactly what it promises."
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Added 2 weeks ago</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{products[0].rating}/10 rating</span>
                </div>
              </div>
            </div>
            
            <div className="lg:max-w-sm">
              <ProductCard product={products[0]} featured />
            </div>
          </div>
        </div>
      )}

      {/* All Staff Picks */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6">All Staff Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.slice(1).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffPicks;