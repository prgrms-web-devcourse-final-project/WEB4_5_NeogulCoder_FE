import { categoryFormatting } from '@/utils/categoryFormatting';

export default function ManagerStudyList({
  study,
  handleDelete,
  handleActive,
}: {
  study: AdminStudyType;
  handleDelete: (num: number) => void;
  handleActive: (num: number) => void;
}) {
  return (
    <tr className='h-13 tm4 text-center border-b border-border1 last:border-b-0 hover:bg-gray4'>
      <td className='px-2 lg:px-5 break-words'>{study.name}</td>
      <td className='px-2 lg:px-5 break-words'>
        {categoryFormatting(study.category)}
      </td>
      <td className='px-2 lg:px-5 break-words'>
        {study.finished ? '종료' : '진행중'}
      </td>
      <td className='px-2 lg:px-5 break-words'>
        {study.activated ? (
          <span className='text-green'>활성화</span>
        ) : (
          <span className='text-red'>비활성화</span>
        )}
      </td>
      <td className='px-2 lg:px-5 break-words'>
        {study.activated ? (
          <button
            onClick={() => handleDelete(study.id)}
            className='tag-type3 red mobile1'
          >
            비활성화
          </button>
        ) : (
          <button
            onClick={() => handleActive(study.id)}
            className='tag-type3 !bg-green mobile1'
          >
            활성화
          </button>
        )}
      </td>
    </tr>
  );
}
