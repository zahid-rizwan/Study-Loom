import React from 'react';
import { FileText } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-6 md:bottom-8 md:right-8 z-50 btn-primary bg-green-600 hover:bg-green-700 
        rounded-full p-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
    >
      <FileText className="w-6 h-6" />
      <span className="ml-2">Add Study Session</span>
    </button>
  );
};

export default FloatingActionButton;