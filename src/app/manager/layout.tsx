import ManagerHeader from '@/components/manager/ManagerHeader';
import ManagerMobileMenu from '@/components/manager/ManagerMobileMenu';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='pt-[57px] lg:pt-[69px] pb-[60px] lg:pb-0'>
      <div>
        <ManagerHeader />
      </div>
      <div className='max-w-[1280px] m-auto px-[18px] lg:px-4 pt-8 lg:pt-12 pb-8'>
        {children}
      </div>
      <div>
        <ManagerMobileMenu />
      </div>
    </div>
  );
}
