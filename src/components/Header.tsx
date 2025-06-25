import React from 'react';
import { Shield, Award, Users, Leaf, Star, CheckCircle, Heart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center space-y-8">
      {/* Logo & Brand */}
      <div className="space-y-6">
        <div className="flex items-center justify-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl blur opacity-50"></div>
            <div className="relative bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-4 rounded-2xl shadow-xl">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              TrustedPicks
            </h1>
            <p className="text-slate-400 text-lg font-medium">Boutique • Curated • Trusted</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <p className="text-2xl text-slate-200 leading-relaxed mb-8 font-light">
            A boutique community where our expert staff and trusted members share only the products 
            they personally stand behind. Every recommendation is tested, verified, and guaranteed 
            to exceed your expectations.
          </p>
          
          {/* Key Differentiators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-xl p-6 border border-emerald-500/20">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-emerald-500/20 p-3 rounded-full">
                  <Award className="w-8 h-8 text-emerald-400" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Staff Verified</h3>
              <p className="text-slate-400 text-sm">Our expert team personally tests every product before sharing</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-blue-500/20 p-3 rounded-full">
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Peer Verified</h3>
              <p className="text-slate-400 text-sm">Community members validate recommendations through real-world use</p>
            </div>
            
            <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/5 rounded-xl p-6 border border-teal-500/20">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-teal-500/20 p-3 rounded-full">
                  <Leaf className="w-8 h-8 text-teal-400" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Conscious Commerce</h3>
              <p className="text-slate-400 text-sm">Reducing waste by helping you buy right the first time</p>
            </div>
          </div>
        </div>
      </div>

      {/* What Makes Us Different */}
      <div className="bg-gradient-to-r from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/50 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Why TrustedPicks is Different</h2>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            We're not another algorithm-driven marketplace. We're a human-centered community 
            focused on quality, trust, and conscious consumption.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center group">
            <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">100% Human Curated</h3>
            <p className="text-slate-400 text-sm">No algorithms, just real people sharing what they actually love</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Star className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">11+ Rating Standard</h3>
            <p className="text-slate-400 text-sm">Only products that exceed the traditional 10/10 scale</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-10 h-10 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Personal Stories</h3>
            <p className="text-slate-400 text-sm">Every recommendation comes with real experiences and honest reviews</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-gradient-to-br from-teal-500/20 to-teal-600/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Leaf className="w-10 h-10 text-teal-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Waste Reduction</h3>
            <p className="text-slate-400 text-sm">92% lower return rate compared to traditional e-commerce</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 backdrop-blur-sm px-6 py-3 rounded-full border border-emerald-500/30">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-400 font-semibold">Trusted by 2,500+ conscious shoppers</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;