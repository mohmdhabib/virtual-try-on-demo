import React from 'react';
import { motion } from 'framer-motion';

export const ScanEffect: React.FC = () => {
  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-transparent"
      initial={{ top: "100%" }}
      animate={{
        top: ["100%", "0%", "100%"],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};