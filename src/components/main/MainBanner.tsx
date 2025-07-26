import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import banner1 from '@/assets/images/banner1.svg';
import banner2 from '@/assets/images/banner2.svg';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

export default function MainBanner() {
  return (
    <>
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        effect={'fade'}
        speed={1000}
        loop={true}
        pagination={{
          el: '.banner-pagination',
          clickable: true,
        }}
      >
        <SwiperSlide>
          <Image src={banner1} alt='banner' width={0} height={300} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={banner2} alt='banner2' width={0} height={300} />
        </SwiperSlide>
      </Swiper>
      <div className='banner-pagination flex justify-center gap-2.5 py-3'></div>
    </>
  );
}
