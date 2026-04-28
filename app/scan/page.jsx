'use client';

import { useState, useEffect } from 'react';
import ScanProgress from '@/components/ScanProgress';

export default function ScanPage() {
  const [assets, setAssets] = useState([]);
  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState(null);

  useEffect(() => {
    import('@/data/mockAssets.json').then(data => {
      setAssets(data.default);
      if (data.default.length > 0) setSelectedAssetId(data.default[0].id);
    });
  }, []);

  const startScan = () => {
    if (!selectedAssetId) return;
    setIsScanning(true);
    setScanResults(null);
  };

  const handleScanComplete = () => {
    const mockResults = [
      { id: 'r1', platform: 'Twitter', url: 'https://twitter.com/fan_account/status/123', similarity: 96, date: '2 hours ago' },
      { id: 'r2', platform: 'Reddit', url: 'https://reddit.com/r/sports/comments/xyz', similarity: 84, date: '5 hours ago' },
      { id: 'r3', platform: 'Facebook', url: 'https://facebook.com/groups/soccer/posts/456', similarity: 72, date: '1 day ago' },
      { id: 'r4', platform: 'TikTok', url: 'https://tiktok.com/@user/video/789', similarity: 91, date: '3 hours ago' },
    ];
    setScanResults(mockResults);
    setIsScanning(false);
  };

  const selectedAsset = assets.find(a => a.id === selectedAssetId);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Run a Content Scan</h1>
        <p className="text-gray-500">Scan the web for unauthorized use of your digital assets</p>
      </div>

      {!isScanning && !scanResults && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Asset to Scan</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assets.map(asset => (
                  <div 
                    key={asset.id}
                    onClick={() => setSelectedAssetId(asset.id)}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center space-x-4 ${
                      selectedAssetId === asset.id 
                        ? 'border-indigo-600 bg-indigo-50' 
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <img src={asset.thumbnail} alt="" className="w-16 h-12 object-cover rounded-md" />
                    <div>
                      <p className="font-bold text-sm truncate w-40">{asset.name}</p>
                      <p className="text-xs text-gray-500">{asset.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={startScan}
              disabled={!selectedAssetId}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Deep Scan
            </button>
          </div>
        </div>
      )}

      {isScanning && (
        <div className="py-12">
          <ScanProgress onComplete={handleScanComplete} />
        </div>
      )}

      {scanResults && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Scan Results for "{selectedAsset?.name}"</h2>
            <button 
              onClick={() => setScanResults(null)}
              className="text-indigo-600 font-medium text-sm hover:underline"
            >
              Run Another Scan
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Platform</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">URL</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Match Score</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {scanResults.map((result) => (
                    <tr key={result.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-sm">{result.platform}</span>
                        <p className="text-[10px] text-gray-400">{result.date}</p>
                      </td>
                      <td className="px-6 py-4">
                        <a href="#" className="text-indigo-600 text-sm hover:underline truncate max-w-xs block">{result.url}</a>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${result.similarity > 90 ? 'bg-red-500' : 'bg-yellow-500'}`}
                              style={{ width: `${result.similarity}%` }}
                            />
                          </div>
                          <span className={`text-sm font-bold ${result.similarity > 90 ? 'text-red-500' : 'text-yellow-600'}`}>
                            {result.similarity}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors">
                          Flag Violation
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
