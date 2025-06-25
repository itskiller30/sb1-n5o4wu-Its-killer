import React from 'react';
import { CheckCircle, Star, TrendingDown, Users, Award, Shield, Heart, Target, Zap } from 'lucide-react';

const TrustBadges: React.FC = () => {
  const mainStats = [
    {
      icon: <Zap className="w-8 h-8 text-holiday-gold" />,
      value: '11+',
      label: 'Only Killer Ratings',
      description: 'Every product exceeds expectations',
      color: 'holiday-gold'
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-holiday-green" />,
      value: '100%',
      label: 'Community Approved',
      description: 'Every product personally tested',
      color: 'holiday-green'
    },
    {
      icon: <TrendingDown className="w-8 h-8 text-holiday-green" />,
      value: '85%',
      label: 'Lower Returns',
      description: 'vs traditional e-commerce',
      color: 'holiday-green'
    },
    {
      icon: <Users className="w-8 h-8 text-holiday-silver" />,
      value: '52K+',
      label: 'itsKiller Members',
      description: 'Growing conscious community',
      color: 'holiday-silver'
    }
  ];

  const trustIndicators = [
    {
      icon: <Award className="w-6 h-6 text-holiday-gold" />,
      title: 'itsKiller Certified',
      description: 'Products tested by our expert community'
    },
    {
      icon: <Shield className="w-6 h-6 text-holiday-green" />,
      title: 'Verified Reviews',
      description: 'Only from verified purchasers and users'
    },
    {
      icon: <Heart className="w-6 h-6 text-holiday-red" />,
      title: 'Personal Stories',
      description: 'Real experiences from real people'
    },
    {
      icon: <Target className="w-6 h-6 text-holiday-silver" />,
      title: 'Quality Focus',
      description: 'Curated selection over endless options'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Main Stats */}
      <div className="bg-gradient-to-r from-gray-900/60 via-gray-800/40 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-holiday-gold/20">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            The <span className="text-holiday-gold">itsKiller</span> Difference
          </h2>
          <p className="text-holiday-silver">Real metrics from our conscious shopping community</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {mainStats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className={`flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div className={`text-3xl font-bold text-${stat.color} mb-2 group-hover:scale-105 transition-transform duration-300`}>
                {stat.value}
              </div>
              <div className="text-sm font-medium text-holiday-snow mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-holiday-silver/70">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trustIndicators.map((indicator, index) => (
          <div key={index} className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-holiday-gold/10 hover:border-holiday-gold/30 transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-3">
              {indicator.icon}
              <h3 className="text-sm font-semibold text-white group-hover:text-holiday-gold transition-colors">
                {indicator.title}
              </h3>
            </div>
            <p className="text-xs text-holiday-silver/80 group-hover:text-holiday-silver transition-colors">
              {indicator.description}
            </p>
          </div>
        ))}
      </div>

      {/* Value Proposition */}
      <div className="bg-gradient-to-br from-holiday-pine via-gray-900 to-black rounded-2xl p-8 border border-holiday-gold/20">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="bg-holiday-gold/20 p-4 rounded-full border border-holiday-gold/30">
              <Zap className="w-8 h-8 text-holiday-gold" />
            </div>
            <h2 className="text-3xl font-bold text-white">
              The <span className="text-holiday-gold">itsKiller</span> Promise
            </h2>
          </div>
          
          <p className="text-xl text-holiday-silver mb-8 max-w-4xl mx-auto leading-relaxed">
            Every product in our <strong className="text-holiday-gold">itsKiller</strong> collection has been personally 
            tested by our expert community or verified by trusted members. We stand behind every recommendation 
            with our reputation and your satisfaction.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/30 rounded-xl px-4 py-3 border border-holiday-gold/20">
              <span className="text-holiday-gold font-bold text-sm">✓ Personal Testing</span>
            </div>
            <div className="bg-black/30 rounded-xl px-4 py-3 border border-holiday-green/20">
              <span className="text-holiday-green font-bold text-sm">✓ Community Verified</span>
            </div>
            <div className="bg-black/30 rounded-xl px-4 py-3 border border-holiday-red/20">
              <span className="text-holiday-red font-bold text-sm">✓ Honest Reviews</span>
            </div>
            <div className="bg-black/30 rounded-xl px-4 py-3 border border-holiday-silver/20">
              <span className="text-holiday-silver font-bold text-sm">✓ Quality Guarantee</span>
            </div>
          </div>

          <div className="mt-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-holiday-gold/20 to-holiday-green/20 backdrop-blur-sm px-6 py-3 rounded-full border border-holiday-gold/30">
              <Zap className="w-5 h-5 text-holiday-gold" />
              <span className="text-holiday-gold font-bold">
                Join the <span className="text-holiday-green">itsKiller</span> community today
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;