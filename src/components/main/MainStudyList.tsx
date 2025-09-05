'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import StudyCard from '../my/StudyCard';
import 'swiper/css';
import 'swiper/css/pagination';
import '@/styles/swiper/main.css';
import Link from 'next/link';
import MainStudyListCardSkeleton from './MainStudyListCardSkeleton';
import { userAuthStore } from '@/stores/userStore';
import { useStudiesStore } from '@/stores/useStudiesStore';
import {
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  LockKeyhole,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function MainStudyList() {
  const user = userAuthStore().user;
  const { studies, loading } = useStudiesStore();

  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    handleResize(); // 최초 세팅
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 비회원
  if (user === null) return null;

  // 회원
  return (
    <>
      <div className='pt-[35px] lg:pt-[55px] xl:pt-[105px]'>
        <div className='flex items-center justify-between mt-[6px]'>
          <p className='text-[18px] lg:text-[22px] font-bold'>내 스터디</p>
          {(studies.length >= 4 ||
            (width <= 1280 && studies.length >= 3) ||
            (width <= 768 && studies.length >= 2) ||
            (width <= 400 && studies.length >= 1)) && (
            <div className='flex gap-2 swiper-nav-btns'>
              <button
                type='button'
                className='study-swiper-prev w-[30px] h-[30px] opacity-40 border rounded-full flex justify-center items-center hover:opacity-70 transition-all duration-300'
              >
                <ChevronLeft className='w-5 h-5' />
              </button>
              <button
                type='button'
                className='study-swiper-next w-[30px] h-[30px] opacity-40 border rounded-full flex justify-center items-center hover:opacity-70 transition-all duration-300'
              >
                <ChevronRight className='w-5 h-5' />
              </button>
            </div>
          )}
        </div>
        <div>
          {/* 스터디 개수 4개 이상이면 swiper */}
          {loading ? (
            <div className='flex pt-[30px] pb-[10px] justify-between'>
              <MainStudyListCardSkeleton />
              <MainStudyListCardSkeleton />
              <MainStudyListCardSkeleton />
              <MainStudyListCardSkeleton />
            </div>
          ) : (
            <>
              {studies.length >= 4 ||
              (width <= 1280 && studies.length >= 3) ||
              (width <= 768 && studies.length >= 2) ||
              (width <= 400 && studies.length >= 1) ? (
                <>
                  <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    spaceBetween={0}
                    slidesPerView={1}
                    breakpoints={{
                      400: {
                        slidesPerView: 2,
                        spaceBetween: 6,
                      },
                      768: {
                        slidesPerView: 3,
                        spaceBetween: 12,
                      },
                      1280: {
                        slidesPerView: 4,
                      },
                    }}
                    navigation={{
                      prevEl: '.study-swiper-prev', //스와이퍼 외부에 컨트롤러 설정하기
                      nextEl: '.study-swiper-next',
                    }}
                    pagination={{
                      dynamicBullets: true,
                      el: '.study-swiper-pagination',
                    }}
                  >
                    {studies &&
                      studies.map((study) => (
                        <SwiperSlide key={`${study.studyId}`}>
                          <Link
                            className='flex justify-center'
                            href={`study/${study.studyId}/dashboard`}
                          >
                            <StudyCard
                              studyId={study.studyId}
                              name={study.name}
                              leaderNickname={study.leaderNickname ?? ''}
                              currentCount={study.currentCount}
                              capacity={study.capacity}
                              startDate={study.startDate}
                              endDate={study.endDate}
                              category={study.category}
                              studyType={study.studyType}
                              introduction={study.introduction}
                              imageUrl={study.imageUrl ?? ''}
                              finished={study.finished}
                            />
                          </Link>
                        </SwiperSlide>
                      ))}
                  </Swiper>

                  <div className='relative mt-7'>
                    <div className='study-swiper-pagination swiper-pagination swiper-pagination-bullets-dynamic swiper-pagination-bullets swiper-pagination-horizontal'></div>
                  </div>
                </>
              ) : (
                <div
                  className={`flex pt-[30px] pb-[10px] ${
                    studies.length !== 0 && 'gap-3 lg:gap-10'
                  } `}
                >
                  <div className='flex shrink-0 gap-3 lg:gap-10 '>
                    {studies &&
                      studies.map((study) => (
                        <Link
                          key={`${study.studyId}`}
                          href={`study/${study.studyId}/dashboard`}
                        >
                          <StudyCard
                            studyId={study.studyId}
                            name={study.name}
                            leaderNickname={study.leaderNickname ?? ''}
                            currentCount={study.currentCount}
                            capacity={study.capacity}
                            startDate={study.startDate}
                            endDate={study.endDate}
                            category={study.category}
                            studyType={study.studyType}
                            introduction={study.introduction}
                            imageUrl={study.imageUrl ?? ''}
                            finished={study.finished}
                          />
                        </Link>
                      ))}
                  </div>
                  <div className='w-full min-h-[246px] lg:h-[310px] flex items-center justify-center text-gray3 bg-gray4/40 rounded-[30px]'>
                    <div className='text-center'>
                      <Link href='#recruit' className='group'>
                        <LockKeyhole
                          className='mx-auto w-9 h-9 mb-2 lg:w-12 lg:h-12 lg:mb-3'
                          strokeWidth={1}
                        />
                        <p className='mb-2 t3 text-[14px] md:text-base'>
                          {' '}
                          더 많은 스터디에 참여해보세요
                        </p>

                        <ArrowDown className='mx-auto w-5 h-5 group-hover:animate-bounce' />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
