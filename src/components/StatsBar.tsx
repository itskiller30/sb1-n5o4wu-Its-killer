import React from 'react';
import { TrendingUp, Users, Award, Zap, Leaf } from 'lucide-react';

interface StatsBarProps {
  totalProducts: number;
  totalUsers: number;
  wasteReduced: string;
  avgRating: number;
}

const StatsBar: React.FC<StatsBarProps> = ({ 
  totalProducts, 
  totalUsers, 
  wasteReduced, 
  avgRating 
}) => {
  const stats = [
    {
      icon: <Award className="w-5 h-5 text-holiday-gold" />,
      value: totalProducts.toLocaleString(),
      label: 'Killer Products',
      color: 'holiday-gold'
    },
    {
      icon: <Users className="w-5 h-5 text-holiday-green" />,
      value: `${Math.floor(totalUsers / 1000)}K+`,
      label: 'Community Members',
      color: 'holiday-green'
    },
    {
      icon: <Leaf className="w-5 h-5 text-holiday-green" />,
      value: wasteReduced,
      label: 'Waste Reduced',
      color: 'holiday-green'
    },
    {
      icon: <Zap className="w-5 h-5 text-holiday-gold" />,
      value: avgRating.toFixed(1),
      label: 'Avg Rating',
      color: 'holiday-gold'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-gray-900/50 via-gray-800/30 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center group">
            <div className="flex items-center justify-center mb-2">
              {stat.icon}
            </div>
            <div className={`text-2xl font-bold text-${stat.color} mb-1 group-hover:scale-110 transition-transform duration-300`}>
              {stat.value}
            </div>
            <div className="text-sm text-holiday-silver">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBar;