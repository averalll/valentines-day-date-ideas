import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`rounded-3xl p-6 md:p-8 shadow-lg bg-valentine-card-pink ${className}`}>
      {children}
    </div>
  );
}
