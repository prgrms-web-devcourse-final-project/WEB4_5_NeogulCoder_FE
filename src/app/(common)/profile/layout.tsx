import ProfileSideBar from '@/components/profile/ProfileSideBar';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='w-full mx-auto lg:grid lg:grid-cols-[300px_1fr] lg:gap-10'>
        <aside className='hidden lg:block'>
          <div className='w-[300px]'>
            <ProfileSideBar />
          </div>
        </aside>

        <main className='w-full lg:pl-10 min-w-0 '>{children}</main>
      </div>
    </>
  );
}
