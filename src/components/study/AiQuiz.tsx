'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface AiQuizProps {
  postId: string;
  postCategory: string;
  postContent: string;
}

export default function AiQuiz({
  postId,
  postCategory,
  postContent,
}: AiQuizProps) {
  const [quiz, setQuiz] = useState<{
    question: string;
    answer: boolean;
  } | null>(null);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const total = 3;
  const current = 1;
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.post(`/api/post/ai/${postId}`, {
          postCategory,
          postContent,
        });

        setQuiz({
          question: res.data.data.postContent,
          answer: res.data.data.quizAnswer,
        });
      } catch (err) {
        console.error('퀴즈 요청 실패:', err);
      }
    };

    fetchQuiz();
  }, [postId, postCategory, postContent]);

  const handleAnswer = (selected: boolean) => {
    setUserAnswer(selected);
    setIsCorrect(selected === quiz?.answer);
  };

  return (
    <div className='w-full'>
      {quiz ? (
        <>
          <div className='p-3'>
            <span>{quiz.question}</span>
          </div>
          <div className='flex justify-between py-10'>
            <button className='flex w-10 h-10 rounded-full justify-center items-center hover:bg-[#f5f5f5]'>
              <ChevronLeft />
            </button>
            <button className='flex w-10 h-10 rounded-full justify-center items-center hover:bg-[#f5f5f5]'>
              <ChevronRight />
            </button>
          </div>
          <div className='flex justify-center items-center mx-auto space-x-5 py-2'>
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
              <span className='text-[#DC4C51] font-bold text-[70px] mx-auto'>
                X
              </span>
            </button>
          </div>
          <span className='flex tm4 justify-end'>
            {current}/{total}
          </span>
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
