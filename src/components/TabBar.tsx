import React from 'react';
import { Gift, Star, Flag, GraduationCap, Users } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
}

interface TabBarProps {
  activeTab: string;
  onTabChange: (tabId: any) => void;
  tabs: Tab[];
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange, tabs }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'community':
        return <Users className="w-4 h-4" />;
      case 'bifl':
        return <Star className="w-4 h-4" />;
      case 'stocking':
        return <Gift className="w-4 h-4" />;
      case 'usa':
        return <Flag className="w-4 h-4" />;
      case 'kiddos':
        return <GraduationCap className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* Glass Background */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-xl rounded-xl border border-white/10"></div>

      {/* Content */}
      <div className="relative flex flex-wrap gap-2 p-2">
        {/* Community Tab - Always visible and prominent */}
        <button
          key="community"
          onClick={() => onTabChange('community')}
          className={`
            py-3 px-6 rounded-xl text-base font-medium transition-all duration-300
            flex items-center justify-center gap-2 w-full md:w-auto
            backdrop-blur-sm
            ${activeTab === 'community'
              ? 'bg-gradient-to-r from-holiday-gold via-holiday-gold/90 to-holiday-gold/80 text-gray-900 shadow-lg shadow-holiday-gold/20'
              : 'bg-holiday-pine/30 text-holiday-silver hover:text-white hover:bg-holiday-holly/50 border border-white/5'
            }
          `}
        >
          <Users className="w-5 h-5" />
          Community Recommendations
        </button>

        {/* Other tabs */}
        <div className="flex-1 flex flex-wrap gap-2">
          {tabs.filter(tab => tab.id !== 'community').map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300
                flex items-center justify-center gap-2 min-w-[150px] backdrop-blur-sm
                ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-holiday-red via-holiday-red/90 to-holiday-red/80 text-white shadow-lg'
                  : 'bg-holiday-pine/30 text-holiday-silver hover:text-white hover:bg-holiday-holly/50 border border-white/5'
                }
              `}
            >
              {getIcon(tab.id)}
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabBar;