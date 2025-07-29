import { userPrStore } from '@/stores/prStore';
import { Viewer } from '@toast-ui/react-editor';

export default function IntroSection() {
  const pr = userPrStore();
  if (!pr) return null;

  return (
    <>
      <div className='w-full h-[385px] border border-main/10 rounded-[10px] p-5'>
        <p className='tm3 mb-12'>소개글</p>
        <Viewer initialValue={pr.pr?.introduction ?? ''} />
      </div>
    </>
  );
}
