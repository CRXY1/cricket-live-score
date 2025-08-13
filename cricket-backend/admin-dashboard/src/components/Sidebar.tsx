import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/live-matches', label: 'Live Matches', icon: '🏏' },
    { path: '/matches', label: 'Matches', icon: '🎯' },
    { path: '/news', label: 'News', icon: '📰' },
    { path: '/teams-players', label: 'Teams & Players', icon: '👥' },
    { path: '/series', label: 'Series', icon: '🏆' },
    { path: '/users', label: 'Users', icon: '👤' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="w-64 bg-white shadow-xl border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-2xl font-bold gradient-text">CricXL Admin</h1>
        <p className="text-sm text-gray-500 mt-1">Cricket Management</p>
      </div>
      
      <nav className="px-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? 'sidebar-item-active' : ''} mb-1`
            }
            end={item.path === '/'}
          >
            <span className="text-xl mr-3">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
