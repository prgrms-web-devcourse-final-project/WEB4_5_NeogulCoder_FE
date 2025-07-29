'use client';

import Pagination from '@/components/common/Pagination';
import RecruitmentCard from '@/components/my/RecruitmentCard';
import ListMenuStudy from '@/components/study/ListMenuStudy';
import StudyOutCheckModal from '@/components/study-room/dashboard/StudyOutCheckModal';
import { ExtensionType, MyListType } from '@/types/community';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  checkStudyExtension,
  checkMyRoleInStudy,
  fetchMyCommunityList,
} from '@/lib/api/community';
import StudyExtendCheckModal from '@/components/study-room/dashboard/StudyExtendCheckModal';
import { userAuthStore } from '@/stores/userStore';
import MyStudyInfoSkeleton from './MyStudyInfoSkeleton';
import { MessageCircleDashed } from 'lucide-react';

const categoryMap: Record<string, '' | 'NOTICE' | 'FREE'> = {
  전체: '',
  공지: 'NOTICE',
  자유: 'FREE',
};

const sortingMap: Record<string, 'createDateTime' | 'commentCount'> = {
  최신순: 'createDateTime',
  댓글순: 'commentCount',
};

export default function MyStudyInfoClient() {
  const { id } = useParams();
  const studyId = Number(id);

  const me = userAuthStore((state) => state.user);

  const [isParticipated, setIsParticipated] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('카테고리');
  const [selectedSortingType, setSelectedSortingType] = useState('최신순');
  const [keyword, setKeyword] = useState('');

  const [myCommunityList, setMyCommunityList] = useState<
    MyListType['postInfos']
  >([]);
  // const [extensionData, setExtensionData] = useState();
  // const [myData, setMyData] = useState();
  const [isExtended, setIsExtended] = useState(false);
  const [isLeader, setIsLeader] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isOpenOutModal, setIsOpenOutModal] = useState(false);
  const [isOpenExtendModal, setIsOpenExtendModal] = useState(false);

  const handleCloseOutModal = () => {
    setIsOpenOutModal(false);
  };
  const handleCloseExtendModal = () => {
    setIsOpenExtendModal(false);
  };

  const checkMyParticipation = useCallback(
    (extend: ExtensionType['members']) => {
      extend.forEach((member) => {
        if (member.userId === me?.id) setIsParticipated(member.participated);
      });
    },
    [me?.id]
  );

  const checkExtension = useCallback(async () => {
    setIsLoading(true);
    try {
      const extendData = await checkStudyExtension(studyId);
      // setExtensionData(extendData);
      setIsExtended(extendData.extended);
      checkMyParticipation(extendData.members);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [checkMyParticipation, studyId]);

  const checkMyRole = useCallback(async () => {
    setIsLoading(true);
    try {
      const roleData = await checkMyRoleInStudy(studyId);
      // setMyData(roleData);
      setIsLeader(roleData.role === 'LEADER');
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [studyId]);

  const filterList = useCallback(async () => {
    setIsLoading(true);
    try {
      const categoryValue = categoryMap[selectedCategory];
      const sortingValue = sortingMap[selectedSortingType];

      const query = {
        page,
        pageSize: 5,
        attributeName: sortingValue,
        sort: 'DESC',
        ...(categoryValue ? { category: categoryValue } : {}),
        ...(keyword ? { keyword } : {}),
      };

      const data = await fetchMyCommunityList(studyId, query);
      setMyCommunityList(data.postInfos);
      setTotalPages(data.totalPage);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, selectedSortingType, keyword, page, studyId]);

  useEffect(() => {
    checkExtension();
    checkMyRole();
  }, [checkExtension, checkMyRole]);

  useEffect(() => {
    filterList();
  }, [selectedCategory, selectedSortingType, keyword, page, filterList]);

  useEffect(() => {
    if (!isOpenExtendModal) {
      checkExtension();
    }
  }, [isOpenExtendModal]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <MyStudyInfoSkeleton />
      ) : (
        <div className='w-full'>
          <div className='tb2  text-text1'>스터디 My 정보</div>
          <div className='tm2 text-text1 mt-[30px]'>내가 작성한 글</div>
          <div className='mt-6'>
            <ListMenuStudy
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSortingType={selectedSortingType}
              setSelectedSortingType={setSelectedSortingType}
              setKeyword={setKeyword}
              setPage={setPage}
            />
          </div>
          <div
            className={`flex flex-col gap-[30px] mt-[30px] relative ${
              myCommunityList.length === 0 &&
              'h-[calc(100vh-105px-113px-193px-200px)]'
            }`}
          >
            {myCommunityList.length === 0 && (
              // <div className='flex justify-center items-center absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 tm2 text-text1/80'>
              //   내가 작성한 글이 없습니다.
              // </div>
              <div className='flex flex-col gap-3 justify-center items-center absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <MessageCircleDashed
                  className='mx-auto mb-3 w-[50px] h-[50px] text-border3'
                  strokeWidth={1}
                />
                <p className='tm3 text-border3 mb-3'>게시글이 없습니다.</p>
              </div>
            )}
            {myCommunityList.length !== 0 &&
              myCommunityList.map((post) => (
                <RecruitmentCard
                  key={post.id}
                  type='study'
                  studyId={studyId}
                  {...post}
                />
              ))}
          </div>
          <div className='mt-[45px]'>
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={setPage}
            />
          </div>

          {!isLeader && isExtended && !isParticipated && (
            <div className='mt-13'>
              <div className='tm2 text-text1'>스터디 연장 참여</div>
              <hr className='mt-4 text-border2' />
              <div className='flex justify-between items-center mt-6 t3'>
                <span className='text-green'>
                  연장된 스터디에 참여하실 수 있습니다.
                </span>
                <button
                  className='button-type2 min-w-[140px]!'
                  onClick={() => setIsOpenExtendModal(true)}
                >
                  스터디 연장 참여
                </button>
              </div>
            </div>
          )}
          {isExtended && isParticipated && (
            <div className='mt-13'>
              <div className='tm2 text-text1'>스터디 연장 참여</div>
              <hr className='mt-4 text-border2' />
              <div className='flex justify-between items-center mt-6 t3'>
                <span className='text-green'>
                  연장된 스터디에 참여 완료하셨습니다.
                </span>
                <button
                  className='button-type2 min-w-[140px]! disabled:cursor-not-allowed!'
                  disabled
                >
                  스터디 연장 참여
                </button>
              </div>
            </div>
          )}
          {!isExtended && (
            <div className='mt-13'>
              <div className='tm2 text-text1'>스터디 연장 참여</div>
              <hr className='mt-4 text-border2' />
              <div className='flex justify-between items-center mt-6 t3'>
                <span className='text-green'>
                  아직 스터디가 연장되지 않았습니다.
                </span>
                <button
                  className='button-type2 min-w-[140px]! disabled:cursor-not-allowed!'
                  disabled
                >
                  스터디 연장 참여
                </button>
              </div>
            </div>
          )}

          <div className='mt-13'>
            <div className='tm2 text-text1'>스터디 탈퇴</div>
            <hr className='mt-4 text-border2' />
            <div className='flex justify-between items-center mt-6 t3'>
              <span className='text-red'>
                스터디를 탈퇴하면 불이익이 발생합니다.
              </span>
              <button
                className='button-type2 min-w-[140px]!'
                onClick={() => setIsOpenOutModal(true)}
              >
                스터디 탈퇴
              </button>
            </div>
          </div>

          {isOpenExtendModal && (
            <StudyExtendCheckModal
              studyId={studyId}
              onClose={handleCloseExtendModal}
            />
          )}
          {isOpenOutModal && (
            <StudyOutCheckModal
              studyId={studyId}
              onClose={handleCloseOutModal}
            />
          )}
        </div>
      )}
    </>
  );
}
