
import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce">
      <div className="bg-slate-900/90 text-white border border-cyan-500/50 px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 backdrop-blur-md">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
        <span className="font-semibold text-sm tracking-wide">{message}</span>
      </div>
    </div>
  );
};
