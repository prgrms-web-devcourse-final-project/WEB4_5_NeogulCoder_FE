'use client';

import { EllipsisVertical } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import ClickVerticalMenu from './ClickVerticalMenu';
import { useRouter } from 'next/navigation';
// import Image from 'next/image';

type CommentProps = {
  nickname: string;
  profileImageUrl?: string;
  content: string;
  createdAt?: string;
  isMyComment?: boolean;
};

export default function Comment({
  nickname,
  // profileImageUrl,
  content,
  createdAt,
  isMyComment = false,
}: CommentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 상수로 사용하기
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

  // util로 빼기
  const formatDate = (isoDate?: string) => {
    if (!isoDate) return '';
    return new Date(isoDate).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className='flex w-full my-3 items-start mb-6'>
      <div>
        <button
          className='w-[50px] h-[50px] rounded-full overflow-hidden bg-gray-300 mr-5'
          onClick={handleGoToPr}
        >
          {/* {profileImageUrl && (
            <Image src={profileImageUrl} alt='프로필' width={50} height={50} />
          )} */}
        </button>
      </div>
      <div className='flex flex-col flex-1'>
        <div className='flex justify-between items-start'>
          <div className='flex'>
            <button
              className='tm4'
              onClick={handleGoToPr}
              style={{ color: 'var(--color-text1)' }}
            >
              {nickname}
            </button>
            {createdAt && (
              <div
                className='tm5 ml-[6px] mt-[5px] opacity-50'
                style={{ color: 'var(--color-text1)' }}
              >
                {formatDate(createdAt)}
              </div>
            )}
          </div>

          {isMyComment && (
            <div className='relative' ref={menuRef}>
              <button
                className={`flex w-10 h-10 rounded-[10px] justify-center items-center ${
                  isOpen ? 'bg-[#f5f5f5]' : 'hover:bg-[#f5f5f5]'
                }`}
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <EllipsisVertical className='w-5 h-5' />
              </button>
              {isOpen && <ClickVerticalMenu title='내 댓글' />}
            </div>
          )}
        </div>

        <div className='tm4 mt-[-10px]' style={{ color: 'var(--color-text1)' }}>
          {content}
        </div>
      </div>
    </div>
  );
}
