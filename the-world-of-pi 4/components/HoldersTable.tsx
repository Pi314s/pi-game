import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { HOLDERS_DATA, HOLDERS_DISTRIBUTION } from '../constants';

const HoldersTable: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Chart Section - Replicating the "Holders" card from screenshot */}
      <div className="w-full lg:w-5/12 bg-dark-card/60 backdrop-blur-md rounded-2xl border border-dark-border p-6 flex flex-col h-fit">
         <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Holders Distribution</h3>
         
         <div className="h-[280px] w-full relative mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={HOLDERS_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                  startAngle={90}
                  endAngle={-270}
                >
                  {HOLDERS_DISTRIBUTION.map((entry, index) => (
                    <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        className="stroke-dark-card stroke-2"
                    />
                  ))}
                </Pie>
                <Tooltip 
                    contentStyle={{ backgroundColor: '#151720', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                    itemStyle={{ color: '#fff', fontWeight: 500 }}
                    formatter={(value: number) => [`${value}%`, 'Percentage']}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-gray-400 text-sm font-medium mb-1">Others</span>
                <span className="text-white text-3xl font-bold tracking-tight">69.04%</span>
            </div>
         </div>
         
         {/* Legend */}
         <div className="space-y-3 px-2">
            {HOLDERS_DISTRIBUTION.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm group">
                    <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.2)]" style={{ backgroundColor: item.color }}></span>
                        <span className="text-gray-300 group-hover:text-white transition-colors font-medium">{item.name}</span>
                    </div>
                    <span className="text-white font-mono opacity-80 group-hover:opacity-100">{item.value}%</span>
                </div>
            ))}
         </div>
      </div>

      {/* Table Section */}
      <div className="w-full lg:w-7/12 bg-dark-card/60 backdrop-blur-md rounded-2xl border border-dark-border overflow-hidden flex flex-col h-fit">
        <div className="p-6 border-b border-white/5">
            <h3 className="text-xl font-bold text-white">Top 20 Addresses</h3>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Address</th>
                <th className="px-6 py-4 text-right">Ratio</th>
                <th className="px-6 py-4 text-right">Value (sats)</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {HOLDERS_DATA.map((holder) => (
                <tr key={holder.rank} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold ${
                            holder.rank <= 3 ? 'text-primary' : 'text-gray-500'
                        }`}>
                            {holder.rank}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-400 group-hover:text-primary transition-colors cursor-pointer">
                    {holder.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-300">
                    {holder.percentage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-300 font-mono">
                    {holder.value}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default HoldersTable;