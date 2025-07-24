import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 dark:bg-dark-950 text-white border-t dark:border-dark-700 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Key Series</h3>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              <li className="hover:text-white dark:hover:text-gray-200 transition-colors cursor-pointer">
                <Link to="/series?highlight=1">Border-Gavaskar Trophy 2025</Link>
              </li>
              <li className="hover:text-white dark:hover:text-gray-200 transition-colors cursor-pointer">
                <Link to="/series?highlight=2">England vs South Africa ODI Series</Link>
              </li>
              <li className="hover:text-white dark:hover:text-gray-200 transition-colors cursor-pointer">
                <Link to="/series?highlight=3">Pakistan vs New Zealand T20I Series</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              <li className="hover:text-white dark:hover:text-gray-200 transition-colors cursor-pointer">
                <Link to="/live-scores">Live Scores</Link>
              </li>
              <li className="hover:text-white dark:hover:text-gray-200 transition-colors cursor-pointer">
                <Link to="/series">Series</Link>
              </li>
              <li className="hover:text-white dark:hover:text-gray-200 transition-colors cursor-pointer">
                <Link to="/teams">Teams</Link>
              </li>
              <li className="hover:text-white dark:hover:text-gray-200 transition-colors cursor-pointer">
                <Link to="/news">News</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">CricXL Apps</h3>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              <li className="hover:text-white dark:hover:text-gray-200 transition-colors cursor-pointer">Android App</li>
              <li className="hover:text-white dark:hover:text-gray-200 transition-colors cursor-pointer">iOS App</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              <li className="hover:text-white dark:hover:text-gray-200 transition-colors cursor-pointer">Instagram</li>
              <li className="hover:text-white dark:hover:text-gray-200 transition-colors cursor-pointer">Twitter</li>
              <li className="hover:text-white dark:hover:text-gray-200 transition-colors cursor-pointer">Facebook</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 dark:border-dark-800 text-center text-gray-400 dark:text-gray-500">
          &copy; 2025 CricXL. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
