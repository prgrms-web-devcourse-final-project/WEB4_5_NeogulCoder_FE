import dayjs from 'dayjs';
import Link from 'next/link';

export default function ManagerRecruitment({
  recruit,
  handleDelete,
  handleActive,
}: {
  recruit: AdminPostType;
  handleDelete: (id: number) => void;
  handleActive: (id: number) => void;
}) {
  return (
    <>
      <tr className='h-13 tm4 text-center border-b border-border1 last:border-b-0 hover:bg-gray4'>
        <td className='px-2 lg:px-5 break-words'>
          <Link href={`/recruitment/detail/${recruit.id}`} target='_black'>
            {recruit.subject}
            {recruit.id}
          </Link>
        </td>
        <td className='px-2 lg:px-5 break-words text-[10px] md:text-sm'>
          {dayjs(recruit.expiredDate).format('YYYY-MM-DD ( HH:mm:ss )')}
        </td>
        <td className='px-2 lg:px-5 break-words'>
          {recruit.activated ? (
            <span className='text-green'>활성화</span>
          ) : (
            <span className='text-red'>비활성화</span>
          )}
        </td>
        <td className='px-2 lg:px-5 break-words'>
          {recruit.activated ? (
            <button
              onClick={() => handleDelete(recruit.id)}
              className='tag-type3 red mobile1'
            >
              비활성화
            </button>
          ) : (
            <button
              onClick={() => handleActive(recruit.id)}
              className='tag-type3 !bg-green mobile1'
            >
              활성화
            </button>
          )}
        </td>
      </tr>
    </>
  );
}
