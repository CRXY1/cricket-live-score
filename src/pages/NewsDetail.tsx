import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { NewsArticle } from '../types/cricket';
import { fetchNewsArticle, fetchLatestNews } from '../services/api';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);
  const [readingProgress, setReadingProgress] = useState(0);
  const [shareMessage, setShareMessage] = useState('');
  const [isShareDropdownOpen, setIsShareDropdownOpen] = useState(false);

  // Share functionality
  const handleShare = async () => {
    if (!article) return;

    const shareData = {
      title: article.title,
      text: article.summary,
      url: window.location.href,
    };

    try {
      // Check if Web Share API is available (mostly mobile devices)
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy URL to clipboard
        await navigator.clipboard.writeText(window.location.href);
        setShareMessage('Link copied to clipboard!');
        setTimeout(() => setShareMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback for older browsers
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShareMessage('Link copied to clipboard!');
        setTimeout(() => setShareMessage(''), 3000);
      } catch (clipboardError) {
        console.error('Clipboard error:', clipboardError);
        setShareMessage('Unable to share. Please copy the URL manually.');
        setTimeout(() => setShareMessage(''), 3000);
      }
    }
  };

  useEffect(() => {
    // Simulate API call to fetch article
    const fetchArticle = async () => {
      if (!id) return;
      
      setIsLoading(true);
      
      try {
        // Fetch the specific article
        const foundArticle = await fetchNewsArticle(id);
        setArticle(foundArticle);
        
        // Get related articles (excluding current article)
        const allArticles = await fetchLatestNews();
        const related = allArticles.filter(a => a.id !== id).slice(0, 3);
        setRelatedArticles(related);
      } catch (error) {
        console.error('Error fetching article:', error);
        setArticle(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  // Scroll to top when component mounts or article ID changes
  useEffect(() => {
    // Add a small delay to ensure the page has rendered
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
    
    return () => clearTimeout(timer);
  }, [id]);

  // Reading progress calculation
  useEffect(() => {
    const calculateReadingProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', calculateReadingProgress);
    return () => window.removeEventListener('scroll', calculateReadingProgress);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-xl font-semibold">
            Loading article...
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📰</div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Article Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">The article you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/news')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to News
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-dark-700 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      <main className="min-h-screen bg-gray-50 dark:bg-dark-900 pt-safe">
        {/* Hero Section */}
        <div className="relative h-[60vh] md:h-[70vh] overflow-hidden mt-2 md:mt-0">
          {/* Background Image with Parallax Effect */}
          <div 
            className="absolute inset-0 bg-cover bg-center transform scale-110 transition-transform duration-700 ease-out hover:scale-105"
            style={{ 
              backgroundImage: `url(${article.image})`,
              filter: 'brightness(0.6)'
            }}
          ></div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          
          {/* Content */}
          <div className="relative h-full container mx-auto px-4 flex items-end pb-8 md:pb-16">
            <div className="max-w-4xl animate-fade-in-up">
              {/* Category Badge */}
              <div className="mb-3 md:mb-4">
                <span className={`inline-flex items-center px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold backdrop-blur-md border ${
                  article.category === 'match-report' 
                    ? 'bg-green-500/20 text-green-300 border-green-400/30' 
                    : article.category === 'analysis'
                    ? 'bg-purple-500/20 text-purple-300 border-purple-400/30'
                    : 'bg-blue-500/20 text-blue-300 border-blue-400/30'
                }`}>
                  <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  {article.category.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              
              {/* Title */}
              <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
                {article.title}
              </h1>
              
              {/* Summary */}
              <p className="text-base md:text-xl text-gray-200 mb-6 md:mb-8 max-w-3xl leading-relaxed">
                {article.summary}
              </p>
              
              {/* Author & Date */}
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 text-gray-300">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm md:text-lg">
                      {article.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm md:text-base">{article.author}</p>
                    <p className="text-xs md:text-sm">{new Date(article.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                </div>
                
                {/* Share Button */}
                <button 
                  onClick={handleShare}
                  className="md:ml-auto bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2 md:px-6 md:py-3 rounded-full transition-all duration-300 hover:scale-105 border border-white/20 flex items-center space-x-2 w-fit"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span className="text-sm md:text-base">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-4 md:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Navigation Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="mb-0 md:mb-8 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors group mt-2 md:mt-0"
            >
              <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to News
            </button>

            {/* Article Body */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl dark:shadow-2xl p-6 md:p-8 lg:p-12 border border-gray-100 dark:border-dark-700">
              {/* Tags */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg">
                {/* Render article content */}
                <div className="prose-content">
                  {/* Summary as highlighted intro */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg mb-8 border-l-4 border-blue-500">
                    <p className="text-lg font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  {/* Main content */}
                  <div className="space-y-6">
                    {article.content.split('\n').map((paragraph, index) => (
                      paragraph.trim() && (
                        <p key={index} className="text-lg leading-relaxed">
                          {paragraph.trim()}
                        </p>
                      )
                    ))}
                  </div>

                  {/* Additional content for better presentation */}
                  <div className="mt-8 p-6 bg-gray-50 dark:bg-dark-700 rounded-lg">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Key Highlights</h3>
                    <ul className="space-y-2">
                      {article.tags.map((tag, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                          <span className="capitalize text-gray-700 dark:text-gray-300">{tag} related coverage and analysis</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Share Section */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-800/30">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Share this article</h3>
              
              {/* Mobile Dropdown - Only visible on mobile */}
              <div className="md:hidden relative inline-block">
                {/* Dropdown Button for Mobile */}
                <button
                  onClick={() => setIsShareDropdownOpen(!isShareDropdownOpen)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center space-x-2 min-w-[140px]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span>Share Article</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${isShareDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Mobile Dropdown Menu */}
                <div className={`absolute top-full left-0 mt-2 w-64 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-lg shadow-2xl overflow-hidden z-20 transition-all duration-300 ease-in-out transform ${
                  isShareDropdownOpen 
                    ? 'opacity-100 visible translate-y-0 scale-100' 
                    : 'opacity-0 invisible -translate-y-2 scale-95'
                }`}>
                  {[
                    { 
                      name: 'Twitter', 
                      icon: '🐦', 
                      color: 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400',
                      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(article?.title || '')}&url=${encodeURIComponent(window.location.href)}`
                    },
                    { 
                      name: 'Facebook', 
                      icon: '📘', 
                      color: 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300',
                      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
                    },
                    { 
                      name: 'LinkedIn', 
                      icon: '💼', 
                      color: 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-800 dark:hover:text-blue-200',
                      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
                    },
                    { 
                      name: 'WhatsApp', 
                      icon: '💬', 
                      color: 'hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400',
                      url: `https://wa.me/?text=${encodeURIComponent(`${article?.title || ''} - ${window.location.href}`)}`
                    },
                    { 
                      name: 'Copy Link', 
                      icon: '🔗', 
                      color: 'hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400',
                      url: null
                    }
                  ].map((social, index) => (
                    <button 
                      key={social.name}
                      onClick={() => {
                        if (social.name === 'Copy Link') {
                          navigator.clipboard.writeText(window.location.href);
                          setShareMessage('Link copied to clipboard!');
                          setTimeout(() => setShareMessage(''), 3000);
                        } else {
                          window.open(social.url!, '_blank', 'noopener,noreferrer');
                        }
                        setIsShareDropdownOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-200 ${social.color} text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-dark-700 last:border-b-0`}
                    >
                      <span className="text-xl flex-shrink-0">{social.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium">{social.name}</div>
                        <div className="text-xs opacity-75">
                          {social.name === 'Twitter' ? 'Share on Twitter' :
                           social.name === 'Facebook' ? 'Share on Facebook' :
                           social.name === 'LinkedIn' ? 'Share on LinkedIn' :
                           social.name === 'WhatsApp' ? 'Send via WhatsApp' :
                           'Copy article link'}
                        </div>
                      </div>
                      <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  ))}
                </div>

                {/* Backdrop to close dropdown when clicking outside */}
                {isShareDropdownOpen && (
                  <div 
                    className="fixed inset-0 z-10"
                    onClick={() => setIsShareDropdownOpen(false)}
                  />
                )}
              </div>

              {/* Desktop Spread-out Layout - Only visible on desktop */}
              <div className="hidden md:block">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                  {[
                    { 
                      name: 'Twitter', 
                      icon: '🐦', 
                      bgColor: 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500',
                      shadowColor: 'hover:shadow-blue-500/30',
                      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(article?.title || '')}&url=${encodeURIComponent(window.location.href)}`
                    },
                    { 
                      name: 'Facebook', 
                      icon: '📘', 
                      bgColor: 'bg-blue-700 hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700',
                      shadowColor: 'hover:shadow-blue-700/30',
                      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
                    },
                    { 
                      name: 'LinkedIn', 
                      icon: '💼', 
                      bgColor: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600',
                      shadowColor: 'hover:shadow-blue-600/30',
                      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
                    },
                    { 
                      name: 'WhatsApp', 
                      icon: '💬', 
                      bgColor: 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500',
                      shadowColor: 'hover:shadow-green-500/30',
                      url: `https://wa.me/?text=${encodeURIComponent(`${article?.title || ''} - ${window.location.href}`)}`
                    },
                    { 
                      name: 'Copy Link', 
                      icon: '🔗', 
                      bgColor: 'bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-500',
                      shadowColor: 'hover:shadow-purple-500/30',
                      url: null
                    }
                  ].map((social, index) => (
                    <button 
                      key={social.name}
                      onClick={() => {
                        if (social.name === 'Copy Link') {
                          navigator.clipboard.writeText(window.location.href);
                          setShareMessage('Link copied to clipboard!');
                          setTimeout(() => setShareMessage(''), 3000);
                        } else {
                          window.open(social.url!, '_blank', 'noopener,noreferrer');
                        }
                      }}
                      className={`group relative ${social.bgColor} text-white rounded-lg px-6 py-5 transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${social.shadowColor} hover:shadow-xl transform`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: 'fadeInUp 0.6s ease-out forwards'
                      }}
                    >
                      {/* Animated background gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Content */}
                      <div className="relative flex flex-col items-center space-y-3">
                        <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                          {social.icon}
                        </div>
                        <div className="font-semibold text-sm group-hover:text-white transition-colors duration-300">
                          {social.name}
                        </div>
                        
                        {/* Hover effect indicator */}
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300 rounded-full"></div>
                      </div>

                      {/* Ripple effect on click */}
                      <div className="absolute inset-0 rounded-lg opacity-0 group-active:opacity-30 bg-white transition-opacity duration-150"></div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Share Message */}
              {shareMessage && (
                <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg border border-green-200 dark:border-green-700 animate-fade-in">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{shareMessage}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-white dark:bg-dark-800 py-16 border-t border-gray-200 dark:border-dark-700">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedArticles.map((relatedArticle, index) => (
                    <div 
                      key={relatedArticle.id}
                      className="group cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
                      onClick={() => navigate(`/news/${relatedArticle.id}`)}
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <div className="bg-gray-50 dark:bg-dark-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 dark:border-dark-600">
                        <div className="relative overflow-hidden">
                          <img 
                            src={relatedArticle.image} 
                            alt={relatedArticle.title}
                            className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-semibold">
                              {relatedArticle.category.replace('-', ' ')}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {relatedArticle.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                            {relatedArticle.summary}
                          </p>
                          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                            <span>{relatedArticle.author}</span>
                            <span>{new Date(relatedArticle.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
};

export default NewsDetail;
