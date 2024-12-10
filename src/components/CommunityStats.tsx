import React from 'react';
import { ThumbsUp, Share2, Heart } from 'lucide-react';
import StatCard from './StatCard';

interface CommunityStatsProps {
  totalRecommendations: number;
}

const CommunityStats: React.FC<CommunityStatsProps> = ({ totalRecommendations }) => {
  const stats = [
    {
      icon: <ThumbsUp className="w-8 h-8 text-holiday-gold" />,
      value: totalRecommendations.toLocaleString(),
      label: 'Trusted Recommendations',
      description: 'Carefully reviewed and approved by our team'
    },
    {
      icon: <Share2 className="w-8 h-8 text-holiday-red" />,
      value: 'Share Yours',
      label: 'Help Others Discover',
      description: 'Your experience could help someone else'
    },
    {
      icon: <Heart className="w-8 h-8 text-holiday-green" />,
      value: 'Life-Changing',
      label: 'Quality Over Quantity',
      description: 'Only the most impactful products make the cut'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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