import { ChevronRight } from 'lucide-react';

export default function SideMenuItem({ name, active }: { name: string; active: boolean }) {
  return (
    <>
      <button className={`flex justify-between ${active ? 'opacity-100' : 'opacity-30'}`}>
        <span className='tm3'>{name}</span>
        <ChevronRight className='w-[22px] h-[22px]' />
      </button>
    </>
  );
}
