import React from 'react';
import { QuizQuestion } from '@/lib/quiz/questions';
import { beauRivage } from '@/lib/fonts';
import OptionButton from './OptionButton';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedOptionId?: string;
  onOptionSelect: (optionId: string) => void;
}

export default function QuestionCard({
  question,
  selectedOptionId,
  onOptionSelect,
}: QuestionCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className={`text-[32px] md:text-[64px] ${beauRivage.className} text-valentine-dark-red mb-8 text-center text-balance`}>
        {question.question}
      </h2>
      
      <div className="space-y-4">
        {question.options.map((option) => (
          <OptionButton
            key={option.id}
            text={option.label}
            onClick={() => onOptionSelect(option.id)}
            isSelected={selectedOptionId === option.id}
          />
        ))}
      </div>
    </div>
  );
}
