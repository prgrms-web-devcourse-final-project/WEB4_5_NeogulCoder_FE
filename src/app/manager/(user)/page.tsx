import Pagination from '@/components/common/Pagination';
import ManagerUserList from '@/components/manager/ManagerUserList';

export default function page() {
  const users = [
    {
      name: '홍길동1',
      email: 'hong1@gmail.com',
      state: true,
    },
    {
      name: '홍길동2',
      email: 'hong2@gmail.com',
      state: false,
    },
    {
      name: '홍길동3',
      email: 'hong3@gmail.com',
      state: true,
    },
    {
      name: '홍길동4',
      email: 'hong4@gmail.com',
      state: true,
    },
    {
      name: '홍길동5',
      email: 'hong5@gmail.com',
      state: true,
    },
    {
      name: '홍길동6',
      email: 'hong6@gmail.com',
      state: true,
    },
    {
      name: '홍길동7',
      email: 'hong7@gmail.com',
      state: true,
    },
    {
      name: '홍길동8',
      email: 'hong8@gmail.com',
      state: true,
    },
    {
      name: '홍길동9',
      email: 'hong9@gmail.com',
      state: false,
    },
    {
      name: '홍길동10',
      email: 'hong10@gmail.com',
      state: true,
    },
  ];
  return (
    <>
      <h1 className='tb2 mb-6'>회원 목록</h1>
      <div className='w-full border rounded-[10px] border-border1 overflow-hidden mb-10'>
        <table className='w-full'>
          <thead className='bg-gray4 h-15'>
            <tr className='border-b border-border1'>
              <th className='px-5'>이름</th>
              <th className='px-5'>이메일</th>
              <th className='px-5'>상태</th>
              <th className='px-5'>상태변경</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <ManagerUserList key={`${user.name}${i}`} user={user} />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </>
  );
}
