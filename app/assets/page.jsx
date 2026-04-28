'use client';

import { useState, useEffect } from 'react';
import AssetCard from '@/components/AssetCard';
import Modal from '@/components/Modal';

export default function AssetRegistry() {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAsset, setNewAsset] = useState({ name: '', type: 'Photo', description: '' });

  useEffect(() => {
    import('@/data/mockAssets.json').then(data => setAssets(data.default));
  }, []);

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || asset.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAddAsset = (e) => {
    e.preventDefault();
    const assetToAdd = {
      id: `a${assets.length + 1}`,
      ...newAsset,
      status: 'Protected',
      registeredAt: new Date().toISOString().split('T')[0],
      thumbnail: `https://picsum.photos/seed/${assets.length + 1}/300/200`
    };
    setAssets([...assets, assetToAdd]);
    setIsModalOpen(false);
    setNewAsset({ name: '', type: 'Photo', description: '' });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Asset Registry</h1>
          <p className="text-gray-500">Manage your official digital media assets</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Add Asset
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input 
            type="text" 
            placeholder="Search assets by name..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="Photo">Photo</option>
          <option value="Video">Video</option>
          <option value="Graphic">Graphic</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAssets.map(asset => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
        {filteredAssets.length === 0 && (
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500">No assets found matching your criteria</p>
          </div>
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Register New Asset"
      >
        <form onSubmit={handleAddAsset} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Asset Name</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newAsset.name}
              onChange={(e) => setNewAsset({...newAsset, name: e.target.value})}
              placeholder="e.g. Finals Highlight Video"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select 
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              value={newAsset.type}
              onChange={(e) => setNewAsset({...newAsset, type: e.target.value})}
            >
              <option value="Photo">Photo</option>
              <option value="Video">Video</option>
              <option value="Graphic">Graphic</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24"
              value={newAsset.description}
              onChange={(e) => setNewAsset({...newAsset, description: e.target.value})}
              placeholder="Brief description of the asset..."
            ></textarea>
          </div>
          <div className="pt-4 flex gap-3">
            <button 
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-200 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
            >
              Add Asset
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
