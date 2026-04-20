import React from 'react';
import { IndianRupee, ShoppingCart, Users, TrendingUp } from 'lucide-react';

export default function Overview() {
  const stats = [
    { label: 'Total Revenue', value: '₹4,85,000', icon: IndianRupee, trend: '+12%', isPositive: true },
    { label: 'Active Orders', value: '24', icon: ShoppingCart, trend: '+4', isPositive: true },
    { label: 'Total Customers', value: '1,240', icon: Users, trend: '+18%', isPositive: true },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-semibold text-gray-800 tracking-tight">{stat.value}</h3>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 text-charcoal">
                  <Icon size={20} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp size={16} className="text-emerald-500 mr-1" />
                <span className="text-emerald-500 font-medium">{stat.trend}</span>
                <span className="text-gray-400 ml-2">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Placeholder Area */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-800">Sales Over the Last 30 Days</h3>
          <select className="bg-gray-50 border border-gray-200 text-sm rounded-md px-3 py-1.5 focus:outline-none focus:border-charcoal">
            <option>Last 30 Days</option>
            <option>This Year</option>
          </select>
        </div>
        
        {/* CSS Bar Chart Placeholder */}
        <div className="h-[300px] w-full flex items-end justify-between gap-1 md:gap-2 px-2 pb-6 border-b border-gray-100 relative">
          {/* Y Axis Labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 pb-6 pr-4">
            <span>₹25k</span>
            <span>₹15k</span>
            <span>₹5k</span>
            <span>₹0</span>
          </div>
          <div className="absolute inset-0 pl-10 border-l border-gray-100 h-full pb-6 z-0 pointer-events-none">
            <div className="h-full border-b border-gray-50 flex flex-col justify-between">
              <div className="border-t border-dashed border-gray-100 w-full flex-1"></div>
              <div className="border-t border-dashed border-gray-100 w-full flex-1"></div>
              <div className="border-t border-dashed border-gray-100 w-full flex-1"></div>
            </div>
          </div>
          
          {/* Bars */}
          <div className="w-full h-full flex items-end justify-between gap-1 md:gap-3 pl-12 z-10">
            {Array.from({ length: 15 }).map((_, i) => {
              const height = 20 + Math.random() * 80;
              return (
                <div key={i} className="w-full flex flex-col justify-end h-full group relative cursor-pointer">
                  <div 
                    className="w-full bg-charcoal/20 group-hover:bg-charcoal transition-colors rounded-t-sm relative" 
                    style={{ height: `${height}%` }}
                  >
                    {/* Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap pointer-events-none transition-opacity">
                      ₹{Math.floor(height * 250)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-between px-12 mt-4 text-xs text-gray-400">
          <span>01 Apr</span>
          <span>15 Apr</span>
          <span>30 Apr</span>
        </div>
      </div>
    </div>
  );
}
