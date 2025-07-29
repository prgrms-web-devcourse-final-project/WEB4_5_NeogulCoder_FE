'use client';

import MannerQuestion from '@/components/my/MannerQuestion';
import MannerStudyItem from '@/components/my/MannerStudyItem';
import MannerTooltip from '@/components/my/MannerTooltip';
import SubMenuItem from '@/components/my/SubMenuItem';
import { fetchStudyList, fetchUserListByStudyId } from '@/lib/api/manners';
import { BadgeQuestionMark } from 'lucide-react';
import Image from 'next/image';
import completeStamp from '@/assets/images/complete-stamp.svg';
import { useEffect, useState } from 'react';
import { Study, User } from '@/types/manners';
import MannerSkeleton from './MannerSkeleton';
import { toast } from 'react-toastify';

export default function MannersClient() {
  const [isShown, setIsShown] = useState(false);
  const [activeStudyIndex, setActiveStudyIndex] = useState(0);
  const [activeUserIndex, setActiveUserIndex] = useState(0);

  const [studyList, setStudyList] = useState<Study[]>([]);
  const [userList, setUserList] = useState<User[]>([]);

  const [currentStudyId, setCurrentStudyId] = useState<number>(-1);
  const [currentUserId, setCurrentUserId] = useState<number>(-1);
  const [currentUserName, setCurrentUserName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const getStudyList = async () => {
    setIsLoading(true);
    try {
      const data = await fetchStudyList();
      if (data.length === 0) {
        setStudyList([]);
        return;
      }
      setActiveStudyIndex(0);
      setCurrentStudyId(data?.[0]?.studyId);
      setStudyList(data);
      if (data[0].studyId) await getUserList(data?.[0]?.studyId);
    } catch (e) {
      console.error('스터디 목록 불러오기 실패:', e);
      toast.error('오류가 발생했습니다. 다시 시도해주세요!');
    } finally {
      setIsLoading(false);
    }
  };

  const getUserList = async (studyId: number) => {
    setIsLoading(true);
    try {
      const data = await fetchUserListByStudyId(studyId);
      if (data.length === 0) {
        await getStudyList();
        return;
      }
      setActiveUserIndex(0);
      setCurrentUserId(data?.[0]?.userId);
      setCurrentUserName(data?.[0]?.nickname);
      setUserList(data);
    } catch (e) {
      console.error('스터디원 목록 불러오기 실패:', e);
      toast.error('오류가 발생했습니다. 다시 시도해주세요!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStudyClick = async (studyId: number, index: number) => {
    await getUserList(studyId);
    setActiveStudyIndex(index);
    setCurrentStudyId(studyId);
  };

  const handleUserClick = (userId: number, nickname: string, index: number) => {
    setActiveUserIndex(index);
    setCurrentUserId(userId);
    setCurrentUserName(nickname);
  };

  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
    getStudyList();
  }, []);

  return (
    <>
      {isLoading ? (
        <MannerSkeleton />
      ) : (
        <div
          className={`w-full max-w-[908px] relative ${
            studyList.length === 0 && 'h-[calc(100vh-105px-113px)]'
          }`}
        >
          {isShown && (
            <div className='absolute top-9 right-1 z-10'>
              <MannerTooltip />
            </div>
          )}
          <div className='flex justify-between items-center'>
            <div className='tb3'>스터디원 매너 평가</div>
            <BadgeQuestionMark
              className='w-6 h-6 text-main opacity-70 hover:opacity-100'
              onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}
            />
          </div>
          {studyList.length === 0 ? (
            <div className='flex flex-col gap-10 justify-center items-center absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 tm2 text-text1/80'>
              <Image
                src={completeStamp}
                alt='completeStamp'
                className={`w-28 h-28 -rotate-[20deg] ${
                  showAnimation ? 'animate-stamp' : 'opacity-0'
                }`}
              />
              <span>현재 가능한 매너 평가가 없습니다!</span>
            </div>
          ) : (
            <>
              <div className='max-w-[908px] overflow-hidden'>
                <div className='overflow-x-auto scroll-custom'>
                  <div className='flex items-center gap-10 mt-6'>
                    {Array.isArray(studyList) &&
                      studyList &&
                      studyList.map((study, i) => (
                        <MannerStudyItem
                          key={`${study.studyId} - ${i}`}
                          {...study}
                          isActive={i === activeStudyIndex}
                          onClick={() => handleStudyClick(study.studyId, i)}
                        />
                      ))}
                  </div>
                </div>
              </div>
              <div className='max-w-[908px] overflow-hidden'>
                <div className='overflow-x-auto scroll-custom'>
                  <div className='flex items-center mt-6'>
                    {Array.isArray(userList) &&
                      userList &&
                      userList.map((user, i) => (
                        <SubMenuItem
                          key={`${user.userId} - ${i}`}
                          isActive={i === activeUserIndex}
                          onClick={() =>
                            handleUserClick(user.userId, user.nickname, i)
                          }
                        >
                          {user.nickname}
                        </SubMenuItem>
                      ))}
                  </div>
                </div>
              </div>
              <MannerQuestion
                key={`${activeStudyIndex}-${activeUserIndex}`}
                currentStudyId={currentStudyId}
                currentUserId={currentUserId}
                currentUserName={currentUserName}
                getUserList={getUserList}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}
