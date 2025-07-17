'use client';

import MannerQuestion from '@/components/my/MannerQuestion';
import MannerStudyItem from '@/components/my/MannerStudyItem';
import MannerTooltip from '@/components/my/MannerTooltip';
import SubMenuItem from '@/components/my/SubMenuItem';
import { fetchStudyList, fetchUserListByStudyId } from '@/lib/api/manners';
import { BadgeQuestionMark } from 'lucide-react';
import { useState } from 'react';

export default function MannersClient({
  initialStudyList,
  initialUserList,
  initialStudyId,
}: {
  initialStudyList: Study[];
  initialUserList: User[];
  initialStudyId: number;
}) {
  const [isShown, setIsShown] = useState(false);
  const [activeStudyIndex, setActiveStudyIndex] = useState(0);
  const [activeUserIndex, setActiveUserIndex] = useState(0);

  const [studyList, setStudyList] = useState<Study[]>(initialStudyList);
  const [userList, setUserList] = useState<User[]>(initialUserList);

  const [currentStudyId, setCurrentStudyId] = useState<number>(
    initialStudyId ?? -1
  );
  const [currentUserId, setCurrentUserId] = useState<number>(
    initialUserList[0].userId ?? -1
  );
  const [currentUserName, setCurrentUserName] = useState<string>(
    initialUserList[0].nickname
  );

  const getStudyList = async () => {
    try {
      const data = await fetchStudyList();
      if (!data) {
        setStudyList([]);
        return;
      }
      setActiveStudyIndex(0);
      setCurrentStudyId(data[0].studyId);
      setStudyList(data);
      await getUserList(data[0].studyId);
    } catch (e) {
      console.error('스터디 목록 불러오기 실패:', e);
    }
  };

  const getUserList = async (studyId: number) => {
    try {
      const data = await fetchUserListByStudyId(studyId);
      if (!data) {
        await getStudyList();
        return;
      }
      setActiveUserIndex(0);
      setCurrentUserId(data[0].userId);
      setCurrentUserName(data[0].nickname);
      setUserList(data);
    } catch (e) {
      console.error('스터디원 목록 불러오기 실패:', e);
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

  return (
    <div className='w-full max-w-[908px] relative'>
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
      <div className='max-w-[908px] overflow-hidden'>
        <div className='overflow-x-auto scroll-custom'>
          <div className='flex items-center gap-10 mt-6'>
            {studyList.map((study, i) => (
              <MannerStudyItem
                key={`${study.studyId} + ${i}`}
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
            {userList.map((user, i) => (
              <SubMenuItem
                key={`${user.userId} - ${i}`}
                isActive={i === activeUserIndex}
                onClick={() => handleUserClick(user.userId, user.nickname, i)}
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
    </div>
  );
}
