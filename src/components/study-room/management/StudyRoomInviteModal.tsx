import musicBunny from '@/assets/images/music-bunny.svg';
import { getAllUser } from '@/lib/api/study.api';
import { Search, X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type AllUserType = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
};

export default function StudyRoomInfoWrite({
  studyId,
  memberInfo,
  closeFn,
}: {
  studyId: number;
  memberInfo: StudyMemberType[];
  closeFn: () => void;
}) {
  const [allUser, setAllUser] = useState<AllUserType[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchAllUser = async () => {
      setIsLoading(true);
      try {
        const { data } = await getAllUser();
        // 현재 스터디원 제외
        const filterData = data.filter(
          (f: AllUserType) =>
            !memberInfo.some((member) => member.userId === f.id)
        );
        setAllUser(filterData);
      } catch (error) {
        console.error('전체 사용자를 불러오지 못했습니다.', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllUser();
  }, [memberInfo]);

  const handleSearch = (search: string) => {
    const searchUser = allUser.filter(
      (user) =>
        user.nickname.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    return searchUser;
  };
  return (
    <>
      <div className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-15 flex items-center justify-center'>
        <div className='py-7 rounded-[10px] bg-white drop-shadow-md max-w-[650px] min-w-[580px]'>
          <div className='flex justify-between mb-8 px-9 '>
            <h3 className='tm2'>스터디 초대</h3>
            <button onClick={closeFn}>
              <X className='w-8 y-8' />
            </button>
          </div>
          <div>
            {/* 이름 검색 */}
            {isLoading ? (
              <div className='h-[45px] mx-9 bg-gray-100 animate-pulse rounded-md mb-4'></div>
            ) : (
              <div className='px-9 mb-4'>
                <div className='flex items-center input-type1 gap-3 bg-gray4 !border-gray4 !text-[16px]'>
                  <Search className='w-5 h-5 shrink-0 text-gray5' />
                  <input
                    type='text'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='사용자를 검색해 보세요'
                    className='w-full h-full focus:outline-0'
                  />
                </div>
              </div>
            )}

            {/* 사용자 리스트 */}
            <div className='flex flex-col py-2 px-9 gap-1 h-[360px] overflow-auto'>
              {handleSearch(search).map((user) => (
                <div
                  key={user.id}
                  className='flex items-center justify-between rounded-[10px] bg-white hover:drop-shadow-md p-3 transition-all duration-200'
                >
                  <div className='flex items-center gap-3'>
                    <div className='w-[42px] h-[42px] rounded-full overflow-hidden bg-white border border-border1'>
                      <Image
                        src={user.profileImageUrl ?? musicBunny}
                        width={42}
                        height={42}
                        alt={`${user.nickname} 프로필 이미지`}
                        loading='lazy'
                      />
                    </div>
                    <div>
                      <p className='t4'>{user.nickname}</p>
                      <p className='t4'>{user.email}</p>
                    </div>
                  </div>
                  <button className='button-sm-type1 !text-[12px]'>
                    초대하기
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
