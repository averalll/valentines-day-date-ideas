'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPlanById } from '@/lib/results/date-plans';
import { LoveLetter, NON_NEGOTIABLES } from '@/lib/results/types';
import ShareButton from './ShareButton';

const DATE_STAMP = "02/14 – Happy Valentine's Day";

function formatBody(body: string) {
  return body.split('\n\n').map((paragraph, index) => (
    <p key={index} className="mb-4 last:mb-0">
      {paragraph}
    </p>
  ));
}

export default function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams.get('planId');
  const [letter, setLetter] = useState<LoveLetter | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!planId) {
      router.replace('/selection');
      return;
    }

    const plan = getPlanById(planId);
    if (!plan) {
      setNotFound(true);
      return;
    }

    setLetter({
      opening: plan.letter.opening,
      body: plan.letter.body,
      closing: plan.letter.closing,
      dateStamp: DATE_STAMP,
      nonNegotiables: NON_NEGOTIABLES,
    });
  }, [planId, router]);

  if (!planId) {
    return null;
  }

  if (notFound) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{ backgroundColor: '#670001' }}
      >
        <p className="font-cormorant text-center mb-6" style={{ color: '#FFC9C0' }}>
          We couldn&apos;t find that date plan.
        </p>
        <Link
          href="/selection"
          className="underline font-cormorant"
          style={{ color: '#FFC9C0' }}
        >
          Choose your date again
        </Link>
      </div>
    );
  }

  if (!letter) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#670001' }}
      >
        <div className="font-cormorant" style={{ color: '#FFC9C0' }}>
          Loading your letter...
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-12"
      style={{ backgroundColor: '#670001' }}
    >
      <div className="w-full max-w-[600px] flex flex-col items-center gap-10">
        <div className="text-center space-y-2">
          <h1 className="font-beau-rivage text-3xl md:text-4xl" style={{ color: '#FFC9C0' }}>
            Your date is planned!
          </h1>
          <p className="font-cormorant text-lg" style={{ color: '#FFC9C0' }}>
            Here&apos;s your letter.
          </p>
        </div>

        <div
          className="w-full rounded-2xl p-8 md:p-10 border shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
          style={{ backgroundColor: '#8C2739', color: '#FFC9C0', borderColor: 'rgba(255, 201, 192, 0.3)' }}
        >
          <div className="text-right text-sm font-cormorant font-medium mb-6" style={{ color: '#FFC9C0' }}>
            {letter.dateStamp}
          </div>

          <div className="font-beau-rivage text-xl md:text-2xl mb-6" style={{ color: '#FFC9C0' }}>
            {letter.opening}
          </div>

          <div className="font-cormorant text-base md:text-lg leading-relaxed" style={{ color: '#FFC9C0' }}>
            {formatBody(letter.body)}
          </div>

          <div className="font-cormorant text-lg md:text-xl italic mt-6" style={{ color: '#FFC9C0' }}>
            {letter.closing}
          </div>
        </div>

        <div className="w-full flex flex-row items-center justify-center gap-6">
          <ShareButton letter={letter} />
          <Link
            href="/"
            className="px-10 py-4 rounded-full font-medium text-lg transition-all hover:opacity-90 shrink-0"
            style={{ color: '#FFCBC0', border: '1px solid #FFCBC0', backgroundColor: 'transparent' }}
          >
            Start Over
          </Link>
        </div>

        <hr className="w-full border-t my-8" style={{ borderColor: 'rgba(255, 201, 192, 0.3)' }} />

        <div className="w-full text-left">
          <h2 className="font-beau-rivage text-2xl md:text-3xl mb-6" style={{ color: '#FFC9C0' }}>
            A few gentle reminders
          </h2>
          <ul className="font-cormorant text-base space-y-3 list-disc pl-6" style={{ color: '#FFC9C0' }}>
            <li>Get some flowers — even one is more than enough</li>
            <li>Be kind (this one should be obvious, but still)</li>
            <li>If something doesn&apos;t go as planned, don&apos;t panic</li>
            <li>Put your phone away for a bit</li>
            <li>Don&apos;t overthink it — showing up matters</li>
            <li>Don&apos;t forget dessert</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
