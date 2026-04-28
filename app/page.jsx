'use client';

import { useState, useEffect } from 'react';
import StatCard from '@/components/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Link from 'next/link';

// Mock data for the chart
const chartData = [
  { name: 'Mon', violations: 4 },
  { name: 'Tue', violations: 7 },
  { name: 'Wed', violations: 5 },
  { name: 'Thu', violations: 12 },
  { name: 'Fri', violations: 8 },
  { name: 'Sat', violations: 15 },
  { name: 'Sun', violations: 10 },
];

export default function Dashboard() {
  const [assets, setAssets] = useState([]);
  const [violations, setViolations] = useState([]);

  useEffect(() => {
    // In a real app, this would be an API call
    // Since we are using local JSON files, we can import them
    // But for client components, it's easier to fetch or just import if configured
    import('@/data/mockAssets.json').then(data => setAssets(data.default));
    import('@/data/mockViolations.json').then(data => setViolations(data.default));
  }, []);

  const totalAssets = assets.length;
  const activeScans = assets.filter(a => a.status === 'Scanning').length;
  const detectedViolations = violations.length;
  const assetsCleared = assets.filter(a => a.status === 'Protected').length;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Overview of your asset protection status</p>
        </div>
        <Link 
          href="/scan" 
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Run New Scan
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Assets" value={totalAssets} icon="📁" color="indigo" trend="+2 this week" />
        <StatCard title="Active Scans" value={activeScans} icon="🔍" color="yellow" />
        <StatCard title="Violations Detected" value={detectedViolations} icon="⚠️" color="red" trend="+5 today" />
        <StatCard title="Assets Cleared" value={assetsCleared} icon="✅" color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-6">Violations Per Week</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f9fafb'}} 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="violations" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.violations > 10 ? '#ef4444' : '#4f46e5'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-6">Recent Violations</h2>
          <div className="space-y-4">
            {violations.slice(0, 5).map((violation) => (
              <div key={violation.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                  ⚠️
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold truncate">{violation.assetName}</p>
                  <p className="text-xs text-gray-500">{violation.platform} • {new Date(violation.detectedAt).toLocaleDateString()}</p>
                </div>
                <div className="text-xs font-medium text-red-500 bg-red-50 px-2 py-1 rounded">
                  {violation.similarityScore}%
                </div>
              </div>
            ))}
          </div>
          <Link href="/violations" className="block text-center mt-6 text-sm font-medium text-indigo-600 hover:text-indigo-700">
            View All Violations
          </Link>
        </div>
      </div>
    </div>
  );
}
