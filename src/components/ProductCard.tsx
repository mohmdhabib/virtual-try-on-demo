import React from 'react';
import { motion } from 'framer-motion';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onTryOn: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onTryOn }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="relative aspect-w-3 aspect-h-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[300px] object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="mt-1 text-gray-500">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-purple-600">${product.price}</span>
          <button
            onClick={() => onTryOn(product)}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Try On
          </button>
        </div>
      </div>
    </motion.div>
  );
};