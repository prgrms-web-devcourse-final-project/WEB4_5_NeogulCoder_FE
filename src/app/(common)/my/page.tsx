import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function MyPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('ACCESS_TOKEN')?.value;

  // accessToken이 없으면 로그인 페이지로 리디렉션
  if (!accessToken) {
    redirect('/login');
  }

  return (
    <div className='p-4'>
      <h1>마이페이지 👤</h1>
      <p>accessToken: {accessToken}</p>
    </div>
  );
}
