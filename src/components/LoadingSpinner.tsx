import React from 'react';
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  text?: string;
  size?: 'small' | 'default' | 'large';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  text = "Loading...",
  size = "default"
}) => {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-8 h-8",
    large: "w-12 h-12"
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="text-center space-y-3">
        <div className="relative">
          <Loader2 
            className={`${sizeClasses[size]} animate-spin mx-auto text-primary`} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent blur-sm" />
        </div>
        {text && (
          <p className="text-sm text-gray-600 animate-pulse font-medium">
            {text}
          </p>
        )}
      </div>
    </div>
  );
};
