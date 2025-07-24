import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { fetchLatestNews } from '../services/api';
import { NewsArticle } from '../types/cricket';

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadNews = async () => {
      try {
        setIsLoading(true);
        const articles = await fetchLatestNews();
        setNewsArticles(articles);
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();
  }, []);

  const categories = [
    { id: 'all', name: 'All News', icon: '📰' },
    { id: 'match-report', name: 'Match Reports', icon: '🏏' },
    { id: 'news', name: 'Breaking News', icon: '⚡' },
    { id: 'feature', name: 'Features', icon: '📝' },
    { id: 'analysis', name: 'Analysis', icon: '📊' }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory);

  const handleArticleClick = (articleId: string) => {
    navigate(`/news/${articleId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-xl font-semibold">
            Loading latest news...
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Cricket News Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stay updated with the latest cricket news, match reports, player updates, and expert analysis from around the world.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-dark-700 hover:border-blue-300 dark:hover:border-blue-600'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <div
                key={article.id}
                onClick={() => handleArticleClick(article.id)}
                className={`group cursor-pointer transform hover:-translate-y-2 transition-all duration-300 ${
                  index === 0 ? 'md:col-span-2 lg:col-span-3' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 dark:border-dark-700 h-full">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className={`w-full object-cover transform group-hover:scale-110 transition-transform duration-500 ${
                        index === 0 ? 'h-64 lg:h-80' : 'h-48'
                      }`}
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-md border ${
                        article.category === 'match-report' 
                          ? 'bg-green-500/20 text-green-300 border-green-400/30' 
                          : article.category === 'analysis'
                          ? 'bg-purple-500/20 text-purple-300 border-purple-400/30'
                          : 'bg-blue-500/20 text-blue-300 border-blue-400/30'
                      }`}>
                        {article.category.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className={`p-6 ${index === 0 ? 'lg:p-8' : ''}`}>
                    <h3 className={`font-bold text-gray-800 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2 ${
                      index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'
                    }`}>
                      {article.title}
                    </h3>
                    
                    <p className={`text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 ${
                      index === 0 ? 'text-lg' : 'text-base'
                    }`}>
                      {article.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta Info */}
                    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <span className="font-medium">{article.author}</span>
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                    </div>

                    {/* Read More Button */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold">
                        Read Full Article
                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">No Articles Found</h3>
            <p className="text-gray-600 dark:text-gray-400">No articles match the selected category.</p>
          </div>
        )}

        {/* Newsletter Subscription */}
        <section className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Never Miss a Story</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest cricket news delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default News;
