import SideMenu from '@/components/study-room/sideMenu/SideMenu';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='flex'>
        <div className='w-[300px] mr-10 shrink-0'>
          <SideMenu />
        </div>
        <div className='w-full'>{children}</div>
      </div>
    </>
  );
}
