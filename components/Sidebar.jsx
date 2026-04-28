'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/', icon: '📊' },
    { name: 'Asset Registry', href: '/assets', icon: '📁' },
    { name: 'Run a Scan', href: '/scan', icon: '🔍' },
    { name: 'Violations', href: '/violations', icon: '⚠️' },
    { name: 'Propagation Map', href: '/propagation', icon: '🌐' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-950 text-white p-6 border-r border-gray-800">
      <div className="mb-10">
        <h1 className="text-xl font-bold text-indigo-500">AssetProtect</h1>
        <p className="text-xs text-gray-400">Sports Media Protection</p>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:bg-gray-900 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
