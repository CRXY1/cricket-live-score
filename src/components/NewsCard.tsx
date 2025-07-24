import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NewsArticle } from '../types/cricket';

interface NewsCardProps {
    article: NewsArticle;
    featured?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, featured = false }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/news/${article.id}`);
    };

    return (
        <div 
            onClick={handleClick}
            className={`bg-white dark:bg-dark-800 border dark:border-dark-700 rounded-lg shadow-md dark:shadow-xl overflow-hidden transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl hover:scale-[1.02] cursor-pointer group ${
                featured ? 'col-span-2 md:col-span-3' : ''
            }`}
        >
            <div className="relative overflow-hidden">
                <img 
                    src={article.image} 
                    alt={article.title}
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${featured ? 'h-96' : 'h-48'}`}
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 dark:bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                        {article.category.replace('-', ' ').toUpperCase()}
                    </span>
                </div>
                {/* Overlay for better hover effect */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>
            <div className="p-4">
                <h3 className={`font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 ${featured ? 'text-2xl' : 'text-lg'}`}>
                    {article.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{article.summary}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium">{article.author}</span>
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
                
                {/* Read More Button */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm">
                        Read More
                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
