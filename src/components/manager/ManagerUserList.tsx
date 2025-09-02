export default function ManagerUserList({
  user,
  handleDelete,
  handleActive,
}: {
  user: AdminUserType;
  handleDelete: (id: number) => void;
  handleActive: (id: number) => void;
}) {
  return (
    <tr className='h-13 tm4 text-center border-b border-border1 last:border-b-0 hover:bg-gray4'>
      <td className='px-1 lg:px-5 break-words'>{user.nickname}</td>
      <td className='px-1 lg:px-10 text-left break-words'>{user.email}</td>
      <td className='px-1 lg:px-5 break-words'>
        {user.activated ? (
          <span className='text-green'>활성화</span>
        ) : (
          <span className='text-red'>비활성화</span>
        )}
      </td>
      <td className='px-1 lg:px-5'>
        {user.activated ? (
          <button
            onClick={() => handleDelete(user.id)}
            className='tag-type3 mobile1 red'
          >
            비활성화
          </button>
        ) : (
          <button
            onClick={() => handleActive(user.id)}
            className='tag-type3 mobile1 !bg-green'
          >
            활성화
          </button>
        )}
      </td>
    </tr>
  );
}
