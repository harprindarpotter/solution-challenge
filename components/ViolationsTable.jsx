const ViolationsTable = ({ violations, onViewDetails, onResolve }) => {
  const getSeverity = (score) => {
    if (score >= 90) return { label: 'High', color: 'bg-red-100 text-red-700 border-red-200' };
    if (score >= 70) return { label: 'Medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
    return { label: 'Low', color: 'bg-blue-100 text-blue-700 border-blue-200' };
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Asset</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Platform</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Severity</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Detected At</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {violations.map((v) => {
              const severity = getSeverity(v.similarityScore);
              return (
                <tr key={v.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-gray-900">{v.assetName}</p>
                    <p className="text-[10px] text-gray-400 truncate max-w-[200px]">{v.url}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{v.platform}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${severity.color}`}>
                      {severity.label} ({v.similarityScore}%)
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(v.detectedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium ${v.status === 'Resolved' ? 'text-green-600' : 'text-red-600'}`}>
                      {v.status === 'Resolved' ? '● Resolved' : '● Open'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {v.status !== 'Resolved' && (
                      <button 
                        onClick={() => onResolve(v.id)}
                        className="text-xs font-bold text-green-600 hover:text-green-700"
                      >
                        Resolve
                      </button>
                    )}
                    <button 
                      onClick={() => onViewDetails(v)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViolationsTable;
