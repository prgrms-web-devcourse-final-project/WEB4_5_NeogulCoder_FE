import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import SubHeader from '@/components/common/SubHeader';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='fixed left-0 top-0 right-0 bg-white z-25'>
        <Header />
        <SubHeader />
      </div>
      <div className='max-w-[1280px] m-auto mt-[107px] lg:pt-[48px] pb-16 lg:px-4 lg:min-h-[800px]'>
        {children}
      </div>
      <Footer />
    </>
  );
}
