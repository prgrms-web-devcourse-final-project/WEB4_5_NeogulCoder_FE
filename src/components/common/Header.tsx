'use client';
import Image from 'next/image';
import logoWibby from '@/assets/images/wibby.svg';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import ProfileInfoModal from '../profile/ProfileInfoModal';
import { usePathname, useRouter } from 'next/navigation';
import { userAuthStore } from '@/stores/userStore';
import Link from 'next/link';
import { getUser } from '@/lib/api/user';
import Notification from './Notification';

export default function Header() {
  const router = useRouter();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const user = userAuthStore((state) => state.user);
  const setUser = userAuthStore((state) => state.setUser);
  const pathname = usePathname();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('login_status');
    if (user === undefined && isLoggedIn) {
      getUser()
        .then((res) => {
          const userData = res.data.data;
          setUser(userData); // 다시 저장
        })
        .catch((error) => {
          localStorage.removeItem('login_status');
          document.cookie = 'login_status=; path=/';
          console.error('사용자 정보 불러오기 실패: ', error);
        });
    }
  }, [user, setUser]);

  const handleGoToHome = () => {
    router.push('/');
  };

  const urlTitle: Record<string, string> = {
    '/profile/pr': 'PR 페이지',
    '/profile/edit-profile': '프로필 수정',
    '/profile/pr/edit-pr': 'PR 작성 및 수정',
    '/profile/withdrawal': '회원 탈퇴',
  };

  const title =
    Object.entries(urlTitle)
      .sort((a, b) => b[0].length - a[0].length)
      .find(([path]) => pathname.startsWith(path))?.[1] ?? '';

  return (
    <div className='w-full flex justify-center pt-2.5 text-text1'>
      <div className='w-full max-w-[1280px] flex items-center justify-between px-4'>
        <Image
          src={logoWibby}
          alt='로고'
          className={` w-[80px] h-9 cursor-pointer ${
            title === '' ? '' : 'hidden lg:block'
          }`}
          onClick={handleGoToHome}
          priority
        />
        {title !== '' ? (
          <button
            type='button'
            onClick={() => router.back()}
            className='block lg:hidden'
          >
            <ChevronLeft className='w-5 h-5' />
          </button>
        ) : (
          ''
        )}

        <p className='t3 font-medium text-gray-800 mx-auto lg:hidden'>
          {title}
        </p>

        <div className='flex items-center gap-[18px]'>
          {user === undefined ? null : user ? (
            <div className={'flex items-center justify-center'}>
              <Notification />

              <div className='relative z-10'>
                <div
                  className={`ml-4 w-[90px] h-[34px] rounded-[4px] bg-gray4 items-center justify-center gap-2 cursor-pointer hover:bg-[#EEEEEE] ${
                    title ? 'hidden lg:flex' : 'flex'
                  }`}
                  onClick={() => setIsProfileModalOpen((prev) => !prev)}
                >
                  <span className='tm5'>내 정보</span>
                  <ChevronDown className='w-[18px] h-[18px]' />
                </div>

                {isProfileModalOpen && (
                  <>
                    <div
                      className='fixed inset-0 z-40'
                      onClick={() => setIsProfileModalOpen(false)}
                    />

                    <div
                      className='absolute right-0 top-10 z-50'
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ProfileInfoModal
                        onItemClick={() => setIsProfileModalOpen(false)}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <Link href='/auth/login' className='t4'>
              로그인
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
