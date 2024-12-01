import React from 'react';
import { motion } from 'framer-motion';
import { Scan, Zap, Sparkles, CheckCircle } from 'lucide-react';

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface AIProcessingStepsProps {
  currentStep: number;
}

export const AIProcessingSteps: React.FC<AIProcessingStepsProps> = ({ currentStep }) => {
  const steps: Step[] = [
    {
      icon: <Scan className="h-5 w-5" />,
      title: "Scanning Image",
      description: "Analyzing body proportions and pose"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "AI Processing",
      description: "Applying advanced AI algorithms"
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Garment Fitting",
      description: "Adjusting clothing to your measurements"
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: "Final Touches",
      description: "Enhancing visual quality"
    }
  ];

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ 
            opacity: index <= currentStep ? 1 : 0.5,
            x: 0 
          }}
          transition={{ delay: index * 0.2 }}
          className={`flex items-center space-x-3 ${
            index <= currentStep ? 'text-cyan-400' : 'text-gray-500'
          }`}
        >
          <div className="flex-shrink-0">{step.icon}</div>
          <div>
            <p className="font-medium">{step.title}</p>
            <p className="text-sm opacity-75">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};