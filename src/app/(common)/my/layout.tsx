import SideMenuMy from '@/components/my/SideMenuMy';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex max-[1024px]:flex-col lg:gap-10 max-[1024px]:overflow-hidden'>
      <div className='lg:w-[300px] max-[1024px]:border-b max-[1024px]:border-main/10 max-[1024px]:overflow-x-auto scroll-custom'>
        <SideMenuMy />
      </div>
      <div className='w-full max-[1024px]:px-[18px]'>{children}</div>
    </div>
  );
}
