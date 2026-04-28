import { useState, useEffect } from 'react';

const ScanProgress = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing scan...');

  useEffect(() => {
    const statuses = [
      { threshold: 0, text: 'Connecting to database...' },
      { threshold: 20, text: 'Scanning social media platforms...' },
      { threshold: 45, text: 'Analyzing third-party websites...' },
      { threshold: 70, text: 'Cross-referencing digital signatures...' },
      { threshold: 90, text: 'Finalizing results...' },
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        
        const currentStatus = [...statuses].reverse().find(s => next >= s.threshold);
        if (currentStatus) setStatus(currentStatus.text);
        
        return next;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <p className="text-indigo-600 font-bold text-sm uppercase tracking-wider mb-1">Live Scan in Progress</p>
          <h3 className="text-2xl font-bold">{status}</h3>
        </div>
        <span className="text-3xl font-black text-gray-200">{Math.round(progress)}%</span>
      </div>
      
      <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-600 rounded-full transition-all duration-300 ease-out shadow-[0_0_15px_rgba(79,70,229,0.4)]"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="mt-8 grid grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-gray-50 h-2 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    </div>
  );
};

export default ScanProgress;
