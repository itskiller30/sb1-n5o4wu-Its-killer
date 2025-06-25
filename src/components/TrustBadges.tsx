import React from 'react';
import { CheckCircle, Star, TrendingDown, Users, Award, Shield, Heart, Target, Zap, Crown } from 'lucide-react';

const TrustBadges: React.FC = () => {
  const mainStats = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      value: '11+',
      label: 'Only Killer Ratings',
      description: 'Every product exceeds expectations',
      color: 'yellow-400',
      bgColor: 'yellow-500/20'
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-emerald-400" />,
      value: '100%',
      label: 'Community Approved',
      description: 'Every product personally tested',
      color: 'emerald-400',
      bgColor: 'emerald-500/20'
    },
    {
      icon: <TrendingDown className="w-8 h-8 text-green-400" />,
      value: '85%',
      label: 'Lower Returns',
      description: 'vs traditional e-commerce',
      color: 'green-400',
      bgColor: 'green-500/20'
    },
    {
      icon: <Users className="w-8 h-8 text-blue-400" />,
      value: '52K+',
      label: 'itsKiller Members',
      description: 'Growing conscious community',
      color: 'blue-400',
      bgColor: 'blue-500/20'
    }
  ];

  const trustIndicators = [
    {
      icon: <Award className="w-6 h-6 text-yellow-400" />,
      title: 'Community Tested',
      description: 'Products tested by our expert community',
      bgColor: 'yellow-500/10',
      borderColor: 'yellow-500/20'
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-400" />,
      title: 'Verified Reviews',
      description: 'Only from verified purchasers and users',
      bgColor: 'emerald-500/10',
      borderColor: 'emerald-500/20'
    },
    {
      icon: <Heart className="w-6 h-6 text-red-400" />,
      title: 'Personal Stories',
      description: 'Real experiences from real people',
      bgColor: 'red-500/10',
      borderColor: 'red-500/20'
    },
    {
      icon: <Target className="w-6 h-6 text-blue-400" />,
      title: 'Quality Focus',
      description: 'Curated selection over endless options',
      bgColor: 'blue-500/10',
      borderColor: 'blue-500/20'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Main Stats with enhanced itsKiller branding */}
      <div className="bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/30 shadow-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-8 h-8 text-yellow-400 animate-pulse" />
            <h2 className="text-3xl font-bold text-white">
              The <span className="text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text">itsKiller</span> Difference
            </h2>
            <Crown className="w-8 h-8 text-yellow-400 animate-pulse" />
          </div>
          <p className="text-slate-300 text-lg">Real metrics from our conscious shopping community</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {mainStats.map((stat, index) => (
            <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
              <div className={`bg-${stat.bgColor} rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-${stat.color}/30`}>
                {stat.icon}
              </div>
              <div className={`text-4xl font-black text-${stat.color} mb-2 group-hover:scale-105 transition-transform duration-300`}>
                {stat.value}
              </div>
              <div className="text-sm font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                {stat.label}
              </div>
              <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Indicators with itsKiller emphasis */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trustIndicators.map((indicator, index) => (
          <div key={index} className={`bg-${indicator.bgColor} backdrop-blur-sm rounded-xl p-6 border border-${indicator.borderColor} hover:border-emerald-400/40 transition-all duration-300 group hover:scale-105`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`bg-${indicator.bgColor} p-2 rounded-full group-hover:scale-110 transition-transform`}>
                {indicator.icon}
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                {indicator.title}
              </h3>
            </div>
            <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
              {indicator.description}
            </p>
          </div>
        ))}
      </div>

      {/* Enhanced Value Proposition - No Promises */}
      <div className="bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/30 shadow-2xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 p-4 rounded-full border border-emerald-400/30">
              <Zap className="w-10 h-10 text-emerald-400" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              The <span className="text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text">itsKiller</span> Approach
            </h2>
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-4 rounded-full border border-yellow-400/30">
              <Crown className="w-10 h-10 text-yellow-400" />
            </div>
          </div>
          
          <p className="text-xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Every product in our <strong className="text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-2xl">itsKiller</strong> collection has been 
            personally tested by our community members or verified through real-world use. We focus on quality over quantity 
            and honest experiences over marketing hype.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-emerald-500/10 rounded-xl px-4 py-3 border border-emerald-500/30 hover:border-emerald-400/50 transition-colors group">
              <span className="text-emerald-400 font-bold text-sm group-hover:text-emerald-300 transition-colors">✓ Personal Testing</span>
            </div>
            <div className="bg-blue-500/10 rounded-xl px-4 py-3 border border-blue-500/30 hover:border-blue-400/50 transition-colors group">
              <span className="text-blue-400 font-bold text-sm group-hover:text-blue-300 transition-colors">✓ Community Verified</span>
            </div>
            <div className="bg-red-500/10 rounded-xl px-4 py-3 border border-red-500/30 hover:border-red-400/50 transition-colors group">
              <span className="text-red-400 font-bold text-sm group-hover:text-red-300 transition-colors">✓ Honest Reviews</span>
            </div>
            <div className="bg-purple-500/10 rounded-xl px-4 py-3 border border-purple-500/30 hover:border-purple-400/50 transition-colors group">
              <span className="text-purple-400 font-bold text-sm group-hover:text-purple-300 transition-colors">✓ Real Experiences</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 backdrop-blur-sm px-8 py-4 rounded-full border border-emerald-400/30 hover:border-emerald-400/50 transition-colors group hover:scale-105 transform duration-300">
            <Zap className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="text-emerald-400 font-bold text-lg">
              Join the <span className="text-transparent bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text">itsKiller</span> community today
            </span>
            <Crown className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;