import Pagination from '@/components/common/Pagination';
import ManagerRecruitmentList from '@/components/manager/ManagerRecruitmentList';

export default function page() {
  const recruits = [
    {
      name: '모집글1',
    },
    {
      name: '모집글2',
    },
    {
      name: '모집글3',
    },
    {
      name: '모집글4',
    },
    {
      name: '모집글5',
    },
    {
      name: '모집글6',
    },
    {
      name: '모집글7',
    },
    {
      name: '모집글8',
    },
    {
      name: '모집글9',
    },
    {
      name: '모집글10',
    },
  ];
  return (
    <>
      <h1 className='tb2 mb-6'>모집글 목록</h1>
      <div className='w-full border rounded-[10px] border-border1 overflow-hidden mb-10'>
        <table className='w-full'>
          <thead className='bg-gray4 h-15'>
            <tr className='border-b border-border1'>
              <th className='px-5'>제목</th>
              <th className='w-[200px] px-5'>삭제</th>
            </tr>
          </thead>
          <tbody>
            {recruits.map((recruit, i) => (
              <ManagerRecruitmentList
                key={`${recruit.name}${i}`}
                recruit={recruit}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </>
  );
}
