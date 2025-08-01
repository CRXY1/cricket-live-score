import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="sticky top-0 z-50 relative bg-gradient-to-r from-blue-600 via-blue-800 to-purple-900 dark:from-dark-800 dark:via-dark-700 dark:to-dark-600 text-white backdrop-blur-lg shadow-lg">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 py-3 relative">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Link to="/" className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 dark:from-blue-100 dark:to-purple-200">
                CricXL
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/live-scores" 
                className={`nav-link group ${isActive('/live-scores') ? 'text-blue-300 dark:text-blue-400' : ''}`}
              >
                <span className="relative">
                  Live Scores
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-400 dark:bg-blue-300 transition-all duration-300 ${
                    isActive('/live-scores') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </span>
              </Link>
              <Link 
                to="/series" 
                className={`nav-link group ${isActive('/series') ? 'text-blue-300 dark:text-blue-400' : ''}`}
              >
                <span className="relative">
                  Series
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-400 dark:bg-blue-300 transition-all duration-300 ${
                    isActive('/series') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </span>
              </Link>
              <Link 
                to="/teams" 
                className={`nav-link group ${isActive('/teams') ? 'text-blue-300 dark:text-blue-400' : ''}`}
              >
                <span className="relative">
                  Teams
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-400 dark:bg-blue-300 transition-all duration-300 ${
                    isActive('/teams') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </span>
              </Link>
              <Link 
                to="/news" 
                className={`nav-link group ${isActive('/news') ? 'text-blue-300 dark:text-blue-400' : ''}`}
              >
                <span className="relative">
                  News
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-400 dark:bg-blue-300 transition-all duration-300 ${
                    isActive('/news') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </span>
              </Link>
            </nav>

            {/* Theme Toggle and Mobile Menu Button */}
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <button 
                className="md:hidden p-2 rounded-lg hover:bg-white/10 dark:hover:bg-black/20 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="mt-4 pt-4 border-t border-white/20 dark:border-white/10">
              <nav className="flex flex-col space-y-2">
                <Link 
                  to="/live-scores" 
                  className={`nav-link py-3 px-4 rounded-lg transition-all duration-200 transform hover:translate-x-2 hover:shadow-lg backdrop-blur-sm ${
                    isActive('/live-scores') ? 'bg-white/30 dark:bg-black/30' : 'bg-white/5 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="flex items-center space-x-2">
                    <span>📊</span>
                    <span>Live Scores</span>
                  </span>
                </Link>
                <Link 
                  to="/series" 
                  className={`nav-link py-3 px-4 rounded-lg transition-all duration-200 transform hover:translate-x-2 hover:shadow-lg backdrop-blur-sm ${
                    isActive('/series') ? 'bg-white/30 dark:bg-black/30' : 'bg-white/5 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="flex items-center space-x-2">
                    <span>🏆</span>
                    <span>Series</span>
                  </span>
                </Link>
                <Link 
                  to="/teams" 
                  className={`nav-link py-3 px-4 rounded-lg transition-all duration-200 transform hover:translate-x-2 hover:shadow-lg backdrop-blur-sm ${
                    isActive('/teams') ? 'bg-white/30 dark:bg-black/30' : 'bg-white/5 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="flex items-center space-x-2">
                    <span>👥</span>
                    <span>Teams</span>
                  </span>
                </Link>
                <Link 
                  to="/news" 
                  className={`nav-link py-3 px-4 rounded-lg transition-all duration-200 transform hover:translate-x-2 hover:shadow-lg backdrop-blur-sm ${
                    isActive('/news') ? 'bg-white/30 dark:bg-black/30' : 'bg-white/5 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="flex items-center space-x-2">
                    <span>📰</span>
                    <span>News</span>
                  </span>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb Navigation */}
      <nav className="bg-white dark:bg-dark-800 shadow-sm border-b border-gray-200 dark:border-dark-700 transition-colors duration-300">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <li>
              <Link to="/" className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                Home
              </Link>
            </li>
            {location.pathname === '/live-scores' && (
              <>
                <li className="text-gray-400 dark:text-gray-500">/</li>
                <li>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">Live Scores</span>
                </li>
              </>
            )}
            {location.pathname === '/series' && (
              <>
                <li className="text-gray-400 dark:text-gray-500">/</li>
                <li>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">Series</span>
                </li>
              </>
            )}
            {location.pathname === '/teams' && (
              <>
                <li className="text-gray-400 dark:text-gray-500">/</li>
                <li>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">Teams</span>
                </li>
              </>
            )}
            {location.pathname === '/news' && (
              <>
                <li className="text-gray-400 dark:text-gray-500">/</li>
                <li>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">News</span>
                </li>
              </>
            )}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Header;
