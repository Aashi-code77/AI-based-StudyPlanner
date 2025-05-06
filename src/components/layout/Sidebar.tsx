import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Bell, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar: React.FC = () => {
  const { logout } = useAuth();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/planner', label: 'Study Planner', icon: <Calendar size={20} /> },
    { path: '/notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="hidden border-r border-gray-200 bg-white md:block md:w-64 lg:w-72">
      <div className="flex h-full flex-col justify-between p-4">
        <nav className="space-y-1 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
              {item.path === '/notifications' && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-xs text-white">
                  3
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="py-4">
          <button
            onClick={logout}
            className="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <LogOut size={20} />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;