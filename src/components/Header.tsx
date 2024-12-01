import React from 'react';
import { ShoppingBag, Camera } from 'lucide-react';

interface HeaderProps {
  onTryOnClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onTryOnClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-purple-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">AI Fashion</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onTryOnClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <Camera className="h-5 w-5 mr-2" />
              Virtual Try-On
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};