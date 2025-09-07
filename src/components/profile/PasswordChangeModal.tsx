import { useRef, useState } from 'react';
import Image from 'next/image';
import deleteText from '@/assets/images/delete-text.svg';
import { toast } from 'react-toastify';
import axiosInstance from '@/lib/api/axiosInstance';
import { X } from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react';

export default function PasswordChangeModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);

  const passwordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordCheckRef = useRef<HTMLInputElement>(null);

  const handleNewPasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPasswordCheck(value);

    if (newPassword !== value) {
      setNewPasswordError('새 비밀번호가 일치하지 않습니다.');
    } else {
      setNewPasswordError('');
    }
  };

  const handleChangePassword = async () => {
    const errorMsg = {
      password: password.trim() === '',
      newPassword: newPassword.trim() === '',
      newPasswordCheck: newPasswordCheck.trim() === '',
    };

    if (errorMsg.password) {
      passwordRef.current?.focus();
      return;
    }

    if (errorMsg.newPassword) {
      newPasswordRef.current?.focus();
      return;
    }

    if (errorMsg.newPasswordCheck) {
      newPasswordCheckRef.current?.focus();
      return;
    }

    if (newPassword !== newPasswordCheck) {
      setNewPasswordError('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await axiosInstance.put('/api/users/update/password', {
        password,
        newPassword,
        newPasswordCheck,
      });
      toast.success('비밀번호가 변경되었습니다.');
      onClose();
    } catch (error) {
      console.error('비밀번호 변경 실패: ', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex flex-col bg-white w-screen h-screen lg:w-[440px] lg:h-[520px] lg:rounded-[10px] lg:items-center lg:justify-center shadow-sm gap-[35px] px-6 py-6'>
      <div className='flex justify-between items-center w-full mb-20 lg:mb-0'>
        <h2 className='tm2'>비밀번호 변경하기</h2>
        <X className='w-6 h-6 cursor-pointer' onClick={onClose} />
      </div>

      <div className='w-full'>
        <p className='pb-2 t4'>
          현재 비밀번호 <span className='text-red'>(필수)</span>
        </p>
        <div className='relative'>
          <input
            type={visible ? 'text' : 'password'}
            placeholder='현재 비밀번호를 입력해주세요'
            className='input-type3 w-full focus:outline-1 focus:outline-main h-[50px]'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

      <div className='w-full'>
        <p className='pb-2 t4'>
          새 비밀번호 <span className='text-red'>(필수)</span>
        </p>
        <div className='relative'>
          <input
            type={visible ? 'text' : 'password'}
            placeholder='새 비밀번호를 입력해주세요'
            className='input-type3 w-full focus:outline-1 focus:outline-main h-[50px]'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            ref={newPasswordRef}
          />
          {newPassword && (
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
          {newPassword && (
            <Image
              src={deleteText}
              alt='전체 삭제'
              onClick={() => setNewPassword('')}
              className='absolute w-4 h-4 right-5 top-1/2 -translate-y-1/2 cursor-pointer'
            />
          )}
        </div>
      </div>

      <div className='w-full'>
        <p className='pb-2 t4'>
          새 비밀번호 확인 <span className='text-red'>(필수)</span>
        </p>
        <div className='relative'>
          <input
            type={visible ? 'text' : 'password'}
            placeholder='새 비밀번호를 다시 한 번 입력해주세요'
            className='input-type3 w-full focus:outline-1 focus:outline-main h-[50px]'
            value={newPasswordCheck}
            onChange={handleNewPasswordCheck}
            ref={newPasswordCheckRef}
          />
          {newPasswordCheck && (
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
          {newPasswordCheck && (
            <Image
              src={deleteText}
              alt='전체 삭제'
              onClick={() => setNewPasswordCheck('')}
              className='absolute w-4 h-4 right-5 top-1/2 -translate-y-1/2 cursor-pointer'
            />
          )}
        </div>
        <p
          className={`t5 px-1 h-[10px] pt-1 transition duration-200 ${
            newPasswordError ? 'text-red-500 opacity-100' : 'opacity-0'
          }`}
        >
          {newPasswordError || ' '}
        </p>
      </div>

      <div className='w-full'>
        <button
          type='button'
          className='w-full h-[50px] bg-main text-white rounded-[6px] hover:bg-[#292929]'
          onClick={handleChangePassword}
        >
          변경
        </button>
      </div>
    </div>
  );
}
