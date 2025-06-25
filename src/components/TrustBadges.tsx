import React from 'react';
import { CheckCircle, Star, TrendingDown, Users } from 'lucide-react';

const TrustBadges: React.FC = () => {
  const stats = [
    {
      icon: <CheckCircle className="w-6 h-6 text-emerald-400" />,
      value: '100%',
      label: 'Staff Approved',
      description: 'Every product personally tested'
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-400" />,
      value: '11.8',
      label: 'Avg Rating',
      description: 'Consistently exceeds expectations'
    },
    {
      icon: <TrendingDown className="w-6 h-6 text-green-400" />,
      value: '92%',
      label: 'Lower Returns',
      description: 'vs traditional e-commerce'
    },
    {
      icon: <Users className="w-6 h-6 text-blue-400" />,
      value: '2.5K+',
      label: 'Trusted Members',
      description: 'Growing conscious community'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-slate-800/40 via-slate-700/20 to-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center group">
            <div className="flex items-center justify-center mb-3">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">
              {stat.value}
            </div>
            <div className="text-sm font-medium text-slate-300 mb-1">
              {stat.label}
            </div>
            <div className="text-xs text-slate-500">
              {stat.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBadges;