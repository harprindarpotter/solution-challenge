const AssetCard = ({ asset }) => {
  const statusColors = {
    'Protected': 'bg-green-100 text-green-700',
    'Violation Found': 'bg-red-100 text-red-700',
    'Scanning': 'bg-yellow-100 text-yellow-700',
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="h-40 overflow-hidden relative">
        <img 
          src={asset.thumbnail} 
          alt={asset.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-bold px-2 py-1 rounded-full shadow-sm ${statusColors[asset.status] || 'bg-gray-100 text-gray-700'}`}>
            {asset.status}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-900 truncate flex-1 pr-2" title={asset.name}>
            {asset.name}
          </h3>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
            {asset.type}
          </span>
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <span>Registered: {new Date(asset.registeredAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;
