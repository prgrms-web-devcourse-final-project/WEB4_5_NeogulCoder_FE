'use client';
import { sendEmailCode, verifyEmailCode } from '@/lib/api/emailAuth';
import { VerifyEmailModalProps } from '@/types/email';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { X } from 'lucide-react';

export default function VerifyEmailModal({
  onClose,
  timeLeft,
  setTimeLeft,
  email,
  setEmailVerified,
  setEmailError,
}: VerifyEmailModalProps) {
  const inputRef = useRef<HTMLInputElement[]>([]);
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const [codeError, setCodeError] = useState('');

  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(Math.floor(seconds % 60)).padStart(2, '0');
    return `${m}:${s}`;
  };

  const isComplete = code.every((digit) => digit !== '');

  const handleInputchange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const handleEmailRetry = async () => {
    try {
      await sendEmailCode(email);
      setTimeLeft(300);
    } catch (error) {
      console.error('이메일 코드 재전송 실패: ', error);
    }
  };

  const handleVerifyEmailCode = async () => {
    const codeStr = code.join('');
    if (!codeStr) {
      setCodeError('인증 번호를 입력해주세요.');
      return;
    }
    try {
      const result = await verifyEmailCode(email, codeStr);
      // console.log(result.data);

      if (result.data?.data === true) {
        toast.success('인증되었습니다.');
        setEmailVerified(true);
        setCodeError('');
        setEmailError('');
        onClose();
      } else {
        setCodeError('인증 번호를 확인해주세요.');
      }
    } catch (error) {
      setCodeError('인증 번호를 확인해주세요.');
      console.error('이메일 인증 번호 확인 실패: ', error);
    }
  };

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  return (
    <div className='flex flex-col bg-white w-screen h-screen sm:w-[440px] sm:h-[400px] rounded-[10px] shadow-sm px-6 py-6 items-center sm:justify-center gap-8'>
      <X
        className='w-6 h-6 absolute right-4 cursor-pointer block sm:hidden'
        onClick={onClose}
      />

      <div>
        <p className='tm2 mt-12 sm:mt-0 mb-2 text-center'>
          인증 번호가 발송되었습니다.
        </p>
        <p className='t5 text-text1/50 text-center mb-6'>
          가입하신 이메일 주소로 인증 번호를 전송했어요.
        </p>
      </div>

      <div className='flex flex-col justify-center gap-3 mb-6'>
        <div className='flex flex-wrap gap-3 justify-center'>
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type='text'
              maxLength={1}
              className='w-11 h-12 sm:w-13 sm:h-14 text-center border border-gray-300 rounded-[10px] shadow-sm focus:outline-1 focus:outline-main'
              ref={(input) => {
                inputRef.current[i] = input!;
              }}
              onChange={(e) => handleInputchange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          ))}
        </div>

        <div className='h-[24px] w-full flex justify-end items-center'>
          {timeLeft === 0 ? (
            <button
              type='button'
              className='text-main underline t5'
              onClick={handleEmailRetry}
            >
              인증 번호 재전송
            </button>
          ) : (
            <p className='t5 text-gray-500 text-center'>
              남은 시간{' '}
              <span className='font-semibold text-red-500'>
                {formatTime(timeLeft)}
              </span>
            </p>
          )}
        </div>
      </div>

      <div className='flex flex-col w-full gap-2'>
        <p className='t5 text-center min-h-[20px] mb-2'>
          {codeError && <span className='text-red'>{codeError}</span>}
        </p>

        <div className='flex justify-between w-full gap-2'>
          <button
            type='button'
            className='w-1/2 h-[44px] border border-main text-main rounded-md hover:bg-gray-50 hidden sm:block'
            onClick={onClose}
          >
            취소
          </button>

          <button
            type='button'
            className={`w-full sm:w-1/2 h-[44px] rounded-md   ${
              isComplete
                ? 'bg-main text-white hover:bg-[#292929]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            onClick={handleVerifyEmailCode}
            disabled={!isComplete}
          >
            인증
          </button>
        </div>
      </div>
    </div>
  );
}
