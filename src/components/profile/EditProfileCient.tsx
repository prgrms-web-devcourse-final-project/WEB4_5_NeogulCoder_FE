'use client';
import Image from 'next/image';
import photoUpload from '@/assets/images/photo-upload.svg';
import basicBunny from '@/assets/images/basic-bunny.svg';
import { useEffect, useState } from 'react';
import PasswordChangeModal from '@/components/profile/PasswordChangeModal';
import { axiosInstance } from '@/lib/api/axios';
import { userAuthStore } from '@/stores/userStore';
import { nicknameRegex } from '@/lib/auth/regex';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function EditProfileClient() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string>('');
  const user = userAuthStore((state) => state.user);

  useEffect(() => {
    const initUserProfile = async () => {
      const store = userAuthStore.getState();
      if (!store.user) {
        await store.fetchUser();
      }
    };
    initUserProfile();
  }, []);

  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
      setPreviewImg(user.profileImageUrl || '');
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!nicknameRegex.test(nickname)) {
      setNicknameError('닉네임은 2~10자이여야 합니다.');
      return;
    } else {
      setNicknameError('');
    }

    try {
      const formData = new FormData();

      if (imgFile) {
        formData.append('profileImage', imgFile);
      }

      await axiosInstance.put('/api/users/update/profile', formData, {
        params: nickname !== user?.nickname ? { nickname } : {},
      });
      await userAuthStore.getState().fetchUser();

      const updatedUser = userAuthStore.getState().user;
      if (updatedUser) {
        setPreviewImg(updatedUser.profileImageUrl || '');
      }

      toast.success('프로필 수정이 완료되었습니다.');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message;
        console.log(msg);
        if (msg?.includes('닉네임')) {
          setNicknameError(msg);
        }
      } else {
        console.error(error);
      }
    }
  };
  return (
    <>
      <div className='tb3'>프로필 수정</div>
      <div className='mt-[60px] flex flex-col items-center justify-center'>
        <div className='relative'>
          <div className='w-[140px] h-[140px] rounded-full relative bg-black overflow-hidden'>
            <Image
              src={
                previewImg && previewImg.trim() !== ''
                  ? previewImg
                  : basicBunny.src
              }
              width={140}
              height={140}
              alt='프로필 미리보기'
              className='w-full h-[160px] object-cover rounded-full'
            />
          </div>

          <label
            htmlFor='profile-upload'
            className='absolute right-[5px] bottom-[5px] cursor-pointer z-10'
          >
            <Image src={photoUpload} alt='사진 등록' />
          </label>

          <input
            id='profile-upload'
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            className='hidden'
          />
        </div>

        <div>
          <p className='pb-2 mt-[60px] t4'>
            닉네임 <span className='text-red'>(필수)</span>
          </p>
          <div>
            <input
              type='text'
              value={nickname}
              className='input-type3 w-[390px] focus:outline-1 focus:outline-main mb-[5px]'
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <p
            className={`t5 ml-1 pt-1 transition duration-200 ${
              nicknameError ? 'text-red-500' : 'invisible'
            }`}
          >
            {nicknameError || '\u00A0'}
          </p>
        </div>

        <div className='flex flex-col items-start mt-8'>
          <button
            type='button'
            className='button-type1 mb-4 hover:bg-[#292929]'
            onClick={handleSubmit}
          >
            저장
          </button>
          {user?.oauth === 'Google' ? (
            ''
          ) : (
            <button
              type='button'
              className='t4 self-end text-text1/50'
              onClick={() => setIsPasswordModalOpen(true)}
            >
              비밀번호 변경
            </button>
          )}

          {isPasswordModalOpen && (
            <div className='fixed inset-0 z-50 flex items-center justify-center'>
              <div className='absolute inset-0 bg-main opacity-80' />

              <div className='relative z-10'>
                <PasswordChangeModal
                  onClose={() => setIsPasswordModalOpen(false)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
