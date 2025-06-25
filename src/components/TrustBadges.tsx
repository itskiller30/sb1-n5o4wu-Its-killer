import React from 'react';
import { CheckCircle, Star, TrendingDown, Users, Award, Shield, Heart, Target } from 'lucide-react';

const TrustBadges: React.FC = () => {
  const mainStats = [
    {
      icon: <CheckCircle className="w-8 h-8 text-emerald-400" />,
      value: '100%',
      label: 'Staff Approved',
      description: 'Every product personally tested',
      color: 'emerald'
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-400" />,
      value: '11.8',
      label: 'Avg Rating',
      description: 'Consistently exceeds expectations',
      color: 'yellow'
    },
    {
      icon: <TrendingDown className="w-8 h-8 text-green-400" />,
      value: '92%',
      label: 'Lower Returns',
      description: 'vs traditional e-commerce',
      color: 'green'
    },
    {
      icon: <Users className="w-8 h-8 text-blue-400" />,
      value: '2.5K+',
      label: 'Trusted Members',
      description: 'Growing conscious community',
      color: 'blue'
    }
  ];

  const trustIndicators = [
    {
      icon: <Award className="w-6 h-6 text-emerald-400" />,
      title: 'Expert Curation',
      description: 'Products tested by industry professionals'
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-400" />,
      title: 'Verified Reviews',
      description: 'Only from verified purchasers and users'
    },
    {
      icon: <Heart className="w-6 h-6 text-red-400" />,
      title: 'Personal Stories',
      description: 'Real experiences from real people'
    },
    {
      icon: <Target className="w-6 h-6 text-purple-400" />,
      title: 'Quality Focus',
      description: 'Curated selection over endless options'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Main Stats */}
      <div className="bg-gradient-to-r from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/30">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Trusted by Thousands</h2>
          <p className="text-slate-400">Real metrics from our conscious shopping community</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {mainStats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className={`flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">
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

      {/* Trust Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trustIndicators.map((indicator, index) => (
          <div key={index} className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/70 transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-3">
              {indicator.icon}
              <h3 className="text-sm font-semibold text-white group-hover:text-slate-200 transition-colors">
                {indicator.title}
              </h3>
            </div>
            <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
              {indicator.description}
            </p>
          </div>
        ))}
      </div>

      {/* Value Proposition */}
      <div className="bg-gradient-to-br from-emerald-900/20 via-slate-800/40 to-teal-900/20 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="bg-emerald-500/20 p-3 rounded-full">
              <Shield className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">The TrustedPicks Promise</h2>
          </div>
          
          <p className="text-lg text-slate-300 mb-6 max-w-3xl mx-auto">
            Every product in our collection has been personally tested by our expert staff or verified 
            by trusted community members. We stand behind every recommendation with our reputation.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-slate-800/50 rounded-lg px-4 py-2 border border-emerald-500/30">
              <span className="text-emerald-400 font-semibold text-sm">✓ Personal Testing</span>
            </div>
            <div className="bg-slate-800/50 rounded-lg px-4 py-2 border border-blue-500/30">
              <span className="text-blue-400 font-semibold text-sm">✓ Community Verified</span>
            </div>
            <div className="bg-slate-800/50 rounded-lg px-4 py-2 border border-teal-500/30">
              <span className="text-teal-400 font-semibold text-sm">✓ Honest Reviews</span>
            </div>
            <div className="bg-slate-800/50 rounded-lg px-4 py-2 border border-purple-500/30">
              <span className="text-purple-400 font-semibold text-sm">✓ Quality Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;