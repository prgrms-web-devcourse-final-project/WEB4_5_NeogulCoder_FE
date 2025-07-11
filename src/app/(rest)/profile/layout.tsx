import SideBar from '@/components/profile/ProfileSideBar';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex w-full">
        <div className="w-[300px]">
          <SideBar />
        </div>

        <div className="w-[948px] pl-[40px]">{children}</div>
      </div>
    </>
  );
}
