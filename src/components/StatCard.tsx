import React, { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, description }) => {
  return (
    <div className="group bg-black/30 hover:bg-black/40 rounded-xl p-6 border border-holiday-gold/10 transition-all duration-300 hover:border-holiday-gold/30">
      <div className="mb-3 mx-auto flex justify-center transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="text-2xl md:text-3xl font-bold text-holiday-snow mb-2 group-hover:text-holiday-gold transition-colors duration-300">
        {value}
      </div>
      <div className="text-holiday-silver font-medium mb-2">
        {label}
      </div>
      <div className="text-sm text-holiday-silver/70">
        {description}
      </div>
    </div>
  );
};

export default StatCard;