import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Settings, User, LogOut, X, AlignJustify } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/planner':
        return 'Study Planner';
      case '/notifications':
        return 'Notifications';
      case '/settings':
        return 'Settings';
      default:
        return 'NotePlan';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and title */}
          <div className="flex items-center space-x-2">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="flex h-9 w-9 items-center justify-center rounded bg-primary-500">
                <svg width="24" height="24" viewBox="0 0 24 24" className="text-white">
                  <rect width="18" height="4" x="3" y="8" rx="1" fill="currentColor" />
                  <rect width="12" height="4" x="3" y="16" rx="1" fill="currentColor" />
                </svg>
              </div>
              <span className="hidden text-xl font-semibold text-primary-700 md:block">NotePlan</span>
            </Link>
            <div className="hidden md:block">
              <div className="mx-3 h-6 border-l border-gray-300"></div>
            </div>
            <h1 className="text-lg font-medium text-gray-800">{getPageTitle()}</h1>
          </div>

          {/* Mobile menu button */}
          <button
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X size={24} /> : <AlignJustify size={24} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden items-center space-x-1 md:flex">
            <Link
              to="/notifications"
              className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100"
            >
              <Bell size={20} />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent-500"></span>
            </Link>
            <Link
              to="/settings"
              className="rounded-full p-2 text-gray-600 hover:bg-gray-100"
            >
              <Settings size={20} />
            </Link>
            <div className="relative ml-2">
              <div className="flex cursor-pointer items-center space-x-3 rounded-full p-1 hover:bg-gray-100">
                <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name || 'User avatar'} className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-full w-full p-1 text-gray-500" />
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white pt-16 md:hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-4 py-4">
              {user ? (
                <>
                  <div className="flex items-center space-x-3 py-2">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name || 'User avatar'} className="h-full w-full object-cover" />
                      ) : (
                        <User className="h-full w-full p-1 text-gray-500" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>

                  <div className="h-px w-full bg-gray-200"></div>

                  <Link to="/dashboard" onClick={closeMenu} className="py-3 text-gray-600 hover:text-primary-600">
                    Dashboard
                  </Link>
                  <Link to="/planner" onClick={closeMenu} className="py-3 text-gray-600 hover:text-primary-600">
                    Study Planner
                  </Link>
                  <Link to="/notifications" onClick={closeMenu} className="py-3 text-gray-600 hover:text-primary-600">
                    Notifications
                  </Link>
                  <Link to="/settings" onClick={closeMenu} className="py-3 text-gray-600 hover:text-primary-600">
                    Settings
                  </Link>

                  <div className="h-px w-full bg-gray-200"></div>

                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="flex items-center space-x-3 py-3 text-gray-600 hover:text-red-600"
                  >
                    <LogOut size={18} />
                    <span>Sign out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={closeMenu} className="btn btn-primary w-full">
                    Sign in
                  </Link>
                  <Link to="/register" onClick={closeMenu} className="btn btn-secondary w-full">
                    Create account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
