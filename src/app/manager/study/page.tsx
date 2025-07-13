import Pagination from '@/components/common/Pagination';
import ManagerStudyList from '@/components/manager/ManagerStudyList';
export default function page() {
  const studies = [
    {
      name: '스터디1',
    },
    {
      name: '스터디2',
    },
    {
      name: '스터디3',
    },
    {
      name: '스터디4',
    },
    {
      name: '스터디5',
    },
    {
      name: '스터디6',
    },
    {
      name: '스터디7',
    },
    {
      name: '스터디8',
    },
    {
      name: '스터디9',
    },
    {
      name: '스터디10',
    },
  ];
  return (
    <>
      <h1 className='tb2 mb-6'>스터디 목록</h1>
      <div className='w-full border rounded-[10px] border-border1 overflow-hidden mb-10'>
        <table className='w-full'>
          <thead className='bg-gray4 h-15'>
            <tr className='border-b border-border1'>
              <th className='px-5'>이름</th>
              <th className='w-[200px] px-5'>삭제</th>
            </tr>
          </thead>
          <tbody>
            {studies.map((study, i) => (
              <ManagerStudyList key={`${study.name}${i}`} study={study} />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </>
  );
}
