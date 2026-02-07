'use client';

import React, { useState } from 'react';
import { LoveLetter } from '@/lib/results/types';

interface ShareButtonProps {
  letter: LoveLetter;
}

export default function ShareButton({ letter }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const formatLetterForSharing = (letter: LoveLetter): string => {
    return `${letter.dateStamp}

${letter.opening}

${letter.body}

${letter.closing}`;
  };

  const handleCopy = async () => {
    const text = formatLetterForSharing(letter);
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    const text = formatLetterForSharing(letter);
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Valentine's Day Letter",
          text: text,
        });
      } catch (err) {
        // User cancelled or error occurred
        console.error('Share failed:', err);
      }
    } else {
      // Fallback to copy
      handleCopy();
    }
  };

  return (
    <button
      onClick={handleShare}
      className="px-10 py-4 rounded-full font-medium text-lg transition-all hover:opacity-90 shrink-0"
      style={{ backgroundColor: '#FFCBC0', color: '#9b1e1e' }}
    >
      {copied ? 'Copied! ✓' : 'Share your plan with your valentine'}
    </button>
  );
}
