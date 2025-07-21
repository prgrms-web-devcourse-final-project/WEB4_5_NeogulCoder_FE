'use client';
import WithdrawalModal from '@/components/profile/WithdrawalModal';
import { axiosInstance } from '@/lib/api/axios';
import { userAuthStore } from '@/stores/userStore';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import deleteText from '@/assets/images/delete-text.svg';

export default function Withdrawal() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCheckRef = useRef<HTMLInputElement>(null);

  const user = userAuthStore((state) => state.user);

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

  // 회원 탈퇴
  const deleteUser = async (password: string) => {
    await axiosInstance.delete(`/api/users/delete/me`, {
      data: { password },
    });
  };

  const handleDeleteBtn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password && !passwordCheck) {
      passwordRef.current?.focus();
      return;
    }

    if (!password) {
      passwordRef.current?.focus();
      return;
    }

    if (!passwordCheck) {
      passwordCheckRef.current?.focus();
      return;
    }
    setIsModalOpen(true);
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(password);
      alert('탈퇴가 완료되었습니다.');
      setIsModalOpen(false);
      router.push('/auth/login');
    } catch (error) {
      console.log('회원탈퇴 실패: ', error);
    }
  };

  return (
    <>
      <div className='tb3'>회원 탈퇴</div>
      <div className='mt-[60px] flex flex-col items-center justify-center gap-10'>
        <div className='flex items-center gap-6 cursor-default'>
          <p className='w-[120px] text-left t4'>이메일(로그인 ID)</p>
          <div className='w-[390px] h-[50px] rounded-[10px] bg-gray4 flex items-center px-4 '>
            <span className='t4 text-text1/70'>{user?.email}</span>
          </div>
        </div>

        <div className='flex items-center gap-6'>
          <p className='w-[120px] text-left t4 cursor-default'>
            비밀번호 <span className='text-red'>(필수)</span>
          </p>
          <div className='relative'>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='input-type3 w-[390px] focus:outline-1 focus:outline-main'
              ref={passwordRef}
            />
            {password && (
              <Image
                src={deleteText}
                alt='전체 삭제'
                onClick={() => {
                  setPassword('');
                }}
                className='absolute w-4 h-4 right-5 top-1/2 -translate-y-1/2 cursor-pointer'
              />
            )}
          </div>
        </div>

        <div className='flex items-center gap-6'>
          <p className='w-[120px] text-left t4 cursor-default'>
            비밀번호 확인 <span className='text-red'>(필수)</span>
          </p>
          <div className='relative'>
            <input
              type='password'
              value={passwordCheck}
              className='input-type3 w-[390px] focus:outline-1 focus:outline-main'
              onChange={(e) => setPasswordCheck(e.target.value)}
              ref={passwordCheckRef}
            />
            {passwordCheck && (
              <Image
                src={deleteText}
                alt='전체 삭제'
                onClick={() => {
                  setPasswordCheck('');
                }}
                className='absolute w-4 h-4 right-5 top-1/2 -translate-y-1/2 cursor-pointer'
              />
            )}
          </div>
        </div>

        <div className='w-[534px] flex justify-end'>
          <button
            type='button'
            className='button-type1 hover:bg-[#292929]'
            onClick={handleDeleteBtn}
          >
            탈퇴하기
          </button>
        </div>
        {isModalOpen && (
          <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div className='absolute inset-0 bg-main opacity-80' />

            <div className='relative z-10'>
              <WithdrawalModal
                onClose={() => setIsModalOpen(false)}
                handleDeleteUser={handleDeleteUser}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
