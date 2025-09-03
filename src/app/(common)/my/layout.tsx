import SideMenuMy from '@/components/my/SideMenuMy';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex max-[1024px]:flex-col lg:gap-10 max-[1024px]:overflow-hidden'>
      {/* <div className='lg:w-[300px] max-[1024px]:border-b max-[1024px]:border-main/10 max-[1024px]:overflow-x-auto scroll-custom'> */}
      <div className='lg:w-[300px] shrink-0 lg:static fixed left-0 top-[47px] w-full bg-white border-b border-border1 lg:border-none z-24 lg:z-auto max-[1024px]:overflow-x-auto scroll-custom'>
        <SideMenuMy />
      </div>
      <div className='w-full max-[1024px]:px-[18px] max-[1024px]:my-[50px]'>
        {children}
      </div>
    </div>
  );
}
