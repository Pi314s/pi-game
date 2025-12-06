import React, { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { CHART_DATA } from '../constants';
import { TrendingUp, TrendingDown, RefreshCw, Maximize2 } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f0f13] border border-primary/50 p-3 rounded-none shadow-[0_0_15px_rgba(108,92,231,0.3)]">
        <p className="text-gray-500 font-mono text-[10px] uppercase mb-1">{label}</p>
        <p className="text-white font-mono font-bold text-lg">
          {payload[0].value.toLocaleString()} <span className="text-primary text-xs">SATS</span>
        </p>
      </div>
    );
  }
  return null;
};

const PriceChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'1M' | '3M' | 'ALL'>('ALL');

  const filteredData = useMemo(() => {
    if (timeRange === 'ALL') return CHART_DATA;
    
    const now = new Date('2024-11-20');
    const cutoff = new Date(now);
    
    if (timeRange === '1M') cutoff.setMonth(now.getMonth() - 1);
    if (timeRange === '3M') cutoff.setMonth(now.getMonth() - 3);

    return CHART_DATA.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= cutoff;
    });
  }, [timeRange]);

  const currentPrice = CHART_DATA[CHART_DATA.length - 1].price;
  const startPrice = filteredData[0]?.price || currentPrice;
  const change = ((currentPrice - startPrice) / startPrice) * 100;
  const isPositive = change >= 0;

  return (
    <div className="w-full bg-[#0f0f13]/80 backdrop-blur-md rounded-xl border border-white/10 p-6 flex flex-col relative overflow-hidden h-[500px]">
      
      {/* Header controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-white/5 pb-6">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                <h3 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest">Market / PI-BTC</h3>
            </div>
            <div className="flex items-baseline gap-4">
                <span className="text-4xl font-mono font-bold text-white tracking-tighter">{currentPrice.toLocaleString()} <span className="text-base text-gray-500 font-normal">SATS</span></span>
                <span className={`px-2 py-0.5 rounded text-sm font-mono font-bold ${isPositive ? 'bg-accent-green/10 text-accent-green border border-accent-green/20' : 'bg-red-500/10 text-red-500'}`}>
                    {isPositive ? '+' : ''}{change.toFixed(2)}%
                </span>
            </div>
        </div>
        
        <div className="flex bg-black/40 p-1 rounded border border-white/10">
            {(['1M', '3M', 'ALL'] as const).map((range) => (
                <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-1 rounded-sm text-xs font-mono font-bold transition-all ${
                        timeRange === range 
                        ? 'bg-primary text-white shadow-[0_0_10px_rgba(108,92,231,0.4)]' 
                        : 'text-gray-500 hover:text-white hover:bg-white/5'
                    }`}
                >
                    {range}
                </button>
            ))}
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-0 relative">
        {/* Grid lines background decoration */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={filteredData}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6c5ce7" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#6c5ce7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={true} horizontal={true} />
            <XAxis 
              dataKey="date" 
              stroke="#4b5563" 
              fontSize={10} 
              fontFamily="monospace"
              tickLine={false}
              axisLine={false}
              minTickGap={50}
              tickFormatter={(val) => {
                  const d = new Date(val);
                  return `${d.getMonth() + 1}/${d.getDate()}`;
              }}
            />
            <YAxis 
              stroke="#4b5563" 
              fontSize={10}
              fontFamily="monospace" 
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
              orientation="right"
              width={40}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#6c5ce7', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area
              type="step"
              dataKey="price"
              stroke="#6c5ce7"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)"
              activeDot={{ r: 4, fill: '#fff', stroke: '#6c5ce7', strokeWidth: 2 }}
              animationDuration={500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-gray-600 border-t border-white/5 pt-2 uppercase">
        <div className="flex items-center gap-2">
            <span className="flex items-center gap-1"><RefreshCw size={10} /> Syncing...</span>
        </div>
        <span className="flex items-center gap-1 text-primary hover:text-white cursor-pointer transition-colors">
            Expand View <Maximize2 size={10} />
        </span>
      </div>
    </div>
  );
};

export default PriceChart;