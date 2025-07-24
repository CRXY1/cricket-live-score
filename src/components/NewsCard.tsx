import React from 'react';
import { NewsArticle } from '../types/cricket';

interface NewsCardProps {
    article: NewsArticle;
    featured?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, featured = false }) => {
    return (
        <div 
            className={`bg-white dark:bg-dark-800 border dark:border-dark-700 rounded-lg shadow-md dark:shadow-xl overflow-hidden transition-all duration-200 hover:shadow-xl dark:hover:shadow-2xl hover:scale-[1.02] ${
                featured ? 'col-span-2 md:col-span-3' : ''
            }`}
        >
            <div className="relative">
                <img 
                    src={article.image} 
                    alt={article.title}
                    className={`w-full object-cover ${featured ? 'h-96' : 'h-48'}`}
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 dark:bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        {article.category}
                    </span>
                </div>
            </div>
            <div className="p-4">
                <h3 className={`font-bold text-gray-800 dark:text-gray-100 mb-2 ${featured ? 'text-2xl' : 'text-lg'}`}>
                    {article.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{article.summary}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>{article.author}</span>
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
