import React, { useState } from 'react';
import Footer from '../components/Footer';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
  readTime: string;
  featured?: boolean;
}

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const newsArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'Rohit Sharma\'s Masterclass Leads India to Historic Victory at Lord\'s',
      summary: 'Captain\'s brilliant 156* guides India to a commanding 7-wicket win over England in the second Test.',
      content: 'In a spectacular display of batting prowess, Rohit Sharma led from the front with an unbeaten 156 at the iconic Lord\'s Cricket Ground...',
      author: 'Rajesh Kumar',
      date: '2025-07-23',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop',
      category: 'match-report',
      tags: ['India', 'England', 'Test', 'Rohit Sharma'],
      readTime: '5 min read',
      featured: true
    },
    {
      id: '2',
      title: 'Babar Azam Breaks Virat Kohli\'s Record for Fastest 5000 ODI Runs',
      summary: 'Pakistan captain achieves the milestone in just 97 innings, surpassing Kohli\'s previous record.',
      content: 'Babar Azam has etched his name in cricket history by becoming the fastest player to score 5000 runs in ODI cricket...',
      author: 'Sarah Mitchell',
      date: '2025-07-22',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop',
      category: 'player-news',
      tags: ['Pakistan', 'Babar Azam', 'Record', 'ODI'],
      readTime: '3 min read'
    },
    {
      id: '3',
      title: 'IPL 2025 Mega Auction: Mumbai Indians Retain Core Players',
      summary: 'Five-time champions announce retention of Bumrah, Hardik Pandya, and Suryakumar Yadav ahead of mega auction.',
      content: 'Mumbai Indians have made their retention choices clear ahead of the IPL 2025 mega auction, keeping their core intact...',
      author: 'Priya Sharma',
      date: '2025-07-21',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=500&fit=crop',
      category: 'tournament',
      tags: ['IPL', 'Mumbai Indians', 'Auction', 'Retention'],
      readTime: '6 min read'
    },
    {
      id: '4',
      title: 'Jasprit Bumrah Returns to Test Squad After 8-Month Injury Layoff',
      summary: 'India\'s premier fast bowler cleared for upcoming series against Australia after successful fitness test.',
      content: 'After months of rehabilitation and recovery, Jasprit Bumrah has been declared fit for international cricket...',
      author: 'Anil Mehta',
      date: '2025-07-20',
      image: 'https://images.unsplash.com/photo-1544965503-7ad532d21940?w=800&h=500&fit=crop',
      category: 'player-news',
      tags: ['India', 'Jasprit Bumrah', 'Injury', 'Return'],
      readTime: '4 min read'
    },
    {
      id: '5',
      title: 'Women\'s T20 World Cup 2025: Australia Announces Squad',
      summary: 'Defending champions name strong 15-member squad with blend of experience and youth.',
      content: 'Cricket Australia has announced their squad for the upcoming Women\'s T20 World Cup, featuring a perfect mix...',
      author: 'Emma Thompson',
      date: '2025-07-19',
      image: 'https://images.unsplash.com/photo-1593786481789-b35b1b2b21c4?w=800&h=500&fit=crop',
      category: 'tournament',
      tags: ['Women\'s Cricket', 'Australia', 'T20 World Cup', 'Squad'],
      readTime: '4 min read'
    },
    {
      id: '6',
      title: 'Ben Stokes Announces Retirement from ODI Cricket',
      summary: 'England all-rounder decides to focus on Test cricket and T20 formats to prolong his career.',
      content: 'In a surprising announcement, Ben Stokes has declared his retirement from ODI cricket to manage his workload...',
      author: 'James Wilson',
      date: '2025-07-18',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop',
      category: 'player-news',
      tags: ['England', 'Ben Stokes', 'Retirement', 'ODI'],
      readTime: '5 min read'
    },
    {
      id: '7',
      title: 'New Zealand Completes Historic 3-0 Whitewash Against South Africa',
      summary: 'Black Caps dominate the Test series with comprehensive victories in all three matches.',
      content: 'New Zealand has achieved a remarkable 3-0 series victory against South Africa, showcasing their dominance...',
      author: 'Michael Brown',
      date: '2025-07-17',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop',
      category: 'match-report',
      tags: ['New Zealand', 'South Africa', 'Test', 'Series'],
      readTime: '6 min read'
    },
    {
      id: '8',
      title: 'ICC Announces New Playing Conditions for T20 Cricket',
      summary: 'Several rule changes implemented to enhance the format and improve playing experience.',
      content: 'The International Cricket Council has announced significant changes to T20 playing conditions...',
      author: 'David Lee',
      date: '2025-07-16',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=500&fit=crop',
      category: 'cricket-news',
      tags: ['ICC', 'T20', 'Rules', 'Playing Conditions'],
      readTime: '3 min read'
    }
  ];

  const categories = [
    { id: 'all', name: 'All News', icon: '📰' },
    { id: 'match-report', name: 'Match Reports', icon: '🏏' },
    { id: 'player-news', name: 'Player News', icon: '👤' },
    { id: 'tournament', name: 'Tournaments', icon: '🏆' },
    { id: 'cricket-news', name: 'Cricket News', icon: '📢' }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory);

  const featuredArticle = newsArticles.find(article => article.featured);
  const regularArticles = newsArticles.filter(article => !article.featured);

  const getCategoryColor = (category: string) => {
    const colors = {
      'match-report': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      'player-news': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      'tournament': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
      'cricket-news': 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
  };

  return (
    <>
      <main className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Cricket News Hub
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Stay updated with the latest cricket news, match reports, player updates, 
          and tournament coverage from around the world.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 dark:bg-blue-700 text-white shadow-lg'
                  : 'bg-white dark:bg-dark-800 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-dark-700 border border-gray-200 dark:border-dark-600'
              }`}
            >
              <span>{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Article (only show if 'all' is selected) */}
      {selectedCategory === 'all' && featuredArticle && (
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-700 dark:to-purple-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 text-white">
                <div className="flex items-center mb-4">
                  <span className="bg-red-500 dark:bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">
                    FEATURED
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(featuredArticle.category)}`}>
                    {categories.find(cat => cat.id === featuredArticle.category)?.name}
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-4 leading-tight">
                  {featuredArticle.title}
                </h2>
                <p className="text-blue-100 dark:text-blue-200 text-lg mb-6 leading-relaxed">
                  {featuredArticle.summary}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-blue-200 dark:text-blue-300">
                    <span>{featuredArticle.author}</span>
                    <span>•</span>
                    <span>{new Date(featuredArticle.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{featuredArticle.readTime}</span>
                  </div>
                  <button className="bg-white dark:bg-gray-100 text-blue-600 dark:text-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 dark:hover:bg-gray-200 transition-colors">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(selectedCategory === 'all' ? regularArticles : filteredArticles).map((article) => (
          <article
            key={article.id}
            className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg dark:shadow-xl hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-dark-700"
          >
            {/* Article Image */}
            <div className="relative overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
                  {categories.find(cat => cat.id === article.category)?.name}
                </span>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 line-clamp-2 leading-tight">
                {article.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                {article.summary}
              </p>

              {/* Article Meta */}
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span className="font-medium">{article.author}</span>
                <span>{article.readTime}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read More Button */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(article.date).toLocaleDateString()}
                </span>
                <button className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                  Read More
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Load More Section */}
      <div className="text-center mt-12">
        <button className="bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-700 dark:to-purple-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-800 dark:hover:from-blue-800 dark:hover:to-purple-900 transition-all duration-300 transform hover:scale-105 shadow-lg dark:shadow-xl">
          Load More Articles
        </button>
      </div>

      {/* Newsletter Signup */}
      <div className="mt-16">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-dark-800 dark:to-dark-900 rounded-2xl p-8 text-center text-white border dark:border-dark-700">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-300 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Get the latest cricket news, match updates, and exclusive content delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full text-gray-800 dark:text-gray-200 bg-white dark:bg-dark-700 border dark:border-dark-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <button className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
};

export default News;
