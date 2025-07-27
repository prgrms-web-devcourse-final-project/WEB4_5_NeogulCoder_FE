import { userPrStore } from '@/stores/prStore';

export default function IntroSection() {
  const pr = userPrStore();
  if (!pr) return null;

  return (
    <>
      <div className='w-full h-[385px] border border-main/10 rounded-[10px] p-5'>
        <p className='tm3 mb-12'>소개글</p>
        <div className='t4 whitespace-pre-line'>
          {pr?.pr?.introduction ?? ''}
        </div>
      </div>
    </>
  );
}
