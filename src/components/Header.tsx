import React from 'react';
import { Target, Users, Shield, TrendingDown } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="space-y-12 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&auto=format&fit=crop&q=80"
          alt="Background"
          className="w-full h-full object-cover opacity-10 blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-900"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="bg-orange-500 p-4 rounded-lg shadow-xl shadow-orange-500/20">
            <Target className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-6xl font-bold text-white tracking-tight">
            itsKiller
          </h1>
        </div>

        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-10 mb-8 backdrop-blur-sm">
          <div className="text-center space-y-6">
            <div className="inline-block bg-red-500/20 border border-red-500/30 rounded-full px-6 py-2">
              <p className="text-red-300 font-bold text-lg">THE PROBLEM</p>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-white">
              $1 Trillion
            </h2>

            <p className="text-2xl md:text-3xl text-slate-300 font-semibold max-w-4xl mx-auto leading-relaxed">
              Over the last few years, Americans have returned <span className="text-orange-400">$1 trillion dollars</span> worth of merchandise from online retailers.
            </p>

            <p className="text-xl text-red-300 font-bold">
              This is unacceptable and unsustainable.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-10 backdrop-blur-sm">
          <div className="text-center space-y-6">
            <div className="inline-block bg-green-500/20 border border-green-500/30 rounded-full px-6 py-2">
              <p className="text-green-300 font-bold text-lg">THE SOLUTION</p>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white max-w-3xl mx-auto leading-tight">
              Buy Right the First Time
            </h2>

            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              itsKiller changes this by directing you to the <span className="text-green-400 font-semibold">highest rated products</span> using <span className="text-orange-400 font-semibold">peer-to-peer referrals</span> and our <span className="text-blue-400 font-semibold">deep research-driven model</span>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                <Users className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Peer Referrals</h3>
                <p className="text-sm text-slate-400">Real users sharing products they actually own and love</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Deep Research</h3>
                <p className="text-sm text-slate-400">Data-driven analysis to find truly quality products</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                <TrendingDown className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Reduce Returns</h3>
                <p className="text-sm text-slate-400">Help make online shopping sustainable again</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;