import React from 'react';
import { useInView } from 'react-intersection-observer';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { motion } from 'framer-motion';

interface ProductGridProps {
  products: Product[];
  onTryOn: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onTryOn }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl font-bold text-gray-900 mb-8 text-center"
        >
          Featured Collection
        </motion.h2>
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onTryOn={onTryOn} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};