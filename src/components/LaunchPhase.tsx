import React from 'react';
import { Rocket, Users, Gift, Lock } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

interface LaunchPhaseProps {
  launchDate: Date;
}

const LaunchPhase: React.FC<LaunchPhaseProps> = ({ launchDate }) => {
  return (
    <div className="bg-gradient-to-br from-holiday-pine to-gray-900 rounded-2xl p-8 border border-holiday-gold/20">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="flex items-center justify-center gap-3">
          <Lock className="w-8 h-8 text-holiday-gold" />
          <h2 className="text-3xl font-bold text-holiday-snow">Products Locked Until Launch</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/30 rounded-xl p-6 border border-holiday-gold/10">
            <Users className="w-8 h-8 text-holiday-silver mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-holiday-gold mb-2">Community Phase</h3>
            <p className="text-holiday-silver/80">Collecting recommendations from our trusted community members</p>
          </div>

          <div className="bg-black/30 rounded-xl p-6 border border-holiday-gold/10">
            <Gift className="w-8 h-8 text-holiday-red mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-holiday-gold mb-2">Curating Quality</h3>
            <p className="text-holiday-silver/80">Reviewing and verifying each submission for excellence</p>
          </div>

          <div className="bg-black/30 rounded-xl p-6 border border-holiday-gold/10">
            <Rocket className="w-8 h-8 text-holiday-green mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-holiday-gold mb-2">Launch Countdown</h3>
            <p className="text-holiday-silver/80">Preparing for our grand reveal with verified products</p>
          </div>
        </div>

        <div className="bg-black/30 rounded-xl p-6 border border-holiday-gold/10 max-w-md mx-auto">
          <p className="text-holiday-silver mb-4">Products will be revealed in:</p>
          <CountdownTimer targetDate={launchDate} />
        </div>

        <p className="text-holiday-silver/80 max-w-lg mx-auto">
          We're taking time to collect and verify the most exceptional community recommendations. 
          Join us now to be part of this exclusive launch phase!
        </p>
      </div>
    </div>
  );
};

export default LaunchPhase;