import React from 'react';
import { FeaturedVideo } from '../types/cricket';

interface VideoCardProps {
    video: FeaturedVideo;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
    return (
        <div className="group relative rounded-lg overflow-hidden shadow-md">
            <div className="relative">
                <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded text-white text-sm">
                    {video.duration}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-200">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <svg 
                            className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
                            />
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1">{video.title}</h3>
                <span className="text-sm text-gray-500">
                    {new Date(video.date).toLocaleDateString()}
                </span>
            </div>
        </div>
    );
};

export default VideoCard;
