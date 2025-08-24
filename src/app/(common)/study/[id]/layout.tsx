import SideMenuLayout from '@/components/study-room/sideMenu/SideMenuLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='flex'>
        <div className='hidden lg:block'>
          <SideMenuLayout />
        </div>
        <div className='w-full'>{children}</div>
      </div>
    </>
  );
}
