import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { AIProcessingSteps } from './AIProcessingSteps';

interface LoadingOverlayProps {
  progress: number;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ progress }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (progress < 25) setCurrentStep(0);
    else if (progress < 50) setCurrentStep(1);
    else if (progress < 75) setCurrentStep(2);
    else setCurrentStep(3);
  }, [progress]);

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-10">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: {
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="inline-block"
          >
            <Loader2 className="h-16 w-16 text-cyan-400" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <p className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
              AI Processing
            </p>
            <p className="text-gray-400 text-sm mt-2">
              {Math.round(progress)}% Complete
            </p>
          </motion.div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
          <AIProcessingSteps currentStep={currentStep} />
        </div>

        <motion.div 
          className="mt-6 h-1 bg-gray-700 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </div>
    </div>
  );
};