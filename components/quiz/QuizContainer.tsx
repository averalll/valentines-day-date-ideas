'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { QUIZ_QUESTIONS } from '@/lib/quiz/questions';
import { QuizAnswers } from '@/lib/quiz/types';
import QuestionCard from './QuestionCard';
import ProgressIndicator from './ProgressIndicator';
import Card from '../shared/Card';

export default function QuizContainer() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === QUIZ_QUESTIONS.length - 1;
  const selectedOptionId = answers[currentQuestion.id];

  const handleOptionSelect = useCallback((optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  }, [currentQuestion.id]);

  const handleNext = useCallback(() => {
    if (!selectedOptionId) return;

    if (isLastQuestion) {
      // Store final answers in sessionStorage for selection page
      const finalAnswers = {
        ...answers,
        [currentQuestion.id]: selectedOptionId,
      };
      sessionStorage.setItem('quizAnswers', JSON.stringify(finalAnswers));
      
      // Navigate to selection page (user will choose from top 3)
      router.push('/selection');
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [selectedOptionId, isLastQuestion, answers, currentQuestion.id, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6">
      <Card className="w-full max-w-3xl !bg-[#FFCAC0]">
        <ProgressIndicator
          current={currentQuestionIndex + 1}
          total={QUIZ_QUESTIONS.length}
        />
        
        <QuestionCard
          question={currentQuestion}
          selectedOptionId={selectedOptionId}
          onOptionSelect={handleOptionSelect}
        />

        <div className="mt-8 flex justify-between w-full max-w-2xl mx-auto">
          <button
            type="button"
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
            className={`px-6 py-2 rounded-full font-medium text-lg transition-all duration-200 border border-valentine-dark-red text-valentine-dark-red hover:opacity-90 active:scale-95 ${currentQuestionIndex === 0 ? 'invisible' : ''}`}
            style={{ backgroundColor: '#FFCAC0' }}
          >
            Back
          </button>
          {selectedOptionId ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 rounded-full font-medium text-lg transition-all duration-200 bg-valentine-deep text-white hover:opacity-90 active:scale-95"
            >
              {isLastQuestion ? 'See My Options →' : 'Next'}
            </button>
          ) : (
            <div />
          )}
        </div>
      </Card>
    </div>
  );
}
