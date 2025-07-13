'use client';

import { EllipsisVertical } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import ClickVerticalMenu from './ClickVerticalMenu';
import { useRouter } from 'next/navigation';

export default function Comment() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const handleGoToPr = () => {
    router.push('/profile/pr');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className='flex w-full my-3 items-start mb-6'>
        <div>
          <button
            className='w-[50px] h-[50px] rounded-full bg-gray-300 mr-5'
            onClick={handleGoToPr}
          ></button>
        </div>
        <div className='flex flex-col flex-1'>
          <div className='flex justify-between items-start'>
            <div className='flex'>
              <button
                className='tb3'
                onClick={handleGoToPr}
                style={{ color: 'var(--color-text1)' }}
              >
                닉네임
              </button>
              <div
                className='tm4 ml-[6px] mt-[5px] opacity-50'
                style={{ color: 'var(--color-text1)' }}
              >
                3분 전
              </div>
            </div>

            <div className='relative' ref={menuRef}>
              <button
                className={`flex w-10 h-10 rounded-full justify-center items-center ${
                  isOpen ? 'bg-[#f5f5f5]' : 'hover:bg-[#f5f5f5]'
                }`}
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <EllipsisVertical />
              </button>
              {isOpen && <ClickVerticalMenu title='내 댓글' />}
            </div>
          </div>

          <div
            className='tm2 mt-[-10px]'
            style={{ color: 'var(--color-text1)' }}
          >
            댓글 작성 댓글 작성
          </div>
        </div>
      </div>
    </>
  );
}
