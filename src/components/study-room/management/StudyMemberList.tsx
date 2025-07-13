'use client';

import StudyMemberCard from './StudyMemberCard';

export default function MemberList() {
  const members = [
    {
      name: '홍길동',
      image:
        'https://i.pinimg.com/1200x/7f/6a/56/7f6a561d683ee6001f540e358b933da9.jpg',
      role: '팀장',
    },
    {
      name: '홍길동동',
      image:
        'https://i.pinimg.com/1200x/7f/6a/56/7f6a561d683ee6001f540e358b933da9.jpg',
      role: '팀원',
    },
    {
      name: '홍길동동동',
      image:
        'https://i.pinimg.com/1200x/7f/6a/56/7f6a561d683ee6001f540e358b933da9.jpg',
      role: '팀원',
    },
    {
      name: '홍길동3',
      image:
        'https://i.pinimg.com/1200x/7f/6a/56/7f6a561d683ee6001f540e358b933da9.jpg',
      role: '팀원',
    },
    {
      name: '홍길동4',
      image:
        'https://i.pinimg.com/1200x/7f/6a/56/7f6a561d683ee6001f540e358b933da9.jpg',
      role: '팀원',
    },
    {
      name: '홍길동5',
      image:
        'https://i.pinimg.com/1200x/7f/6a/56/7f6a561d683ee6001f540e358b933da9.jpg',
      role: '팀원',
    },
  ];
  return (
    <>
      <div className='flex justify-between mb-10'>
        <h3 className='tb3'>스터디원 목록</h3>
      </div>
      <div className='grid grid-cols-2 gap-5'>
        {members.map((member, i) => (
          <StudyMemberCard
            key={`${member.name}${i}`}
            name={member.name}
            image={member.image}
            role={member.role}
          />
        ))}
      </div>
    </>
  );
}
