'use client';
import Image from 'next/image';
import photoUpload from '@/assets/images/photo-upload.svg';
import { useState } from 'react';
import PasswordChangeModal from '@/components/profile/PasswordChangeModal';

export default function EditProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState('박스영');

  return (
    <>
      <div className='tb3'>프로필 수정</div>
      <div className='mt-[60px] flex flex-col items-center justify-center'>
        <div className='w-[140px] h-[140px] rounded-full bg-gray4 relative'>
          <button className='absolute right-[5px] bottom-[5px]'>
            <Image src={photoUpload} alt='사진 등록' />
          </button>
        </div>
        <div>
          <p className='pb-2 mt-[60px] t4'>
            닉네임 <span className='text-red'>(필수)</span>
          </p>
          <input
            type='text'
            value={userName}
            className='input-type3 w-[390px] focus:outline-1 focus:outline-main mb-[5px]'
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className='flex flex-col items-start mt-8'>
          <button
            type='button'
            className='button-type1 mb-4 hover:bg-[#292929]'
          >
            저장
          </button>
          <button
            type='button'
            className='t4 self-end text-text1/50'
            onClick={() => setIsModalOpen(true)}
          >
            비밀번호 변경
          </button>

          {isModalOpen && (
            <div className='fixed inset-0 z-50 flex items-center justify-center'>
              <div className='absolute inset-0 bg-main opacity-80' />

              <div className='relative z-10'>
                <PasswordChangeModal onClose={() => setIsModalOpen(false)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
