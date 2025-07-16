'use client';

import { EllipsisVertical } from 'lucide-react';
import WriteComment from '@/components/common/WriteComment';
import Modal from '@/components/common/Modal';
import { useEffect, useRef, useState } from 'react';
import ClickVerticalMenu from '@/components/common/ClickVerticalMenu';
import { useRouter } from 'next/navigation';
import AiQuiz from '@/components/study/AiQuiz';
import CommentList from '@/components/common/CommentList';

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuIsOpen, menuSetIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const handleGoToPr = () => {
    router.push('/profile/pr');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        menuSetIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className='w-[898px] mx-auto'>
        <div className='flex justify-between'>
          <div className='tag-type3 red tb5'>
            <span>공지</span>
          </div>
          <div className='relative' ref={menuRef}>
            <button
              className={`flex w-10 h-10 rounded-[10px] justify-center items-center ${
                menuIsOpen ? 'bg-[#f5f5f5]' : 'hover:bg-[#f5f5f5]'
              }`}
              onClick={() => menuSetIsOpen((prev) => !prev)}
            >
              <EllipsisVertical />
            </button>
            {menuIsOpen && <ClickVerticalMenu title='내 게시물' />}
          </div>
        </div>

        <div className='tb2'>
          <span>오늘 공부한 내용 정리해서 올립니다!</span>
        </div>
        <div className='flex space-x-6 items-center my-6 justify-between'>
          <div className='flex justify-center items-center'>
            <button
              className='w-[50px] h-[50px] rounded-full bg-gray-300 mr-5'
              onClick={handleGoToPr}
            ></button>
            <button className='tm3 ' onClick={handleGoToPr}>
              닉네임
            </button>
          </div>

          <div>
            <span className='opacity-50 mr-3 tm4'>2025-07-02</span>
          </div>
        </div>
        <div
          className='w-full h-[600px] my-10 border-[1px] rounded-[10px] p-5'
          style={{ borderColor: 'var(--color-border3)' }}
        >
          내용
        </div>
        <div className='flex justify-end'>
          <button
            className='button-type4 mb-10 hover:bg-[#292929] '
            onClick={() => setIsOpen(true)}
          >
            <span className='tm4'>AI 퀴즈 풀기</span>
          </button>
        </div>
        <div className='w-[898px]'>
          <WriteComment />
        </div>
        <div className='w-[898px]'>
          <CommentList studyId={1} postId={4} />
        </div>
        {isOpen && (
          <Modal
            title=''
            onClose={() => setIsOpen(false)}
            className='w-[680px] h-auto'
          >
            <AiQuiz
              postId={'1'} // 더미 데이터
              postCategory='자유 게시글'
              postContent='자바에서 클래스와 객체의 차이에 대해 설명한 스터디 요약입니다.'
            />
          </Modal>
        )}
      </div>
    </>
  );
}
