import { PencilLine, Trash2 } from 'lucide-react';

type MenuProps = {
  title?: string;
};

export default function ClickVerticalMenu({ title }: MenuProps) {
  return (
    <>
      <div className='absolute right-0 mt-2 w-[160px] border border-main/10 bg-white rounded-md shadow-lg overflow-hidden tm3 z-11'>
        <div className='gap-3 px-4 py-3'>
          <span className='text-[#b2b2b2]'>{`${title}`}</span>
        </div>
        <button
          type='button'
          className='flex gap-3 px-4 py-3 w-full hover:bg-gray4'
        >
          <PencilLine />
          수정하기
        </button>

        <div className='h-px bg-gray4' />

        <button
          type='button'
          className='flex items-center gap-3 px-4 py-3 w-full hover:bg-gray4 text-[#ff5955]'
        >
          <Trash2 color='#ff5955' />
          삭제하기
        </button>
      </div>
    </>
  );
}
