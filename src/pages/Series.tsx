import React, { useEffect, useState, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Footer from '../components/Footer';

interface SeriesData {
  id: string;
  name: string;
  format: 'Test' | 'ODI' | 'T20I';
  status: 'Live' | 'Upcoming' | 'Completed';
  teams: string[];
  startDate: string;
  endDate: string;
  venue: string;
  matchesPlayed: number;
  totalMatches: number;
  currentLeader?: string;
  trophy: string;
  description: string;
  image: string;
  progress: number;
}

const Series: React.FC = () => {
  const [activeSeries, setActiveSeries] = useState<SeriesData[]>([]);
  const [upcomingSeries, setUpcomingSeries] = useState<SeriesData[]>([]);
  const [completedSeries, setCompletedSeries] = useState<SeriesData[]>([]);
  const [activeTab, setActiveTab] = useState<'live' | 'upcoming' | 'completed'>('live');
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const highlightSeries = searchParams.get('highlight');

  useEffect(() => {
    // Mock data for demonstration - replace with actual API calls
    const mockActiveSeries: SeriesData[] = [
      {
        id: '1',
        name: 'Border-Gavaskar Trophy 2025',
        format: 'Test',
        status: 'Live',
        teams: ['India', 'Australia'],
        startDate: '2025-01-15',
        endDate: '2025-02-20',
        venue: 'Australia',
        matchesPlayed: 2,
        totalMatches: 5,
        currentLeader: 'India',
        trophy: 'Border-Gavaskar Trophy',
        description: 'The most prestigious Test series between India and Australia',
        image: '/api/placeholder/400/250',
        progress: 40
      },
      {
        id: '2',
        name: 'England vs South Africa ODI Series',
        format: 'ODI',
        status: 'Live',
        teams: ['England', 'South Africa'],
        startDate: '2025-01-20',
        endDate: '2025-01-30',
        venue: 'England',
        matchesPlayed: 1,
        totalMatches: 3,
        currentLeader: 'England',
        trophy: 'ODI Series Trophy',
        description: 'Thrilling ODI series between two cricket powerhouses',
        image: '/api/placeholder/400/250',
        progress: 33
      }
    ];

    const mockUpcomingSeries: SeriesData[] = [
      {
        id: '3',
        name: 'Pakistan vs New Zealand T20I Series',
        format: 'T20I',
        status: 'Upcoming',
        teams: ['Pakistan', 'New Zealand'],
        startDate: '2025-02-01',
        endDate: '2025-02-10',
        venue: 'Pakistan',
        matchesPlayed: 0,
        totalMatches: 5,
        trophy: 'T20I Series Trophy',
        description: 'High-octane T20I cricket in Pakistan',
        image: '/api/placeholder/400/250',
        progress: 0
      }
    ];

    const mockCompletedSeries: SeriesData[] = [
      {
        id: '4',
        name: 'The Ashes 2024',
        format: 'Test',
        status: 'Completed',
        teams: ['England', 'Australia'],
        startDate: '2024-12-01',
        endDate: '2024-12-28',
        venue: 'Australia',
        matchesPlayed: 5,
        totalMatches: 5,
        currentLeader: 'Australia',
        trophy: 'The Ashes Urn',
        description: 'Australia retained the Ashes with a dominant performance',
        image: '/api/placeholder/400/250',
        progress: 100
      }
    ];

    // Simulate API loading
    setTimeout(() => {
      setActiveSeries(mockActiveSeries);
      setUpcomingSeries(mockUpcomingSeries);
      setCompletedSeries(mockCompletedSeries);
      setLoading(false);
      
      // Handle highlight parameter - switch to appropriate tab based on series
      if (highlightSeries) {
        const allSeries = [...mockActiveSeries, ...mockUpcomingSeries, ...mockCompletedSeries];
        const targetSeries = allSeries.find(series => 
          series.name.toLowerCase().includes(highlightSeries.toLowerCase()) ||
          series.id === highlightSeries
        );
        
        if (targetSeries) {
          setActiveTab(targetSeries.status === 'Live' ? 'live' : 
                     targetSeries.status === 'Upcoming' ? 'upcoming' : 'completed');
          
          // Scroll to the series card after a short delay
          setTimeout(() => {
            const element = document.getElementById(`series-${targetSeries.id}`);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 100);
        }
      }
    }, 1000);
  }, [highlightSeries]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'bg-red-500';
      case 'Upcoming': return 'bg-blue-500';
      case 'Completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getFormatColor = (format: string) => {
    switch (format) {
      case 'Test': return 'bg-purple-100 text-purple-800';
      case 'ODI': return 'bg-blue-100 text-blue-800';
      case 'T20I': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const SeriesCard: React.FC<{ series: SeriesData }> = ({ series }) => {
    const isHighlighted = highlightSeries && (
      series.name.toLowerCase().includes(highlightSeries.toLowerCase()) ||
      series.id === highlightSeries
    );

    return (
      <div 
        id={`series-${series.id}`}
        className={`group bg-white dark:bg-dark-800 rounded-2xl shadow-lg hover:shadow-2xl dark:shadow-dark-900/20 transition-all duration-500 overflow-hidden border transform hover:-translate-y-2 ${
          isHighlighted 
            ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800 border-blue-400 dark:border-blue-600 shadow-2xl' 
            : 'border-gray-100 dark:border-dark-700 hover:border-blue-200 dark:hover:border-blue-600/30'
        }`}
      >
      {/* Series Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(series.status)}`}>
            {series.status}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getFormatColor(series.format)}`}>
            {series.format}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-200 transition-colors">
            {series.name}
          </h3>
          <p className="text-blue-100 text-sm">{series.teams.join(' vs ')}</p>
        </div>
        {series.status === 'Live' && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1 bg-red-500 px-2 py-1 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-white text-xs font-semibold">LIVE</span>
            </div>
          </div>
        )}
      </div>

      {/* Series Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm font-medium">{series.venue}</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400">Matches</div>
            <div className="font-bold text-gray-800 dark:text-gray-100">{series.matchesPlayed}/{series.totalMatches}</div>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{series.description}</p>

        {/* Progress Bar */}
        {series.status !== 'Upcoming' && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>Progress</span>
              <span>{series.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${series.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Current Leader */}
        {series.currentLeader && series.status !== 'Upcoming' && (
          <div className="flex items-center gap-2 mb-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800/30">
            <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-semibold text-yellow-800 dark:text-yellow-300">
              {series.status === 'Completed' ? 'Winner: ' : 'Leading: '}
              {series.currentLeader}
            </span>
          </div>
        )}

        {/* Action Button */}
        <Link
          to={`/series/${series.id}`}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
        >
          <span>View Details</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
    );
  };

  const LoadingCard = () => (
    <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-dark-700 animate-pulse">
      <div className="h-48 bg-gray-300 dark:bg-dark-600"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-300 dark:bg-dark-600 rounded mb-2"></div>
        <div className="h-3 bg-gray-300 dark:bg-dark-600 rounded mb-4 w-3/4"></div>
        <div className="h-3 bg-gray-300 dark:bg-dark-600 rounded mb-2"></div>
        <div className="h-3 bg-gray-300 dark:bg-dark-600 rounded mb-4 w-1/2"></div>
        <div className="h-10 bg-gray-300 dark:bg-dark-600 rounded"></div>
      </div>
    </div>
  );

  const getCurrentData = () => {
    switch (activeTab) {
      case 'live': return activeSeries;
      case 'upcoming': return upcomingSeries;
      case 'completed': return completedSeries;
      default: return activeSeries;
    }
  };

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Cricket Series
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Follow all the major cricket series happening around the world. From Test championships to T20I tournaments.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        {/* Desktop Tabs - Hidden on mobile */}
        <div className="hidden md:flex justify-center">
          <div className="bg-gray-100 dark:bg-dark-800 p-1 rounded-2xl flex">
            {[
              { key: 'live', label: 'Live Series', count: activeSeries.length },
              { key: 'upcoming', label: 'Upcoming', count: upcomingSeries.length },
              { key: 'completed', label: 'Completed', count: completedSeries.length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.key
                    ? 'bg-white dark:bg-dark-700 text-blue-600 dark:text-blue-400 shadow-lg transform scale-105'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {tab.label}
                <span className={`px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.key 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                    : 'bg-gray-200 dark:bg-dark-600 text-gray-600 dark:text-gray-300'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Dropdown - Hidden on desktop */}
        <div className="md:hidden relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-gray-100 dark:bg-dark-800 p-4 rounded-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center justify-between transition-all duration-200 hover:bg-gray-200 dark:hover:bg-dark-700 transform hover:scale-[1.02]"
          >
            <div className="flex items-center gap-2">
              <span>
                {activeTab === 'live' ? 'Live Series' : 
                 activeTab === 'upcoming' ? 'Upcoming' : 'Completed'}
              </span>
              <span className="px-2 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 transition-all duration-200">
                {activeTab === 'live' ? activeSeries.length : 
                 activeTab === 'upcoming' ? upcomingSeries.length : completedSeries.length}
              </span>
            </div>
            <svg 
              className={`w-5 h-5 transition-all duration-300 ease-in-out ${isDropdownOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'rotate-0'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          <div className={`absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-700 z-10 transition-all duration-300 transform origin-top ${
            isDropdownOpen 
              ? 'opacity-100 scale-y-100 translate-y-0' 
              : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
          }`}>
            {[
              { key: 'live', label: 'Live Series', count: activeSeries.length },
              { key: 'upcoming', label: 'Upcoming', count: upcomingSeries.length },
              { key: 'completed', label: 'Completed', count: completedSeries.length }
            ].map((tab, index) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key as any);
                  setIsDropdownOpen(false);
                }}
                className={`w-full px-4 py-3 text-left font-semibold flex items-center justify-between transition-all duration-200 transform hover:scale-[1.02] ${
                  activeTab === tab.key
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-dark-700'
                } ${index === 0 ? 'rounded-t-2xl' : ''} ${index === 2 ? 'rounded-b-2xl' : ''}`}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animation: isDropdownOpen ? `slideInDown 0.3s ease-out ${index * 50}ms both` : 'none'
                }}
              >
                <span>{tab.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs transition-all duration-200 ${
                  activeTab === tab.key 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                    : 'bg-gray-200 dark:bg-dark-600 text-gray-600 dark:text-gray-300'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Series Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {loading ? (
          // Loading state
          Array.from({ length: 6 }).map((_, index) => (
            <LoadingCard key={index} />
          ))
        ) : getCurrentData().length > 0 ? (
          getCurrentData().map((series) => (
            <SeriesCard key={series.id} series={series} />
          ))
        ) : (
          // Empty state
          <div className="col-span-full text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Series Found</h3>
            <p className="text-gray-600 mb-6">There are no {activeTab} series at the moment.</p>
          </div>
        )}
      </div>
    </main>
    <Footer />
    </>
  );
};

export default Series;
