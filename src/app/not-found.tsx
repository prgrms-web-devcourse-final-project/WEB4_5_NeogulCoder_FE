'use client';
import Image from 'next/image';
import notFound from '@/assets/images/not-found.svg';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  const handleGoToHome = () => {
    router.push('/');
  };
  return (
    <div className='flex flex-col justify-center items-center gap-12 min-h-screen'>
      <Image
        src={notFound}
        alt='404'
        width={600}
        className='w-[30vw] lg:w-[40vw] min-w-[300px] h-auto'
      />
      <p>페이지를 찾을 수 없습니다.</p>
      <button
        type='button'
        className='button-type1 cursor-pointer max-w-[360px] h-[50px]'
        onClick={handleGoToHome}
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}
