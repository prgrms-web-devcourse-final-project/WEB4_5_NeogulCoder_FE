'use client';
import Image from 'next/image';
import musicBunny from '@/assets/images/music-bunny.svg';
import SideMenuItemMy from './SideMenuItemMy';
import { useRouter } from 'next/navigation';

export default function SideMenuMy() {
  const router = useRouter();
  const userName = '한유빙';

  const menuItems = [
    { name: '캘린더', to: '/my/calendar' },
    { name: '전체 스터디', to: '/my/study-list' },
    { name: '내가 신청한 스터디', to: '/my/apply-study-list' },
    { name: '내가 작성한 모집 글', to: '/my/recruitment-list' },
    { name: '스터디원 피어리뷰', to: '/my/review' },
  ];

  return (
    <div className='w-full flex justify-center text-text1'>
      <div className='w-[1248px] flex flex-col pl-5 pr-[10px]'>
        <div className='w-[300px]'>
          <div className='w-[300px] h-[100px] bg-gray4 rounded-[10px] flex items-center'>
            <div className='flex items-center gap-[28px] pl-8'>
              <div className='w-[70px] h-[70px] bg-white rounded-full'>
                <Image src={musicBunny} alt='예시 기본 프사' />
              </div>
              <div>
                <p className='tm2 cursor-default'>{userName}</p>
                <button
                  type='button'
                  className='t5 text-text1/50'
                  onClick={() => router.push('/profile/edit-profile')}
                >
                  프로필 수정
                </button>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-[30px] font-medium mt-[35px]'>
            {menuItems.map((item) => (
              <SideMenuItemMy key={item.to} name={item.name} to={item.to} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
