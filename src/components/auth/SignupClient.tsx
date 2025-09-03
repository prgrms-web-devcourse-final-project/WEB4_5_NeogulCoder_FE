'use client';
import Image from 'next/image';
import topBlue from '@/assets/images/auth-top-right-blue.svg';
import bottomPink from '@/assets/images/auth-bottom-left-pink.svg';
import musicBunny from '@/assets/images/music-bunny.svg';
import logoWibby from '@/assets/images/wibby.svg';
import deleteText from '@/assets/images/delete-text.svg';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { nicknameRegex, passwordRegex } from '@/lib/auth/regex';
import axios from 'axios';
import { signup } from '@/lib/api/user';
import VerifyEmailModal from '@/components/common/VerifyEmailModal';
import { sendEmailCode } from '@/lib/api/emailAuth';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';

export default function SignUpClient() {
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mailCode, setEmailCode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [emailVerified, setEmailVerified] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCheckRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!mailCode) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mailCode]);

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

  const handleSendEmailCode = async () => {
    try {
      await sendEmailCode(email);
      setEmailCode(true);
      setTimeLeft(300);
      setIsModalOpen(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const code = error.response?.data?.code;
        const msg = error.response?.data?.message;

        if (code === 'U004' || msg?.includes('이메일')) {
          setEmailError(msg);
          emailRef.current?.focus();
        } else {
          console.error('인증번호 발송 실패: ', msg);
        }
      } else {
        console.error('알 수 없는 에러: ', error);
      }
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

    if (!emailVerified) {
      setEmailError('이메일 인증을 완료해주세요.');
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

    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await signup(email, nickname, password, passwordCheck);

      toast.success('회원가입 되었습니다!');
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
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className='w-full min-h-screen flex justify-center relative px-4 lg:px-0'>
      <Image
        src={topBlue}
        alt='로그인 및 회원가입 페이지 배경 도형'
        className='absolute top-0 right-0 w-[30vw] sm:w-[36vw] md:w-[38vw] lg:w-[40vw]'
        priority
      />

      <div className='absolute bottom-0 left-0'>
        <Image
          src={bottomPink}
          alt='로그인 및 회원가입 페이지 배경 도형'
          className='relative w-[30vw] sm:w-[36vw] md:w-[38vw] lg:w-[40vw]'
          priority
        />
        <Image
          src={musicBunny}
          alt='토끼'
          className='absolute bottom-0 drop-shadow-[0_8px_10px_rgba(0,0,0,0.15)] w-[30vw] sm:w-[33vw] md:w-[35vw] lg:w-[40vw] h-auto'
          priority
        />
      </div>

      <div className='flex flex-col items-center justify-center w-full'>
        <Image
          src={logoWibby}
          alt='로고'
          className='w-20 mb-4 lg:w-30 lg:mb-[96px]'
        />

        <p className='block mb-10 lg:hidden'>
          모임부터 일정 관리, 협업까지 한 번에.
        </p>

        <div className='z-10 w-full max-w-[360px] mx-auto'>
          <form onSubmit={handleSignUp}>
            <div className='mb-3 lg:mb-6'>
              <p className='pb-2 t4'>
                이메일{' '}
                {signupError.email && (
                  <span className='text-red-500 transition duration-200'>
                    (필수)
                  </span>
                )}
              </p>
              <div className='flex items-center justify-between gap-2'>
                <div className='relative w-full flex gap-2 lg:block lg:gap-0'>
                  <div className='relative flex-1'>
                    <input
                      type='text'
                      value={email}
                      onChange={handleEmailChange}
                      className='input-type3 w-full h-[45px] focus:outline-2 focus:outline-main lg:h-[50px]'
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

                  {email && (
                    <>
                      {/* 인증 버튼 */}
                      <button
                        type='button'
                        className='absolute right-[-90px] top-0 t4 bg-main text-white h-[50px] w-[80px] items-center justify-center rounded-[10px] hidden lg:block'
                        onClick={handleSendEmailCode}
                      >
                        인증
                      </button>
                    </>
                  )}

                  {/* 모바일 인증 버튼 */}
                  <button
                    type='button'
                    className='block w-[60px] h-[45px] rounded-[10px] text-white text-[12px] bg-black lg:hidden'
                    onClick={handleSendEmailCode}
                  >
                    인증
                  </button>
                </div>

                {isModalOpen && (
                  <div className='fixed inset-0 z-50 flex items-center justify-center'>
                    <div className='absolute inset-0 bg-main opacity-80' />
                    <div className='relative z-10'>
                      <VerifyEmailModal
                        onClose={() => setIsModalOpen(false)}
                        timeLeft={timeLeft}
                        setTimeLeft={setTimeLeft}
                        email={email}
                        setEmailVerified={setEmailVerified}
                        setEmailError={setEmailError}
                      />
                    </div>
                  </div>
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
            <div className='mb-3 lg:mb-6'>
              <p className='pb-2 t4'>
                닉네임{' '}
                {signupError.nickname && (
                  <span className='text-red-500 transition duration-200'>
                    (필수)
                  </span>
                )}
              </p>

              <div className='w-full'>
                <div className='relative'>
                  <input
                    type='text'
                    value={nickname}
                    onChange={validateNickname}
                    className='input-type3 w-full h-[45px] focus:outline-2 focus:outline-main lg:h-[50px]'
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
                  className={`t5 ml-1 pt-1 h-5 transition duration-200 ${
                    nicknameError ? 'text-red-500' : 'invisible'
                  }`}
                >
                  {nicknameError || '\u00A0'}
                </p>
              </div>
            </div>

            <div className='mb-3 lg:mb-6'>
              <p className='pb-2 t4'>
                비밀번호{' '}
                {signupError.password && (
                  <span className='text-red-500 transition duration-200'>
                    (필수)
                  </span>
                )}
              </p>

              <div className='w-full'>
                <div className='relative'>
                  <input
                    type={visible ? 'text' : 'password'}
                    value={password}
                    onChange={validatePassword}
                    className='input-type3 w-full h-[45px] focus:outline-2 focus:outline-main lg:h-[50px]'
                    ref={passwordRef}
                    onBlur={handlePassword}
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
            </div>
            <div className='mb-3 lg:mb-6'>
              <p className='pb-2 t4'>
                비밀번호 확인{' '}
                {signupError.passwordCheck && (
                  <span className='text-red-500 transition duration-200'>
                    (필수)
                  </span>
                )}
              </p>

              <div className='w-full'>
                <div className='relative'>
                  <input
                    type={visible ? 'text' : 'password'}
                    value={passwordCheck}
                    onChange={handlePasswordCheck}
                    className='input-type3 w-full h-[45px] focus:outline-2 focus:outline-main lg:h-[50px]'
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
            </div>

            <div className='w-full'>
              <button
                type='submit'
                className='button-type1 w-full h-[45px] cursor-pointer mb-[14px] lg:h-[50px]'
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
