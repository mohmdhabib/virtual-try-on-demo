import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';
import { HolographicEffect } from './FuturisticUI/HolographicEffect';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-7xl px-6 lg:px-8"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <Sparkles className="h-12 w-12 text-cyan-400" />
              <motion.div
                className="absolute inset-0"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Zap className="h-12 w-12 text-purple-500" />
              </motion.div>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text sm:text-6xl"
          >
            The Future of Fashion is Here
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto"
          >
            Step into our virtual fitting room powered by advanced AI technology. Experience clothes like never before with real-time virtual try-ons.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <HolographicEffect>
              <a
                href="#products"
                className="relative bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 text-lg font-semibold text-white rounded-full shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
              >
                Enter Virtual Showroom
              </a>
            </HolographicEffect>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};