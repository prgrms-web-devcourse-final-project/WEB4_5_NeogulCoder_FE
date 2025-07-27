import { AdminPostType } from '@/app/manager/recruitment/page';
import dayjs from 'dayjs';
import Link from 'next/link';

export default function ManagerRecruitment({
  recruit,
  handleDelete,
}: {
  recruit: AdminPostType;
  handleDelete: (id: number) => void;
}) {
  return (
    <>
      <tr className='h-13 tm4 text-center border-b border-border1 last:border-b-0 hover:bg-gray4'>
        <td className='px-5'>
          <Link href={`/recruitment/detail/${recruit.id}`} target='_black'>
            {recruit.subject}
          </Link>
        </td>
        <td className='px-5'>
          {dayjs(recruit.expiredDate).format('YYYY-MM-DD ( HH:mm:ss )')}
        </td>
        <td className='px-5'>
          {recruit.activated ? (
            <span className='text-green'>활성화</span>
          ) : (
            <span className='text-red'>비활성화</span>
          )}
        </td>
        <td className='px-5'>
          <button
            onClick={() => handleDelete(recruit.id)}
            className='tag-type3 red'
          >
            삭제
          </button>
        </td>
      </tr>
    </>
  );
}
