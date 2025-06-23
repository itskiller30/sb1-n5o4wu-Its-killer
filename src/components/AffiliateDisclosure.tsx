import React, { useState } from 'react';
import { Info, X, DollarSign, Shield, Heart } from 'lucide-react';

const AffiliateDisclosure: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Disclosure Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-holiday-gold/90 hover:bg-holiday-gold text-gray-900 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40"
        aria-label="Affiliate Disclosure"
      >
        <Info className="w-5 h-5" />
      </button>

      {/* Disclosure Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl border border-holiday-gold/20 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-holiday-gold/20 p-3 rounded-full">
                  <Shield className="w-8 h-8 text-holiday-gold" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Affiliate Disclosure</h2>
                  <p className="text-holiday-silver">Transparency is our priority</p>
                </div>
              </div>

              <div className="space-y-4 text-holiday-silver">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-holiday-gold/10">
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-6 h-6 text-holiday-gold mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">How We Earn</h3>
                      <p className="leading-relaxed">
                        itsKiller participates in affiliate programs with Amazon, eBay, Walmart, Target, Best Buy, and other retailers. 
                        When you purchase through our links, we may earn a small commission at no additional cost to you.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-4 border border-holiday-green/10">
                  <div className="flex items-start gap-3">
                    <Heart className="w-6 h-6 text-holiday-green mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Our Promise</h3>
                      <ul className="space-y-2 leading-relaxed">
                        <li>• We only recommend products we genuinely believe are exceptional (11+ rating)</li>
                        <li>• Our reviews and ratings are never influenced by affiliate partnerships</li>
                        <li>• We always show you the best available prices across all retailers</li>
                        <li>• Commission rates never affect our product recommendations</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-4 border border-holiday-red/10">
                  <h3 className="text-lg font-semibold text-white mb-2">Commission Rates</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>Amazon: 4-10%</div>
                    <div>eBay: 4-70%</div>
                    <div>Walmart: 1-4%</div>
                    <div>Target: 1-8%</div>
                    <div>Best Buy: 1-7%</div>
                    <div>Others: Varies</div>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <p className="text-sm text-holiday-silver/80">
                    Your support through affiliate purchases helps us maintain this free service and continue 
                    finding the best products for our community. Thank you for your trust!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AffiliateDisclosure;