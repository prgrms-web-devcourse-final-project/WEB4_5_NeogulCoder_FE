import SideMenu from '@/components/study-room/sideMenu/SideMenu';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='max-w-[1248px] mx-auto flex px-5'>
        <div className='w-[280px] mr-10 shrink-0'>
          <SideMenu />
        </div>
        <div className='w-full'>{children}</div>
      </div>
    </>
  );
}
