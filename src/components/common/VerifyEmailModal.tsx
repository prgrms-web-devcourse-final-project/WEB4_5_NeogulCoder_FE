import { sendEmailCode, verifyEmailCode } from '@/lib/api/emailAuth';
import { Dispatch, SetStateAction, useRef, useState } from 'react';

export default function VerifyEmailModal({
  onClose,
  timeLeft,
  setTimeLeft,
  email,
}: {
  onClose: () => void;
  timeLeft: number;
  setTimeLeft: Dispatch<SetStateAction<number>>;
  email: string;
}) {
  const inputRef = useRef<HTMLInputElement[]>([]);
  const [code, setCode] = useState('');

  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(Math.floor(seconds % 60)).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleInputchange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newCode = code.padEnd(6).split('');
    newCode[index] = value;
    const updateCode = newCode.join('');
    setCode(updateCode);

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
    if (!code) {
      alert('인증 코드를 입력해주세요');
      return;
    }
    try {
      await verifyEmailCode(email, code);
      alert('인증되었습니다.');
      onClose();
    } catch (error) {
      console.error('이메일 코드 확인 실패: ', error);
    }
  };
  return (
    <div className='flex flex-col bg-white w-[440px] h-[360px] rounded-[10px] shadow-sm px-6 py-6 items-center justify-center gap-8'>
      <div>
        <p className='tm2 mb-2 text-center'>인증번호가 발송되었습니다.</p>
        <p className='t5 text-text1/50 text-center mb-6'>
          가입하신 이메일 주소로 인증번호를 전송했어요.
        </p>
      </div>

      <div className='flex flex-col justify-center gap-3 mb-8'>
        <div className='flex gap-3'>
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type='text'
              maxLength={1}
              className='w-12 h-13 text-center border border-gray-300 rounded-[10px] shadow-sm focus:outline-1 focus:outline-main'
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
              인증 메일 재전송
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

      <div className='flex justify-between w-full gap-2'>
        <button
          type='button'
          className='w-1/2 h-[44px] border border-main text-main rounded-md hover:bg-gray-50'
          onClick={onClose}
        >
          취소
        </button>
        <button
          type='button'
          className='w-1/2 h-[44px] bg-main text-white rounded-md hover:bg-[#292929]'
          onClick={handleVerifyEmailCode}
        >
          인증
        </button>
      </div>
    </div>
  );
}
