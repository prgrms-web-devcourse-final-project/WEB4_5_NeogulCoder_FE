import SideBar from '@/components/common/SideBar';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-10">
      <div className="w-[300px]">
        <SideBar />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
