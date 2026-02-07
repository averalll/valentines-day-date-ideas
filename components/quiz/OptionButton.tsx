import React from 'react';

interface OptionButtonProps {
  text: string;
  onClick: () => void;
  isSelected?: boolean;
}

export default function OptionButton({ text, onClick, isSelected = false }: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      style={!isSelected ? { backgroundColor: '#FFCAC0' } : undefined}
      className={`
        w-full text-left p-5 md:p-6 rounded-2xl
        transition-all duration-200
        border
        ${isSelected 
          ? 'border-valentine-deep bg-valentine-deep' 
          : 'border-valentine-dark-red hover:border-valentine-deep'
        }
        active:scale-[0.98]
        min-h-[80px] md:min-h-[100px]
        flex items-center
      `}
    >
      <span className={`text-base md:text-lg leading-relaxed ${isSelected ? 'text-valentine-card-pink' : 'text-valentine-dark-red'}`}>
        {text}
      </span>
    </button>
  );
}
