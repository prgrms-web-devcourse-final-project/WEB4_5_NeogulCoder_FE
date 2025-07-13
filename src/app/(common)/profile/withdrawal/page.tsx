<<<<<<< HEAD
export default function page() {
  const userEmail = 'seoyoung@gmail.com';
  return (
    <>
      <div className="tm1">회원 탈퇴</div>
      <div className="mt-[60px] flex flex-col items-center justify-center gap-10">
        <div className="flex items-center gap-6 cursor-default">
          <p className="w-[120px] text-left tm4">이메일(로그인 ID)</p>
          <div className="w-[390px] h-[50px] rounded-[10px] bg-gray4 flex items-center px-4 ">
            <span className="t4 text-text1/70">{userEmail}</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <p className="w-[120px] text-left tm4 cursor-default">비밀번호</p>
          <input
            type="password"
            className="input-type3 w-[390px] focus:outline-2 focus:outline-main"
          />
        </div>

        <div className="flex items-center gap-6">
          <p className="w-[120px] text-left tm4 cursor-default">
            비밀번호 확인
          </p>
          <input
            type="password"
            className="input-type3 w-[390px] focus:outline-2 focus:outline-main"
          />
        </div>

        <div className="w-[534px] flex justify-end">
          <button type="button" className="button-type1">
            탈퇴하기
          </button>
        </div>
=======
'use client';
import WithdrawalModal from '@/components/profile/WithdrawalModal';
import { useEffect, useState } from 'react';

export default function page() {
  const userEmail = 'seoyoung@gmail.com';
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);
  return (
    <>
      <div className='tb2'>회원 탈퇴</div>
      <div className='mt-[60px] flex flex-col items-center justify-center gap-10'>
        <div className='flex items-center gap-6 cursor-default'>
          <p className='w-[120px] text-left t4'>이메일(로그인 ID)</p>
          <div className='w-[390px] h-[50px] rounded-[10px] bg-gray4 flex items-center px-4 '>
            <span className='t4 text-text1/70'>{userEmail}</span>
          </div>
        </div>

        <div className='flex items-center gap-6'>
          <p className='w-[120px] text-left t4 cursor-default'>
            비밀번호 <span className='text-red'>(필수)</span>
          </p>
          <input
            type='password'
            className='input-type3 w-[390px] focus:outline-1 focus:outline-main'
          />
        </div>

        <div className='flex items-center gap-6'>
          <p className='w-[120px] text-left t4 cursor-default'>
            비밀번호 확인 <span className='text-red'>(필수)</span>
          </p>
          <input
            type='password'
            className='input-type3 w-[390px] focus:outline-1 focus:outline-main'
          />
        </div>

        <div
          className='w-[534px] flex justify-end'
          onClick={() => setIsModalOpen(true)}
        >
          <button type='button' className='button-type1 hover:bg-[#292929]'>
            탈퇴하기
          </button>
        </div>
        {isModalOpen && (
          <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div className='absolute inset-0 bg-main opacity-80' />

            <div className='relative z-10'>
              <WithdrawalModal onClose={() => setIsModalOpen(false)} />
            </div>
          </div>
        )}
>>>>>>> dev
      </div>
    </>
  );
}
