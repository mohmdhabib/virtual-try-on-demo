import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, Share2, Download, Sparkles, Scan, Zap } from 'lucide-react';
import type { Product } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { HolographicEffect } from './FuturisticUI/HolographicEffect';
import { ScanEffect } from './FuturisticUI/ScanEffect';
import { LoadingOverlay } from './FuturisticUI/LoadingOverlay';

interface TryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: Product | null;
}

export const TryOnModal: React.FC<TryOnModalProps> = ({
  isOpen,
  onClose,
  selectedProduct,
}) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isProcessing) {
      const startTime = Date.now();
      const duration = 30000; // 30 seconds
      
      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / duration) * 100, 100);
        setProcessingProgress(progress);
        
        if (progress >= 100) {
          setIsProcessing(false);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
          clearInterval(interval);
        }
      }, 50); // Smaller interval for smoother progress
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isProcessing]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setIsProcessing(true);
      setProcessingProgress(0);
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: false
  });

  const resetImage = () => {
    setUploadedImage(null);
    setIsProcessing(false);
    setProcessingProgress(0);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 max-w-5xl w-full mx-4 shadow-2xl border border-purple-500/20"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Sparkles className="h-6 w-6 text-cyan-400" />
              </motion.div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                AI Virtual Try-On Chamber
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <HolographicEffect>
              <div className="relative rounded-lg overflow-hidden shadow-lg bg-gray-800 min-h-[400px]">
                {!uploadedImage ? (
                  <div
                    {...getRootProps()}
                    className={`h-full flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg transition-colors duration-300 ${
                      isDragActive
                        ? 'border-cyan-400 bg-cyan-400/10'
                        : 'border-gray-600 hover:border-purple-500/50 hover:bg-purple-500/10'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-300 text-center mb-2">
                      {isDragActive
                        ? 'Drop your image here...'
                        : 'Drag & drop your image here'}
                    </p>
                    <p className="text-gray-500 text-sm text-center">
                      or click to select a file
                    </p>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="w-full rounded-lg"
                    />
                    {isProcessing && (
                      <LoadingOverlay progress={processingProgress} />
                    )}
                    {!isProcessing && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                        <button
                          onClick={resetImage}
                          className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors shadow-lg"
                        >
                          Upload New
                        </button>
                        <button
                          onClick={() => {}}
                          className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
                        >
                          <Share2 className="h-4 w-4" />
                          <span>Share</span>
                        </button>
                        <button
                          onClick={() => {}}
                          className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
                        >
                          <Download className="h-4 w-4" />
                          <span>Save</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </HolographicEffect>

            <div className="flex flex-col text-white">
              {selectedProduct && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-2">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-gray-300 mb-4">{selectedProduct.description}</p>
                    <HolographicEffect>
                      <div className="relative rounded-lg overflow-hidden shadow-md">
                        <img
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          className="w-full h-[300px] object-cover"
                        />
                        <ScanEffect />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
                          <p className="text-white text-xl font-bold">
                            ${selectedProduct.price}
                          </p>
                        </div>
                      </div>
                    </HolographicEffect>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};