import Header from "@/components/common/Header";
import SubHeader from "@/components/common/SubHeader";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='fixed left-0 top-0 right-0 bg-white z-10'>
        <Header />
        <SubHeader />
      </div>

      <div className='max-w-[1248px] m-auto mt-[144px] pt-[48px] pb-16'>
        {children}
      </div>

    </>
  );
}
