import { AdminUserType } from '@/app/manager/(user)/page';

export default function ManagerUserList({
  user,
  handleDelete,
}: {
  user: AdminUserType;
  handleDelete: (id: number) => void;
}) {
  return (
    <tr className='h-13 tm4 text-center border-b border-border1 last:border-b-0 hover:bg-gray4'>
      <td className='px-5'>{user.nickname}</td>
      <td className='px-10 text-left'>{user.email}</td>
      <td className='px-5'>
        {user.activated ? (
          <span className='text-green'>활성화</span>
        ) : (
          <span className='text-red'>비활성화</span>
        )}
      </td>
      <td className='px-5'>
        <button onClick={() => handleDelete(user.id)} className='tag-type3 red'>
          삭제
        </button>
      </td>
    </tr>
  );
}
