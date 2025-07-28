'use client';

import { useState } from 'react';
import StudyMemberCard from './StudyMemberCard';
import StudyRoomInviteModal from './StudyRoomInviteModal';

export default function MemberList({
  memberInfo,
  studyId,
}: {
  memberInfo: StudyMemberType[];
  studyId: number;
}) {
  const [inviteOpen, steInviteOpen] = useState(false);
  return (
    <>
      <div className='flex justify-between mb-10 items-end'>
        <h3 className='tb3'>스터디원 목록</h3>
        <button className='button-sm-type1' onClick={() => steInviteOpen(true)}>
          초대하기
        </button>
      </div>
      <div className='grid grid-cols-2 gap-5'>
        {memberInfo.map((member, i) => (
          <StudyMemberCard
            key={`${member.nickname}${i}`}
            member={member}
            studyId={studyId}
          />
        ))}
      </div>
      {inviteOpen && (
        <StudyRoomInviteModal
          studyId={studyId}
          memberInfo={memberInfo}
          closeFn={() => steInviteOpen(false)}
        />
      )}
    </>
  );
}
