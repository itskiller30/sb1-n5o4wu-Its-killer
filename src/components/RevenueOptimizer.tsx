import React, { useEffect, useState } from 'react';
import { TrendingUp, DollarSign, Target, Award } from 'lucide-react';

interface RevenueStats {
  totalClicks: number;
  conversionRate: number;
  topPerformingMarketplace: string;
  estimatedRevenue: number;
}

const RevenueOptimizer: React.FC = () => {
  const [stats, setStats] = useState<RevenueStats>({
    totalClicks: 0,
    conversionRate: 0,
    topPerformingMarketplace: 'Amazon',
    estimatedRevenue: 0
  });

  useEffect(() => {
    // Load affiliate click data from localStorage
    const clicks = JSON.parse(localStorage.getItem('affiliate_clicks') || '[]');
    
    // Calculate basic stats
    const totalClicks = clicks.length;
    const marketplaceCounts = clicks.reduce((acc: Record<string, number>, click: any) => {
      acc[click.marketplace] = (acc[click.marketplace] || 0) + 1;
      return acc;
    }, {});

    const topMarketplace = Object.entries(marketplaceCounts)
      .sort(([,a], [,b]) => (b as number) - (a as number))[0]?.[0] || 'Amazon';

    // Simulate conversion rate and revenue (in real app, this would come from actual data)
    const conversionRate = Math.min(totalClicks * 0.05, 15); // 5% base conversion, max 15%
    const estimatedRevenue = totalClicks * 2.5; // $2.50 average per click

    setStats({
      totalClicks,
      conversionRate,
      topPerformingMarketplace: topMarketplace,
      estimatedRevenue
    });
  }, []);

  // Only show to admin users (in real app, this would be protected)
  const isAdmin = localStorage.getItem('admin_mode') === 'true';
  
  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-20 right-6 bg-gray-900/95 backdrop-blur-sm border border-holiday-gold/20 rounded-xl p-4 w-80 shadow-2xl z-30">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-5 h-5 text-holiday-gold" />
        <h3 className="text-sm font-semibold text-white">Revenue Analytics</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-holiday-silver">Total Clicks</span>
          <span className="text-sm font-bold text-white">{stats.totalClicks}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-holiday-silver">Conversion Rate</span>
          <span className="text-sm font-bold text-holiday-green">{stats.conversionRate.toFixed(1)}%</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-holiday-silver">Top Marketplace</span>
          <span className="text-sm font-bold text-holiday-gold">{stats.topPerformingMarketplace}</span>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-700">
          <span className="text-xs text-holiday-silver flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            Est. Revenue
          </span>
          <span className="text-sm font-bold text-holiday-green">${stats.estimatedRevenue.toFixed(2)}</span>
        </div>
      </div>
      
      <button
        onClick={() => localStorage.removeItem('admin_mode')}
        className="w-full mt-3 text-xs text-holiday-silver/60 hover:text-holiday-silver transition-colors"
      >
        Hide Analytics
      </button>
    </div>
  );
};

export default RevenueOptimizer;