import SideMenuLayout from '@/components/study-room/sideMenu/SideMenuLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='flex mt-[49px] lg:mt-0'>
        <SideMenuLayout />
        <div className='w-full'>{children}</div>
      </div>
    </>
  );
}
