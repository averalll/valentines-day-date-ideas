'use client';

import { useRouter } from 'next/navigation';
import { beauRivage } from '@/lib/fonts';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6" style={{ backgroundColor: '#670001' }}>
      <div className="w-full max-w-2xl text-center space-y-8">
        <h1
          className={`text-4xl md:text-5xl lg:text-6xl ${beauRivage.className} text-valentine-cream`}
        >
          Create Your Perfect Valentine&apos;s Day
        </h1>
        <p className="text-lg md:text-xl text-valentine-cream font-cormorant leading-relaxed max-w-xl mx-auto">
          Answer a few questions about what matters to you, and we&apos;ll create
          a beautiful love letter with your perfect date plan.
        </p>
        <div className="pt-4">
          <button
            onClick={() => router.push('/quiz')}
            className="px-10 py-4 rounded-full font-medium text-lg bg-valentine-button-light text-valentine-dark-red hover:opacity-90 transition-all"
          >
            Start the quiz
          </button>
        </div>
      </div>
    </div>
  );
}
