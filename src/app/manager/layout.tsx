import ManagerHeader from '@/components/manager/ManagerHeader';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <ManagerHeader />
      </div>
      <div className='max-w-[1280px] m-auto px-4 pt-12'>{children}</div>
    </>
  );
}
