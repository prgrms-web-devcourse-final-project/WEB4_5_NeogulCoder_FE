'use client';
import WithdrawalModal from '@/components/profile/WithdrawalModal';
import { userAuthStore } from '@/stores/userStore';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import deleteText from '@/assets/images/delete-text.svg';
import { toast } from 'react-toastify';
import axiosInstance from '@/lib/api/axiosInstance';
import { Eye, EyeOff } from 'lucide-react';

export default function WithdrawalClient() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCheckRef = useRef<HTMLInputElement>(null);
  const user = userAuthStore((state) => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);

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
  const deleteUser = async (password: string, passwordCheck: string) => {
    await axiosInstance.delete(`/api/users/delete/me`, {
      data: { password, passwordCheck },
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
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await deleteUser(password, passwordCheck);
      toast.success('탈퇴가 완료되었습니다.');
      setIsModalOpen(false);
      router.push('/auth/login');
    } catch (error) {
      console.log('회원탈퇴 실패: ', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className='hidden lg:block tb3'>회원 탈퇴</div>
      <div className='-mt-[30px] lg:mt-[60px] w-full max-w-[534px] mx-auto flex flex-col items-stretch justify-center gap-10'>
        <div className='flex flex-col lg:flex-row lg:items-center gap-6 cursor-default'>
          <p className='t4 text-left w-full lg:w-[120px]'>이메일(로그인 ID)</p>
          <div className='w-full lg:w-[390px] h-[50px] rounded-[10px] bg-gray4 flex items-center px-4'>
            <span className='t4 text-text1/70'>{user?.email}</span>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row lg:items-center gap-6'>
          <p className='t4 text-left w-full lg:w-[120px] cursor-default'>
            비밀번호 <span className='text-red'>(필수)</span>
          </p>
          <div className='w-full lg:w-[390px]'>
            <div className='relative'>
              <input
                type={visible ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='input-type3 w-full h-[50px] focus:outline-1 focus:outline-main'
                ref={passwordRef}
              />
              {password && (
                <div
                  onClick={() => setVisible(!visible)}
                  className='absolute right-12 top-1/2 -translate-y-1/2 cursor-pointer'
                >
                  {visible ? (
                    <Eye className='w-4 h-4' />
                  ) : (
                    <EyeOff className='w-4 h-4' />
                  )}
                </div>
              )}
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
        </div>

        <div className='flex flex-col lg:flex-row lg:items-center gap-6'>
          <p className='t4 text-left w-full lg:w-[120px] cursor-default'>
            비밀번호 확인 <span className='text-red'>(필수)</span>
          </p>
          <div className='w-full lg:w-[390px]'>
            <div className='relative'>
              <input
                type={visible ? 'text' : 'password'}
                value={passwordCheck}
                className='input-type3 w-full h-[50px] focus:outline-1 focus:outline-main'
                onChange={(e) => setPasswordCheck(e.target.value)}
                ref={passwordCheckRef}
              />
              {passwordCheck && (
                <div
                  onClick={() => setVisible(!visible)}
                  className='absolute right-12 top-1/2 -translate-y-1/2 cursor-pointer'
                >
                  {visible ? (
                    <Eye className='w-4 h-4' />
                  ) : (
                    <EyeOff className='w-4 h-4' />
                  )}
                </div>
              )}
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
        </div>

        <div className='w-full lg:w-[534px] lg:mx-0 mx-auto flex lg:justify-end'>
          <button
            type='button'
            className='button-type1 hover:bg-[#292929] h-[50px] w-full lg:w-auto'
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
