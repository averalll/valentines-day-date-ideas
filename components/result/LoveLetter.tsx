import React from 'react';
import { LoveLetter as LoveLetterType } from '@/lib/results/types';

interface LoveLetterProps {
  letter: LoveLetterType;
}

export default function LoveLetter({ letter }: LoveLetterProps) {
  const formatBody = (body: string) => {
    return body.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-4 last:mb-0 leading-relaxed">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="max-w-2xl mx-auto rounded-2xl p-8 md:p-10 bg-valentine-card-pink border-2 border-valentine-deep shadow-lg">
      <div className="text-valentine-dark-red">
        {/* Date Stamp */}
        <div className="text-right mb-6 text-valentine-deep text-sm font-medium font-cormorant">
          {letter.dateStamp}
        </div>

        {/* Opening */}
        <div className="text-2xl md:text-3xl mb-6 text-valentine-dark-red font-cormorant">
          {letter.opening}
        </div>

        {/* Body */}
        <div className="text-lg md:text-xl mb-8 leading-relaxed text-valentine-dark-red">
          {formatBody(letter.body)}
        </div>

        {/* Closing */}
        <div className="text-xl md:text-2xl mb-8 text-valentine-dark-red italic font-cormorant">
          {letter.closing}
        </div>

        {/* Non-negotiables removed from letter - shown separately on result page */}
      </div>
    </div>
  );
}
