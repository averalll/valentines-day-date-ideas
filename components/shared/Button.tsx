import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
}: ButtonProps) {
  const baseStyles = 'px-6 py-4 rounded-2xl font-medium text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-valentine-deep text-white hover:opacity-90 active:scale-95',
    secondary: 'bg-valentine-card-pink text-valentine-dark-red border-2 border-valentine-dark-red hover:opacity-90 active:scale-95',
    ghost: 'text-valentine-dark-red hover:bg-valentine-card-pink/50 active:scale-95',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
