'use client';

import Image from 'next/image';
import topBlue from '@/assets/images/auth-top-right-blue.svg';
import bottomPink from '@/assets/images/auth-bottom-left-pink.svg';
import musicBunny from '@/assets/images/music-bunny.svg';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const handleGoToSignUp = () => {
    router.push('/auth/signup');
  };

  const handleGoToHome = () => {
    router.push('/');
  };
  return (
    <div className='w-full min-h-screen flex justify-center relative'>
      <Image
        src={topBlue}
        alt='로그인 및 회원가입 페이지 배경 도형'
        className='absolute top-0 right-0'
      />

      <div className='absolute bottom-0 left-0'>
        <Image
          src={bottomPink}
          alt='로그인 및 회원가입 페이지 배경 도형'
          className='relative'
        />
        <Image
          src={musicBunny}
          alt='토끼 캐릭터'
          className='absolute bottom-0 drop-shadow-[0_8px_10px_rgba(0,0,0,0.15)]'
        />
      </div>

      <div className='flex flex-col items-center justify-center'>
        <p className='mb-[80px] text-[26px] text-center cursor-default leading-[50px]'>
          모임부터 일정, 협업까지 한 번에.
          <br />
          <span className='text-[30px] font-medium'>함께할 사람</span>을 찾고,
          <span className='text-[30px] font-medium'> 함께할 계획</span>을
          세워보세요.
        </p>
        <div className='z-10'>
          <div className='mb-8'>
            <p className='pb-2 tm4'>이메일</p>
            <input
              type='text'
              className='input-type3 w-[390px] focus:outline-2 focus:outline-main'
            />
          </div>
          <div className='mb-[35px]'>
            <p className='pb-2 tm4'>비밀번호</p>
            <input
              type='password'
              className='input-type3 w-[390px] focus:outline-2 focus:outline-main'
            />
          </div>
          <button
            type='button'
            className='button-type1 cursor-pointer mb-[14px]'
            onClick={handleGoToHome}
          >
            로그인
          </button>
          <div className='flex justify-center space-x-2 mb-[60px] t4'>
            <span className='opacity-50'>회원이 아니신가요?</span>
            <span className='cursor-pointer' onClick={handleGoToSignUp}>
              회원가입
            </span>
          </div>

          <div className='flex items-center gap-4 mb-[30px]'>
            <hr className='flex-grow border-t border-main/20' />
            <span className='opacity-50 t4'>또는</span>
            <hr className='flex-grow border-t border-main/20' />
          </div>

          <div className='flex justify-center'>
            <button className='w-[390px] h-[50px] border border-border2 rounded-[10px] flex justify-center items-center'>
              <Image
                src='https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg'
                alt='구글'
                className='w-5 h-5'
                width={0}
                height={0}
              />
              <span className='pl-4'>구글로 시작하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
