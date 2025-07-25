'use client';

import StudyMemberCard from './StudyMemberCard';

export default function MemberList({
  memberInfo,
  studyId,
}: {
  memberInfo: StudyMemberType[];
  studyId: number;
}) {
  return (
    <>
      <div className='flex justify-between mb-10'>
        <h3 className='tb3'>스터디원 목록</h3>
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
    </>
  );
}
