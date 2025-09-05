import logo from '@/assets/images/footer-logo.svg';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='text-text1/60 w-full px-4 bg-gray4 max-[1024px]:hidden'>
      <div className='max-w-[1280px] m-auto flex justify-between items-center h-30'>
        <div className='flex flex-col gap-3'>
          <Image src={logo} alt='로고' className='' />
          <span className='t4'>© 2025 Wibby. All rights reserved.</span>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='tm4'>너굴코더</span>
          <span className='t5'>[FE] 박서영 유강민 조소정 한유빈</span>
          <span className='t5'>[BE] 김도연 류이서 박현서 유강현 조희제</span>
        </div>
      </div>
    </footer>
  );
}
