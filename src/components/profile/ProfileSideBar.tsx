'use client';
// import sunBunny from '@/assets/images/sun-bunny.svg';
import basicBunny from '@/assets/images/basic-bunny.svg';
import { ChevronRight } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { userAuthStore, UserInfo } from '@/stores/userStore';
import { getUserById } from '@/lib/api/user';
import ProfileSideBarSkeleton from './ProfileSideBarSkeleton';

export default function SideBar() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  // 사이드 메뉴
  const [selectedMenu, setSelectedMenu] = useState<'pr' | '회원 탈퇴' | ''>(
    'pr'
  );
  // 로그인 된 사용자 정보
  const me = userAuthStore((state) => state.user);
  // 로그인 후 새로고침
  const fetchUser = userAuthStore((state) => state.fetchUser);

  const params = useParams();
  const userId =
    params?.userId && params?.userId !== 'me' ? Number(params?.userId) : null;
  const [otherUser, setOtherUser] = useState<UserInfo | null>(null);

  const pathname = usePathname();
  const isEditOrWithdrawal =
    pathname.includes('/profile/edit-profile') ||
    pathname.includes('/profile/withdrawal') ||
    pathname.includes('/profile/pr/edit-pr') ||
    (me?.id && pathname === `/profile/pr/${me.id}`);

  const isMyPage =
    params?.userId === 'me' || isEditOrWithdrawal || me?.id === userId;

  useEffect(() => {
    if (isMyPage) {
      // 내 페이지면 항상 최신 정보 가져오기
      fetchUser()
        .catch((error) => {
          console.error('내 정보 가져오기 실패: ', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (userId) {
      // 다른 사람 페이지면 그 사람 정보 가져오기
      getUserById(userId)
        .then((res) => {
          setOtherUser(res.data);
        })
        .catch((error) => {
          console.error('다른 사용자 정보 가져오기 실패: ', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [userId, isMyPage, fetchUser]);

  useEffect(() => {
    if (me?.id && pathname === `/profile/pr/${me.id}`) {
      setSelectedMenu('pr');
    } else if (pathname === '/profile/withdrawal') {
      setSelectedMenu('회원 탈퇴');
    }
  }, [me?.id, pathname]);

  const userData = isMyPage ? me : otherUser;

  const handleEditProfile = () => {
    router.push('/profile/edit-profile');
    setSelectedMenu('');
  };

  const handleWithdrawal = () => {
    setSelectedMenu('회원 탈퇴');
    router.push('/profile/withdrawal');
  };

  const handlePr = () => {
    setSelectedMenu('pr');
    if (me?.id) {
      router.push(`/profile/pr/${me.id}`);
    }
  };

  const handleMyPage = () => {
    router.push('/my/calendar');
  };

  return (
    <>
      {isLoading ? (
        <ProfileSideBarSkeleton />
      ) : (
        <div className='w-full flex justify-center text-text1'>
          <div className='w-full max-w-[1248px] flex flex-col'>
            <div className='w-[300px] h-[100px] bg-gray4 rounded-[10px] flex items-center'>
              <div className='flex items-center gap-[28px] pl-8'>
                <div className='w-[70px] h-[70px] bg-black rounded-full overflow-hidden'>
                  <img
                    src={userData?.profileImageUrl ?? basicBunny.src}
                    alt='예시 기본 프사'
                    className='w-full h-20 object-cover object-center rounded-full'
                  />
                </div>
                <div className='flex flex-col justify-center items-start'>
                  <span className='tm2 cursor-default'>
                    {userData?.nickname}
                  </span>
                  {isMyPage && (
                    <button
                      type='button'
                      className='t5 opacity-50 mt-[5px]'
                      onClick={handleEditProfile}
                    >
                      프로필 수정
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className='flex gap-5 mt-4'>
              {isMyPage && (
                <button
                  type='button'
                  className='w-full h-10 bg-gray4 rounded-[10px] tm4'
                  onClick={handleMyPage}
                >
                  개인 일정
                </button>
              )}
            </div>
            {isMyPage && (
              <div className='flex flex-col gap-[30px] tm4 mt-[35px]'>
                <div
                  className={`flex justify-between items-center cursor-pointer ${
                    selectedMenu === 'pr' ? 'opacity-100' : 'opacity-30'
                  }`}
                  onClick={handlePr}
                >
                  <span>PR</span>
                  <ChevronRight className='w-[22px] h-[22px]' />
                </div>

                {me?.oauth === 'Google' ? (
                  ''
                ) : (
                  <div
                    className={`flex justify-between items-center cursor-pointer ${
                      selectedMenu === '회원 탈퇴'
                        ? 'opacity-100'
                        : 'opacity-30'
                    }`}
                    onClick={handleWithdrawal}
                  >
                    <span>회원 탈퇴</span>
                    <ChevronRight className='w-[22px] h-[22px]' />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
