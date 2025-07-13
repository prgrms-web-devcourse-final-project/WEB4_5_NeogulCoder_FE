type ManagerUserType = {
  name: string;
  state: boolean;
  email: string;
};
export default function ManagerUserList({ user }: { user: ManagerUserType }) {
  return (
    <tr className='h-13 tm4 text-center border-b border-border1 last:border-b-0 hover:bg-gray4'>
      <td className='px-5'>{user.name}</td>
      <td>{user.email}</td>
      <td className='px-5'>
        {user.state ? (
          <span className='text-green'>활성화</span>
        ) : (
          <span className='text-red'>비활성화</span>
        )}
      </td>
      <td className='px-5'>
        <button className='tag-type3 red'>삭제</button>
      </td>
    </tr>
  );
}
