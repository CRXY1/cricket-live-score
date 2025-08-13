import React, { useEffect, useState } from 'react';

interface User {
  _id: string;
  email: string;
  username: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

interface Stats {
  totalMatches: number;
  liveMatches: number;
  totalTeams: number;
  totalUsers: number;
}

const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<Stats>({
    totalMatches: 0,
    liveMatches: 0,
    totalTeams: 0,
    totalUsers: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');
    
    if (!token || !userData) {
      window.location.href = '/admin';
      return;
    }

    setUser(JSON.parse(userData));
    
    // Fetch dashboard stats
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dashboard/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = '/admin';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">🏏 CricXL Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.firstName || user?.username || user?.email}
              </span>
              <button
                onClick={() => window.location.href = '/'}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                View Site
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-2xl font-bold text-gray-900">{stats.totalMatches}</p>
                <p className="text-gray-600">Total Matches</p>
              </div>
              <div className="text-3xl">🏏</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-2xl font-bold text-gray-900">{stats.liveMatches}</p>
                <p className="text-gray-600">Live Matches</p>
              </div>
              <div className="text-3xl">🔴</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-2xl font-bold text-gray-900">{stats.totalTeams}</p>
                <p className="text-gray-600">Teams</p>
              </div>
              <div className="text-3xl">🏆</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                <p className="text-gray-600">Users</p>
              </div>
              <div className="text-3xl">👥</div>
            </div>
          </div>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-3 text-gray-900">🏏 Live Match Control</h3>
            <p className="text-gray-600 mb-4">Control live scores, update match status, and manage real-time data.</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Manage Live Matches
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-3 text-gray-900">📊 Match Management</h3>
            <p className="text-gray-600 mb-4">Add, edit, and schedule cricket matches across all formats.</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
              Manage Matches
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-3 text-gray-900">📰 News Management</h3>
            <p className="text-gray-600 mb-4">Create and publish cricket news, articles, and updates.</p>
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
              Manage News
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-3 text-gray-900">🏆 Teams & Players</h3>
            <p className="text-gray-600 mb-4">Manage team rosters, player profiles, and statistics.</p>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
              Manage Teams
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-3 text-gray-900">🏆 Series Management</h3>
            <p className="text-gray-600 mb-4">Create and manage cricket series, tournaments, and competitions.</p>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
              Manage Series
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-3 text-gray-900">👥 User Management</h3>
            <p className="text-gray-600 mb-4">Manage admin users, roles, and permissions.</p>
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
              Manage Users
            </button>
          </div>
        </div>

        {/* Backend Status */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">🔧 System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-green-800">Backend API</span>
              <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">Online</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-blue-800">Admin Panel</span>
              <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">Active</span>
            </div>
          </div>
          <div className="mt-4">
            <a 
              href="http://localhost:5000/api/health" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              🔗 Test Backend API Health
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
