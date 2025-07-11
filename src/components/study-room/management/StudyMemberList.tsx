import StudyMemberCard from './StudyMemberCard';

export default async function MemberList() {
  const members = [
    { name: '홍길동', image: 'https://i.pinimg.com/1200x/7f/6a/56/7f6a561d683ee6001f540e358b933da9.jpg' },
    { name: '홍길동', image: 'https://i.pinimg.com/1200x/7f/6a/56/7f6a561d683ee6001f540e358b933da9.jpg' },
    { name: '홍길동', image: 'https://i.pinimg.com/1200x/7f/6a/56/7f6a561d683ee6001f540e358b933da9.jpg' },
    { name: '홍길동', image: 'https://i.pinimg.com/1200x/7f/6a/56/7f6a561d683ee6001f540e358b933da9.jpg' },
    { name: '홍길동', image: 'https://i.pinimg.com/1200x/7f/6a/56/7f6a561d683ee6001f540e358b933da9.jpg' },
    { name: '홍길동', image: 'https://i.pinimg.com/1200x/7f/6a/56/7f6a561d683ee6001f540e358b933da9.jpg' },
  ];
  return (
    <>
      <div className='flex justify-between mb-10'>
        <h3 className='tm1'>스터디원 목록</h3>
      </div>
      <div className='grid grid-cols-2 gap-5'>
        {members.map((member, i) => (
          <StudyMemberCard key={`${member.name}${i}`} name={member.name} image={member.image} />
        ))}
      </div>
    </>
  );
}
