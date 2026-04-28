'use client';

import { useState, useEffect } from 'react';
import Timeline from '@/components/Timeline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PropagationPage() {
  const [assets, setAssets] = useState([]);
  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [propagationData, setPropagationData] = useState({});

  useEffect(() => {
    import('@/data/mockAssets.json').then(data => {
      setAssets(data.default);
      if (data.default.length > 0) setSelectedAssetId(data.default[0].id);
    });
    import('@/data/mockPropagation.json').then(data => setPropagationData(data.default));
  }, []);

  const currentEvents = propagationData[selectedAssetId] || [];
  
  // Transform data for line chart (cumulative appearances)
  const chartData = currentEvents.reduce((acc, event) => {
    const lastCount = acc.length > 0 ? acc[acc.length - 1].count : 0;
    acc.push({
      day: `Day ${event.day}`,
      count: lastCount + 1
    });
    return acc;
  }, []);

  const selectedAsset = assets.find(a => a.id === selectedAssetId);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Propagation Map</h1>
          <p className="text-gray-500">Track how your content spreads across the internet</p>
        </div>
        <div className="flex items-center space-x-3 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
          <span className="text-sm font-medium text-gray-500 ml-2">Select Asset:</span>
          <select 
            className="bg-gray-50 border-none focus:ring-0 text-sm font-bold rounded-lg py-1 px-3 pr-8"
            value={selectedAssetId}
            onChange={(e) => setSelectedAssetId(e.target.value)}
          >
            {assets.map(asset => (
              <option key={asset.id} value={asset.id}>{asset.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-6">Propagation Timeline</h2>
            <Timeline events={currentEvents} />
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-6">Cumulative Appearances</h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#4f46e5" 
                    strokeWidth={3} 
                    dot={{fill: '#4f46e5', strokeWidth: 2, r: 4}} 
                    activeDot={{r: 6, strokeWidth: 0}}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-4 text-xs text-gray-400 text-center leading-relaxed">
              This chart shows the growth of your asset's presence across tracked platforms over time.
            </p>
          </div>

          {selectedAsset && (
            <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200">
              <h3 className="font-bold text-lg mb-2">Asset Health</h3>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl font-black">98.2%</span>
                <span className="text-xs bg-indigo-500 px-2 py-0.5 rounded-full">Secure</span>
              </div>
              <p className="text-sm text-indigo-100 leading-relaxed mb-6">
                Your asset "{selectedAsset.name}" is currently protected on 12 verified platforms.
              </p>
              <button className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl hover:bg-indigo-50 transition-colors">
                Generate Full Audit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
