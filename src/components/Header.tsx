import React from 'react';
import { Zap, Sparkles, Clock } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

const Header: React.FC = () => {
  // Set launch date to 35 days from now
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 35);

  return (
    <header className="relative">
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-holiday-red/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-holiday-gold/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-80 h-80 bg-holiday-green/20 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Logo Area */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-holiday-red via-holiday-gold to-holiday-green blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative bg-black/40 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
              <Zap className="w-16 h-16 text-holiday-gold animate-twinkle" />
            </div>
          </div>

          {/* Title Area */}
          <div className="space-y-4">
            <h1 className="relative">
              <span className="text-7xl font-bold bg-gradient-to-r from-holiday-red via-holiday-gold to-holiday-green bg-clip-text text-transparent
                             drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] filter">
                itsKiller
              </span>
              <Sparkles className="absolute -right-12 top-0 w-8 h-8 text-holiday-gold animate-pulse" />
            </h1>
            <p className="text-2xl text-holiday-silver mt-2 font-light italic font-serif">
              The name says it all
            </p>
          </div>

          {/* Launch Countdown */}
          <div className="bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-holiday-gold/20">
            <div className="flex items-center gap-2 text-holiday-gold mb-2">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Community Launch Phase</span>
            </div>
            <CountdownTimer targetDate={launchDate} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;