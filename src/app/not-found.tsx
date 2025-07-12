'use client';
import Image from 'next/image';
import notFound from '@/assets/images/not-found.svg';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  const handleGoHome = () => {
    router.push('/main');
  };
  return (
    <div className="flex flex-col justify-center items-center gap-12 min-h-screen">
      <Image src={notFound} alt="404" width={600} />
      <button
        type="button"
        className="button-type1 cursor-pointer"
        onClick={handleGoHome}
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}
