import defaultUserProfileImage from '@/assets/images/basic-bunny.svg';
import { getAllUser, postStudyInvite } from '@/lib/api/study.api';
import { Search, X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState, useTransition } from 'react';
import { toast } from 'react-toastify';

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
  const [isPending, startTransition] = useTransition();

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

  const handleInvite = (name: string) => {
    startTransition(async () => {
      try {
        await postStudyInvite(studyId, name);
        toast.success(`${name} 님을 초대했습니다.`);
        closeFn(); // 모달 닫기
      } catch (error) {
        console.error(`error : ${error}`);
        toast.error(`${name} 초대에 실패했습니다.`);
      }
    });
  };
  return (
    <>
      <div className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center'>
        <div className='py-4 lg:py-7 rounded-[10px] bg-white drop-shadow-md max-w-[650px] lg:min-w-[580px] w-[calc(100%-36px)]'>
          <div className='flex justify-between mb-5 lg:mb-8 px-4 lg:px-9'>
            <h3 className='tm2'>스터디 초대</h3>
            <button onClick={closeFn}>
              <X className='w-6 h-6 lg:w-8 lg:h-8' />
            </button>
          </div>
          <div>
            {/* 이름 검색 */}
            {isLoading ? (
              <div className='h-[45px] mx-9 bg-gray-100 animate-pulse rounded-md mb-4'></div>
            ) : (
              <div className='mb-2 px-4 lg:px-9 lg:mb-4'>
                <div className='flex items-center input-type1 gap-2 lg:gap-3 bg-gray4 !border-gray4 !text-[16px]'>
                  <Search className='w-4 h-4 lg:w-5 lg:h-5 shrink-0 text-gray5' />
                  <input
                    type='text'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='사용자를 검색해 보세요'
                    className='w-full h-full focus:outline-0 text-xs lg:text-sm'
                  />
                </div>
              </div>
            )}

            {/* 사용자 리스트 */}
            <div className='flex flex-col py-2 px-2 lg:px-9 gap-1 h-[360px] overflow-auto'>
              {handleSearch(search).map((user) => (
                <div
                  key={user.id}
                  className='flex items-center justify-between rounded-[10px] bg-white hover:drop-shadow-md p-3 transition-all duration-200'
                >
                  <div className='flex items-start gap-2 lg:gap-3 min-w-0'>
                    <div className='w-[36px] h-[36px] lg:w-[42px] lg:h-[42px] shrink-0 rounded-full overflow-hidden bg-white border border-border1'>
                      <Image
                        src={user.profileImageUrl ?? defaultUserProfileImage}
                        width={42}
                        height={42}
                        alt={`${user.nickname} 프로필 이미지`}
                        loading='lazy'
                      />
                    </div>
                    <div className='w-full  min-w-0'>
                      <p className='t4 break-words'>{user.nickname}</p>
                      <p className='t4 break-words'>{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleInvite(user.nickname)}
                    className='button-sm-type1 !text-[10px] md:!text-[12px] mobile1 shrink-0'
                    disabled={isPending}
                  >
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
