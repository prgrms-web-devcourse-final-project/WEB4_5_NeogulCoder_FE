import { userPrStore } from '@/stores/prStore';
import { Viewer } from '@toast-ui/react-editor';

export default function IntroSection() {
  const pr = userPrStore();
  if (!pr) return null;

  return (
    <>
      <div className='w-full lg:h-[385px] lg:border lg:border-main/10 lg:rounded-[10px] p-5'>
        <p className='tm3 lg:mb-12'>소개글</p>
        <hr className='block lg:hidden w-full border-t border-gray-200 mt-2 mb-8' />

        <Viewer initialValue={pr.pr?.introduction ?? ''} />
      </div>
    </>
  );
}
