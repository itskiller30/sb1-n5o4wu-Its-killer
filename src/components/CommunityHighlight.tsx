import React from 'react';
import { Users, PackageX, ThumbsUp, Clock, Share2, Recycle, TrendingDown, Globe } from 'lucide-react';

interface CommunityHighlightProps {
  onShare: () => void;
}

const CommunityHighlight: React.FC<CommunityHighlightProps> = ({ onShare }) => {
  return (
    <div className="mb-12 bg-gradient-to-br from-holiday-pine to-gray-900 rounded-2xl overflow-hidden border border-holiday-gold/20">
      <div className="relative h-auto py-16 md:py-24">
        <img 
          src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2000"
          alt="Diverse community of people collaborating and sharing ideas"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
        <div className="relative px-6 max-w-4xl mx-auto">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="w-10 h-10 text-holiday-gold animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold text-holiday-snow">One Community, One Mission</h2>
            </div>

            <div className="space-y-6 text-holiday-silver">
              <p className="text-xl md:text-2xl font-semibold text-holiday-gold">
                Fighting the $1.2 Trillion Return Crisis Together
              </p>
              
              {/* Crisis Statistics */}
              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-holiday-red/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <PackageX className="w-6 h-6 text-holiday-red" />
                      <span className="text-2xl font-bold text-holiday-red">$1.2T+</span>
                    </div>
                    <p className="text-sm text-holiday-silver">Returns in 4 Years</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <TrendingDown className="w-6 h-6 text-holiday-red" />
                      <span className="text-2xl font-bold text-holiday-red">+16%</span>
                    </div>
                    <p className="text-sm text-holiday-silver">Annual Growth</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Globe className="w-6 h-6 text-holiday-red" />
                      <span className="text-2xl font-bold text-holiday-red">15M+</span>
                    </div>
                    <p className="text-sm text-holiday-silver">Tons of Waste</p>
                  </div>
                </div>
                <p className="text-center text-holiday-silver/80 text-sm">
                  Every returned item creates packaging waste, emissions, and often ends up in landfills
                </p>
              </div>

              {/* Our Solution */}
              <div className="bg-holiday-green/10 rounded-xl p-6 border border-holiday-green/20">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Recycle className="w-6 h-6 text-holiday-green" />
                  <h3 className="text-xl font-bold text-holiday-green">Our Solution: Buy Right the First Time</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-holiday-green mb-1">85%</div>
                    <p className="text-sm text-holiday-silver">Lower Return Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-holiday-green mb-1">2M+</div>
                    <p className="text-sm text-holiday-silver">Returns Prevented</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-holiday-green mb-1">$50M+</div>
                    <p className="text-sm text-holiday-silver">Waste Avoided</p>
                  </div>
                </div>
              </div>

              {/* Main CTA */}
              <div className="max-w-xl mx-auto bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-holiday-gold/20">
                <button
                  onClick={onShare}
                  className="group relative transform hover:scale-105 transition-all duration-300 w-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-holiday-red via-holiday-gold to-holiday-green rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative bg-black/90 backdrop-blur-sm hover:bg-black/80 text-white px-8 py-6 rounded-xl border border-white/10 flex flex-col items-center gap-4">
                    <Share2 className="w-12 h-12 text-holiday-gold" />
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">Share Your Killer Item</h3>
                      <p className="text-holiday-silver">Help build a sustainable shopping future</p>
                    </div>
                  </div>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-holiday-green">
                <ThumbsUp className="w-6 h-6" />
                <p className="font-semibold">Every recommendation helps prevent wasteful returns and saves our planet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHighlight;