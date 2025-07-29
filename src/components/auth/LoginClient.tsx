'use client';

import Image from 'next/image';
import topBlue from '@/assets/images/auth-top-right-blue.svg';
import bottomPink from '@/assets/images/auth-bottom-left-pink.svg';
import musicBunny from '@/assets/images/music-bunny.svg';
import deleteText from '@/assets/images/delete-text.svg';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { userAuthStore } from '@/stores/userStore';
import axios from 'axios';
import { login } from '@/lib/api/user';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function LoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleGoToSignUp = () => {
    router.push('/auth/signup');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !password) {
      setLoginError('이메일과 비밀번호는 필수 입력 항목입니다.');
      emailRef.current?.focus();
      return;
    }
    if (!email) {
      emailRef.current?.focus();
      return;
    }
    if (!password) {
      passwordRef.current?.focus();
      return;
    }
    try {
      const res = await login(email, password);
      const user = res.data.data.user;

      userAuthStore.getState().setUser({
        id: user.userId,
        email: user.email,
        nickname: user.nickname,
        profileImageUrl: null,
        oauth: user.oauth,
        role: user.role,
      });
      localStorage.setItem('login_status', 'Y');

      toast.success('로그인 되었습니다!');
      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setLoginError('이메일 또는 비밀번호가 올바르지 않습니다.');
          passwordRef.current?.focus();
        } else if (error.response?.status === 400) {
          setLoginError('탈퇴된 회원입니다.');
        } else {
          console.error('다른 오류', error.response?.status, error.message);
        }
      } else {
        console.error('Axios 외의 오류', error);
      }
    }
  };
  return (
    <div className='w-full min-h-screen flex justify-center relative'>
      <Image
        src={topBlue}
        alt='로그인 및 회원가입 페이지 배경 도형'
        className='absolute top-0 right-0'
        priority
      />

      <div className='absolute bottom-0 left-0'>
        <Image
          src={bottomPink}
          alt='로그인 및 회원가입 페이지 배경 도형'
          className='relative'
          priority
        />
        <Image
          src={musicBunny}
          alt='토끼'
          className='absolute bottom-0 drop-shadow-[0_8px_10px_rgba(0,0,0,0.15)]'
          priority
        />
      </div>

      <div className='flex flex-col items-center justify-center'>
        <p className='mb-[80px] text-[23px] text-center cursor-default leading-[50px]'>
          모임부터 일정 관리, 협업까지 한 번에.
          <br />
          <span className='text-[30px] font-medium'>함께할 사람</span>을 찾고,
          <span className='text-[30px] font-medium'> 함께할 계획</span>을
          세워보세요.
        </p>
        <div className='z-10'>
          <form onSubmit={handleLogin}>
            <div className='mb-8'>
              <p className='pb-2 t4'>이메일</p>
              <div className='relative'>
                <input
                  type='text'
                  value={email}
                  className='input-type3 w-[390px] focus:outline-2 focus:outline-main'
                  onChange={(e) => setEmail(e.target.value)}
                  ref={emailRef}
                />
                {email && (
                  <Image
                    src={deleteText}
                    alt='전체 삭제'
                    onClick={() => {
                      setEmail('');
                    }}
                    className='absolute w-4 h-4 right-5 top-1/2 -translate-y-1/2 cursor-pointer'
                  />
                )}
              </div>
            </div>
            <div className='mb-[35px]'>
              <p className='pb-2 t4'>비밀번호</p>
              <div className='relative'>
                <input
                  type='password'
                  value={password}
                  className='input-type3 w-[390px] focus:outline-2 focus:outline-main'
                  onChange={(e) => setPassword(e.target.value)}
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
            <p className='t5 text-red-500 px-1 mb-2 transition duration-200'>
              {loginError || '\u00A0'}
            </p>

            <button
              type='submit'
              className='button-type1 cursor-pointer mb-[14px]'
            >
              로그인
            </button>
          </form>

          <div className='flex justify-center space-x-2 mb-[60px] t4'>
            <span className='opacity-50'>회원이 아니신가요?</span>
            <span
              className='cursor-pointer underline'
              onClick={handleGoToSignUp}
            >
              회원가입
            </span>
          </div>

          <div className='flex items-center gap-4 mb-[30px]'>
            <hr className='flex-grow border-t border-main/20' />
            <span className='opacity-50 t4'>또는</span>
            <hr className='flex-grow border-t border-main/20' />
          </div>

          <div className='flex justify-center'>
            <Link
              href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`}
            >
              <button className='w-[390px] h-[50px] flex items-center justify-center rounded-[10px] bg-[#f1f3f5] shadow-sm hover:bg-[#eef0f1]'>
                <Image
                  src='https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg'
                  alt='구글'
                  className='w-5 h-5'
                  width={0}
                  height={0}
                />
                <span className='pl-4'>구글로 시작하기</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
