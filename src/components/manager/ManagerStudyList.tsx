import { AdminStudyType } from '@/app/manager/study/page';

export default function ManagerStudyList({
  study,
  handleDelete,
}: {
  study: AdminStudyType;
  handleDelete: (num: number) => void;
}) {
  return (
    <tr className='h-13 tm4 text-center border-b border-border1 last:border-b-0 hover:bg-gray4'>
      <td className='px-5'>{study.name}</td>
      <td className='px-5'>{study.category}</td>
      <td className='px-5'>{study.finished ? '종료' : '진행중'}</td>
      <td className='px-5'>
        {study.activated ? (
          <span className='text-green'>활성화</span>
        ) : (
          <span className='text-red'>비활성화</span>
        )}
      </td>
      <td className='px-5'>
        <button
          onClick={() => handleDelete(study.id)}
          className='tag-type3 red'
        >
          삭제
        </button>
      </td>
    </tr>
  );
}
