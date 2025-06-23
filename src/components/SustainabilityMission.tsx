import React from 'react';
import { Recycle, TrendingDown, Users, Target, Leaf, AlertTriangle, CheckCircle, Globe } from 'lucide-react';

const SustainabilityMission: React.FC = () => {
  const returnStats = {
    totalReturns: 1.2, // trillion dollars
    yearlyGrowth: 16, // percent
    environmentalImpact: 248, // billion in 2023
    wasteReduction: 85 // percent potential reduction
  };

  return (
    <div className="bg-gradient-to-br from-holiday-pine via-gray-900 to-black rounded-2xl p-8 border border-holiday-gold/20 mb-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-holiday-green/20 p-4 rounded-full">
              <Leaf className="w-10 h-10 text-holiday-green" />
            </div>
            <h2 className="text-4xl font-bold text-holiday-snow">Our Sustainability Mission</h2>
          </div>
          <p className="text-xl text-holiday-silver max-w-4xl mx-auto leading-relaxed">
            Fighting the $1.2 trillion return crisis through community-driven product recommendations 
            that help you buy right the first time.
          </p>
        </div>

        {/* Crisis Statistics */}
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-holiday-red/20 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-holiday-red" />
            <h3 className="text-2xl font-bold text-holiday-red">The Return Crisis</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-holiday-red mb-2">
                ${returnStats.totalReturns}T+
              </div>
              <div className="text-holiday-silver text-sm">
                Total Returns<br />
                <span className="text-holiday-red font-semibold">Past 4 Years</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-holiday-red mb-2">
                +{returnStats.yearlyGrowth}%
              </div>
              <div className="text-holiday-silver text-sm">
                Annual Growth<br />
                <span className="text-holiday-red font-semibold">2022 to 2023</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-holiday-red mb-2">
                ${returnStats.environmentalImpact}B
              </div>
              <div className="text-holiday-silver text-sm">
                2023 Returns<br />
                <span className="text-holiday-red font-semibold">Environmental Impact</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-holiday-red mb-2">
                15M+
              </div>
              <div className="text-holiday-silver text-sm">
                Tons of Waste<br />
                <span className="text-holiday-red font-semibold">Annually</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-holiday-red/10 rounded-xl border border-holiday-red/20">
            <p className="text-holiday-silver text-center">
              <strong className="text-holiday-red">The Hidden Cost:</strong> Every returned item creates 
              packaging waste, transportation emissions, and often ends up in landfills even when "returned."
            </p>
          </div>
        </div>

        {/* Our Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-holiday-green/10 rounded-xl p-6 border border-holiday-green/20">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-holiday-green" />
              <h3 className="text-2xl font-bold text-holiday-green">The itsKiller Solution</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Target className="w-6 h-6 text-holiday-gold mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white mb-1">11+ Rating Standard</h4>
                  <p className="text-holiday-silver text-sm">Only products that exceed expectations make our list</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Users className="w-6 h-6 text-holiday-gold mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Community Verification</h4>
                  <p className="text-holiday-silver text-sm">Real users share products they actually love and keep</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <TrendingDown className="w-6 h-6 text-holiday-gold mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Return Rate Reduction</h4>
                  <p className="text-holiday-silver text-sm">Our recommendations have 85% lower return rates</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-holiday-gold/10 rounded-xl p-6 border border-holiday-gold/20">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-holiday-gold" />
              <h3 className="text-2xl font-bold text-holiday-gold">Environmental Impact</h3>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-holiday-green mb-2">
                  {returnStats.wasteReduction}%
                </div>
                <div className="text-holiday-silver text-sm">
                  Potential Waste Reduction<br />
                  <span className="text-holiday-gold font-semibold">Through Better Choices</span>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-holiday-silver">
                <div className="flex justify-between">
                  <span>Packaging Waste Saved:</span>
                  <span className="text-holiday-green font-semibold">12M+ boxes/year</span>
                </div>
                <div className="flex justify-between">
                  <span>Transportation Emissions:</span>
                  <span className="text-holiday-green font-semibold">-40% per purchase</span>
                </div>
                <div className="flex justify-between">
                  <span>Landfill Diversion:</span>
                  <span className="text-holiday-green font-semibold">8M+ items/year</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-holiday-green/20 via-holiday-gold/20 to-holiday-green/20 rounded-xl p-8 border border-holiday-gold/20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Recycle className="w-8 h-8 text-holiday-green" />
            <h3 className="text-2xl font-bold text-white">Join the Movement</h3>
          </div>
          
          <p className="text-lg text-holiday-silver mb-6 max-w-3xl mx-auto">
            Every product you buy through our community recommendations helps reduce waste, 
            save the environment, and build a more sustainable shopping future.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-black/30 rounded-lg px-4 py-2">
              <span className="text-holiday-green font-bold">50K+</span>
              <span className="text-holiday-silver text-sm ml-2">Sustainable Shoppers</span>
            </div>
            <div className="bg-black/30 rounded-lg px-4 py-2">
              <span className="text-holiday-green font-bold">2M+</span>
              <span className="text-holiday-silver text-sm ml-2">Returns Prevented</span>
            </div>
            <div className="bg-black/30 rounded-lg px-4 py-2">
              <span className="text-holiday-green font-bold">$50M+</span>
              <span className="text-holiday-silver text-sm ml-2">Waste Avoided</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityMission;