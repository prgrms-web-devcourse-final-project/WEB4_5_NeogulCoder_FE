'use client';

import { useEffect, useState } from 'react';
import { fetchAiQuiz } from '@/lib/api/study/aiQuiz';
interface AiQuizProps {
  postId: number;
}

export default function AiQuiz({ postId }: AiQuizProps) {
  const [quizContent, setQuizContent] = useState('');
  const [quizAnswer, setQuizAnswer] = useState<boolean | null>(null);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await fetchAiQuiz(postId);
        setQuizContent(data.quizContent);
        setQuizAnswer(data.quizAnswer);
      } catch (err) {
        console.error('AI 퀴즈 로드 실패:', err);
      }
    };

    loadQuiz();
  }, [postId]);

  const handleAnswer = (selected: boolean) => {
    setUserAnswer(selected);
    setIsCorrect(selected === quizAnswer);
  };

  return (
    <div className='w-full rounded-[10px]'>
      {quizContent ? (
        <>
          <div className='p-3'>
            <span>{quizContent}</span>
          </div>

          <div className='flex justify-center items-center mx-auto space-x-5 py-10'>
            <button
              className='w-[200px] h-[104px] rounded-[10px] bg-[#EAF2FE] hover:bg-[#D6E6FD]'
              onClick={() => handleAnswer(true)}
            >
              <span className='text-[#4176F0] font-bold text-[70px]'>O</span>
            </button>
            <button
              className='w-[200px] h-[104px] rounded-[10px] bg-[#FCEEEF] hover:bg-[#FDE6EC]'
              onClick={() => handleAnswer(false)}
            >
              <span className='text-[#DC4C51] font-bold text-[70px]'>X</span>
            </button>
          </div>

          {userAnswer !== null && (
            <div className='text-center py-2 font-bold tm4'>
              {isCorrect ? '정답입니다! 🎉' : '틀렸어요 😢'}
            </div>
          )}
        </>
      ) : (
        <div className='text-center p-5'>AI 퀴즈를 불러오는 중입니다...</div>
      )}
    </div>
  );
}
