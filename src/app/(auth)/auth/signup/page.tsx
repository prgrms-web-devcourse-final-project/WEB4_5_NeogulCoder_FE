'use client';
import Image from 'next/image';
import topBlue from '@/assets/images/auth-top-right-blue.svg';
import bottomPink from '@/assets/images/auth-bottom-left-pink.svg';
import musicBunny from '@/assets/images/music-bunny.svg';
import logoWibby from '@/assets/images/wibby.svg';
import deleteText from '@/assets/images/delete-text.svg';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { nicknameRegex, passwordRegex } from '@/lib/auth/regex';
import axios from 'axios';
import { signup } from '@/lib/api/user';

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [signupError, setSignupError] = useState({
    email: false,
    nickname: false,
    password: false,
    passwordCheck: false,
  });

  const emailRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCheckRef = useRef<HTMLInputElement>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const handleNickname = () => {
    if (!nicknameRegex.test(nickname)) {
      setNicknameError('닉네임은 2~10자이여야 합니다.');
    } else {
      setNicknameError('');
    }
  };

  const validateNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nick = e.target.value;
    setNickname(nick);
    if (nicknameError && nicknameRegex.test(nick)) {
      setNicknameError('');
    }
  };

  const handlePassword = () => {
    if (!passwordRegex.test(password)) {
      setPasswordError('비밀번호는 8~20자이여야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (passwordError && passwordRegex.test(newPassword)) {
      setPasswordError('');
    }
  };

  const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswordCheck(value);

    if (password !== value) {
      setPasswordCheckError('비밀번호가 일치하지 않습니다.');
      return;
    } else {
      setPasswordCheckError('');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const errorMsg = {
      email: email.trim() === '',
      nickname: nickname.trim() === '',
      password: password.trim() === '',
      passwordCheck: passwordCheck.trim() === '',
    };

    setSignupError(errorMsg);
    if (errorMsg.email) {
      emailRef.current?.focus();
      return;
    }
    if (errorMsg.nickname) {
      nicknameRef.current?.focus();
      return;
    }
    if (errorMsg.password) {
      passwordRef.current?.focus();
      return;
    }

    if (errorMsg.passwordCheck) {
      passwordCheckRef.current?.focus();
      return;
    }
    try {
      await signup(email, nickname, password, passwordCheck);
      alert('회원가입 성공');
      router.push('/auth/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message;
        if (msg.includes('이메일')) {
          setEmailError(msg);
          emailRef.current?.focus();
        } else if (msg.includes('닉네임')) {
          setNicknameError(msg);
          nicknameRef.current?.focus();
        } else {
          console.error(error);
        }
      } else {
        console.error('Axios 외의 오류: ', error);
      }
    }
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
          priority
        />
      </div>

      <div className='flex flex-col items-center justify-center'>
        <Image src={logoWibby} alt='로고' className='mb-[96px] w-30' />
        <div className='z-10'>
          <form onSubmit={handleSignUp}>
            <div className='mb-6'>
              <p className='pb-2 t4'>
                이메일{' '}
                {signupError.email && (
                  <span className='text-red-500 transition duration-200'>
                    (필수)
                  </span>
                )}
              </p>
              <div className='relative'>
                <input
                  type='text'
                  value={email}
                  onChange={handleEmailChange}
                  className='input-type3 w-[390px] focus:outline-2 focus:outline-main'
                  ref={emailRef}
                />

                {email && (
                  <Image
                    src={deleteText}
                    alt='전체 삭제'
                    onClick={() => setEmail('')}
                    className='absolute w-4 h-4 right-5 top-1/2 -translate-y-1/2 cursor-pointer'
                  />
                )}
              </div>
              <p
                className={`t5 ml-1 h-5 pt-1 transition duration-200 ${
                  emailError ? 'text-red-500' : 'invisible'
                }`}
              >
                {emailError || '\u00A0'}
              </p>
            </div>
            <div className='mb-6'>
              <p className='pb-2 t4'>
                닉네임{' '}
                {signupError.nickname && (
                  <span className='text-red-500 transition duration-200'>
                    (필수)
                  </span>
                )}
              </p>
              <div className='relative'>
                <input
                  type='text'
                  value={nickname}
                  onChange={validateNickname}
                  className='input-type3 w-[390px] focus:outline-2 focus:outline-main'
                  ref={nicknameRef}
                  onBlur={handleNickname}
                />
                {nickname && (
                  <Image
                    src={deleteText}
                    alt='전체 삭제'
                    onClick={() => setNickname('')}
                    className='absolute w-4 h-4 right-5 top-1/2 -translate-y-1/2 cursor-pointer'
                  />
                )}
              </div>
              <p
                className={`t5 ml-1 h-5 pt-1 transition duration-200 ${
                  nicknameError ? 'text-red-500' : 'invisible'
                }`}
              >
                {nicknameError || '\u00A0'}
              </p>
            </div>
            <div className='mb-6'>
              <p className='pb-2 t4'>
                비밀번호{' '}
                {signupError.password && (
                  <span className='text-red-500 transition duration-200'>
                    (필수)
                  </span>
                )}
              </p>
              <div className='relative'>
                <input
                  type='password'
                  value={password}
                  onChange={validatePassword}
                  className='input-type3 w-[390px] focus:outline-2 focus:outline-main'
                  ref={passwordRef}
                  onBlur={handlePassword}
                />
                {password && (
                  <Image
                    src={deleteText}
                    alt='전체 삭제'
                    onClick={() => setPassword('')}
                    className='absolute w-4 h-4 right-5 top-1/2 -translate-y-1/2 cursor-pointer'
                  />
                )}
              </div>
              <p
                className={`t5 ml-1 h-5 pt-1 transition duration-200 ${
                  passwordError ? 'text-red-500' : 'invisible'
                }`}
              >
                {passwordError || '\u00A0'}
              </p>
            </div>
            <div className='mb-6'>
              <p className='pb-2 t4'>
                비밀번호 확인{' '}
                {signupError.passwordCheck && (
                  <span className='text-red-500 transition duration-200'>
                    (필수)
                  </span>
                )}
              </p>
              <div className='relative'>
                <input
                  type='password'
                  value={passwordCheck}
                  onChange={handlePasswordCheck}
                  className='input-type3 w-[390px] focus:outline-2 focus:outline-main'
                  ref={passwordCheckRef}
                />
                {passwordCheck && (
                  <Image
                    src={deleteText}
                    alt='전체 삭제'
                    onClick={() => setPasswordCheck('')}
                    className='absolute w-4 h-4 right-5 top-1/2 -translate-y-1/2 cursor-pointer'
                  />
                )}
              </div>
              <p
                className={`t5 ml-1 h-5 pt-1 transition duration-200 ${
                  passwordCheckError ? 'text-red-500' : 'invisible'
                }`}
              >
                {passwordCheckError || '\u00A0'}
              </p>
            </div>
            <button
              type='submit'
              className='button-type1 cursor-pointer mb-[14px]'
            >
              회원가입
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
