import React from 'react';
import { Star, Award, TrendingUp, Users } from 'lucide-react';
import StatCard from './StatCard';

interface CommunityStatsProps {
  totalRecommendations: number;
}

const CommunityStats: React.FC<CommunityStatsProps> = ({ totalRecommendations }) => {
  const stats = [
    {
      icon: <Star className="w-8 h-8 text-holiday-gold fill-holiday-gold" />,
      value: '11+ Only',
      label: 'Exceptional Ratings',
      description: 'Every product exceeds the 10/10 standard'
    },
    {
      icon: <Award className="w-8 h-8 text-holiday-green" />,
      value: totalRecommendations.toLocaleString(),
      label: 'Verified Products',
      description: 'Community-tested and approved items'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-holiday-red" />,
      value: 'Best Prices',
      label: 'Price Comparison',
      description: 'We find the lowest prices across all stores'
    },
    {
      icon: <Users className="w-8 h-8 text-holiday-silver" />,
      value: '50K+',
      label: 'Happy Customers',
      description: 'Join thousands who trust our recommendations'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          description={stat.description}
        />
      ))}
    </div>
  );
};

export default CommunityStats;