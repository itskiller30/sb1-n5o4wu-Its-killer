import React from 'react';
import { Shield, Award, Users, Leaf } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center space-y-8">
      {/* Logo & Brand */}
      <div className="space-y-6">
        <div className="flex items-center justify-center gap-4">
          <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-4 rounded-2xl shadow-xl">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              TrustedPicks
            </h1>
            <p className="text-slate-400 text-lg font-medium">Boutique • Curated • Trusted</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-slate-300 leading-relaxed mb-6">
            A boutique community where our expert staff and trusted members share only the products 
            they personally stand behind. Every recommendation is tested, verified, and guaranteed 
            to exceed your expectations.
          </p>
          
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 text-emerald-400">
              <Award className="w-5 h-5" />
              <span className="font-semibold">Staff Verified</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <Users className="w-5 h-5" />
              <span className="font-semibold">Community Tested</span>
            </div>
            <div className="flex items-center gap-2 text-teal-400">
              <Leaf className="w-5 h-5" />
              <span className="font-semibold">Waste-Free Shopping</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-gradient-to-r from-slate-800/50 via-slate-700/30 to-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/50 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-emerald-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Expert Curation</h3>
            <p className="text-slate-400 text-sm">Our staff personally tests and approves every product before sharing</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Peer Verification</h3>
            <p className="text-slate-400 text-sm">Community members validate recommendations through real-world use</p>
          </div>
          
          <div className="text-center">
            <div className="bg-teal-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-teal-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Conscious Commerce</h3>
            <p className="text-slate-400 text-sm">Reducing waste by helping you buy right the first time</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;