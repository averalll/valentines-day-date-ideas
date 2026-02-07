import React from 'react';

interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export default function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  return (
    <div className="w-full mb-4 text-center">
      <span className="text-sm text-valentine-dark-red font-medium">
        Question: {current}/{total}
      </span>
    </div>
  );
}
