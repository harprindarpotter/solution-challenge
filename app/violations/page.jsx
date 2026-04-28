'use client';

import { useState, useEffect } from 'react';
import ViolationsTable from '@/components/ViolationsTable';

export default function ViolationsPage() {
  const [violations, setViolations] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [propagationData, setPropagationData] = useState({});

  useEffect(() => {
    import('@/data/mockViolations.json').then(data => setViolations(data.default));
    import('@/data/mockPropagation.json').then(data => setPropagationData(data.default));
  }, []);

  const filteredViolations = violations.filter(v => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'High Severity') return v.similarityScore >= 90;
    if (activeFilter === 'Medium') return v.similarityScore >= 70 && v.similarityScore < 90;
    if (activeFilter === 'Low') return v.similarityScore < 70;
    if (activeFilter === 'Resolved') return v.status === 'Resolved';
    return true;
  });

  const handleResolve = (id) => {
    setViolations(violations.map(v => v.id === id ? { ...v, status: 'Resolved' } : v));
    if (selectedViolation?.id === id) {
      setSelectedViolation({ ...selectedViolation, status: 'Resolved' });
    }
  };

  const getRecommendedAction = (score) => {
    if (score >= 90) return "Send immediate Takedown Notice (DMCA). This is a direct copy.";
    if (score >= 70) return "Issue warning to platform. High similarity detected.";
    return "Monitor for further propagation. Low similarity matching.";
  };

  const assetTrail = selectedViolation ? propagationData[selectedViolation.assetId] || [] : [];

  return (
    <div className="space-y-8 relative overflow-hidden">
      <div>
        <h1 className="text-2xl font-bold">Violations Dashboard</h1>
        <p className="text-gray-500">Review and take action on flagged unauthorized content</p>
      </div>

      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl w-fit">
        {['All', 'High Severity', 'Medium', 'Low', 'Resolved'].map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeFilter === filter 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <ViolationsTable 
        violations={filteredViolations} 
        onViewDetails={setSelectedViolation}
        onResolve={handleResolve}
      />

      {/* Side Drawer */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-gray-100 ${selectedViolation ? 'translate-x-0' : 'translate-x-full'}`}>
        {selectedViolation && (
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold">Violation Details</h2>
              <button onClick={() => setSelectedViolation(null)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div className="space-y-4">
                <img 
                  src={`https://picsum.photos/seed/${selectedViolation.assetId}/400/250`} 
                  className="w-full h-48 object-cover rounded-xl"
                  alt=""
                />
                <div>
                  <h3 className="text-lg font-bold">{selectedViolation.assetName}</h3>
                  <p className="text-sm text-gray-500">{selectedViolation.platform} • Detected {new Date(selectedViolation.detectedAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Violation URL</h4>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 overflow-hidden">
                  <a href="#" className="text-sm text-indigo-600 font-medium break-all hover:underline">{selectedViolation.url}</a>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Recommended Action</h4>
                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                  <p className="text-sm text-indigo-800 leading-relaxed font-medium">
                    {getRecommendedAction(selectedViolation.similarityScore)}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Propagation Trail</h4>
                <div className="space-y-4">
                  {assetTrail.map((event, idx) => (
                    <div key={idx} className="flex space-x-3 relative">
                      {idx !== assetTrail.length - 1 && (
                        <div className="absolute left-2.5 top-5 w-0.5 h-full bg-gray-100" />
                      )}
                      <div className={`w-5 h-5 rounded-full z-10 flex-shrink-0 mt-0.5 ${idx === 0 ? 'bg-indigo-500' : 'bg-gray-200'}`} />
                      <div>
                        <p className="text-sm font-bold">{event.platform}</p>
                        <p className="text-xs text-gray-500">{event.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
              {selectedViolation.status !== 'Resolved' && (
                <button 
                  onClick={() => handleResolve(selectedViolation.id)}
                  className="flex-1 bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-colors"
                >
                  Mark Resolved
                </button>
              )}
              <button 
                className="flex-1 bg-white border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Download Report
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {selectedViolation && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
          onClick={() => setSelectedViolation(null)}
        />
      )}
    </div>
  );
}
