import React from 'react';
import { motion } from 'framer-motion';

interface HolographicEffectProps {
  children: React.ReactNode;
}

export const HolographicEffect: React.FC<HolographicEffectProps> = ({ children }) => {
  return (
    <div className="relative group">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-purple-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(0,255,255,0.2) 0%, rgba(128,0,255,0.2) 100%)",
            "linear-gradient(45deg, rgba(128,0,255,0.2) 0%, rgba(0,255,255,0.2) 100%)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      {children}
    </div>
  );
};