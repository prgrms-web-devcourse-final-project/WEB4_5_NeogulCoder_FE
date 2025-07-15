'use client';

import { ChevronLeft, ChevronRight, EllipsisVertical } from 'lucide-react';
import Comment from '@/components/common/Comment';
import WriteComment from '@/components/common/WriteComment';
import Modal from '@/components/common/Modal';
import { useEffect, useRef, useState } from 'react';
import ClickVerticalMenu from '@/components/common/ClickVerticalMenu';
import { useRouter } from 'next/navigation';

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
                isOpen ? 'bg-[#f5f5f5]' : 'hover:bg-[#f5f5f5]'
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
          <Comment />
        </div>
        {isOpen && (
          <Modal
            title=''
            onClose={() => setIsOpen(false)}
            className='w-[680px] h-auto'
          >
            <div className='w-full'>
              <div className='p-3'>
                <span>
                  Q.HTML은 프로그래밍 언어이다. Q.HTML은 프로그래밍 언어이다.
                  Q.HTML은 프로그래밍 언어이다. Q.HTML은 프로그래밍 언어이다.
                </span>
              </div>
              <div className=' flex justify-between py-10'>
                <button className='flex w-10 h-10 rounded-full justify-center items-center hover:bg-[#f5f5f5]'>
                  <ChevronLeft />
                </button>
                <button className='flex w-10 h-10 rounded-full justify-center items-center hover:bg-[#f5f5f5]'>
                  <ChevronRight />
                </button>
              </div>
              <div className='flex justify-center items-center mx-auto space-x-5 py-2'>
                <button
                  className='w-[200px] h-[104px] border-[1px] rounded-[10px] hover:bg-[#f5f5f5]'
                  style={{ borderColor: 'var(--color-border3)' }}
                >
                  <span className='text-[#90CFF1] font-bold text-[70px]'>
                    O
                  </span>
                </button>
                <button
                  className='w-[200px] h-[104px] border-[1px] rounded-[10px] hover:bg-[#f5f5f5]'
                  style={{ borderColor: 'var(--color-border3)' }}
                >
                  <span className='text-[#FBAE8F] font-bold text-[70px] mx-auto'>
                    X
                  </span>
                </button>
              </div>
              <span className='flex tm4 justify-end'>2/3</span>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}
