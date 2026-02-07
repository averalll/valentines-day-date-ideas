import { Suspense } from 'react';
import ResultContent from '@/components/result/ResultContent';

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: '#670001' }}
        >
          <div className="text-valentine-dark-red font-cormorant">
            Loading...
          </div>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
