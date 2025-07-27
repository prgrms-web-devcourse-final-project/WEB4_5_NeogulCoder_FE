import SideMenuMy from '@/components/my/SideMenuMy';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-10">
      <div className="w-[300px]">
        <SideMenuMy />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
