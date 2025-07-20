'use client';

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import {
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  LockKeyhole,
} from 'lucide-react';
import StudyCard from '../my/StudyCard';
import { useEffect, useState } from 'react';
import { getStudiesInfo } from '@/lib/api/study.api';
import 'swiper/css';
import '@/styles/swiper/main.css';
import Link from 'next/link';
import MainStudyListCardSkeleton from './MainStudyListCardSkeleton';
import { userAuthStore } from '@/stores/userStore';

export default function MainStudyList() {
  const user = userAuthStore().user;
  const [studies, setStudies] = useState<StudiesListType[]>([]);
  const [swiper, setSwiper] = useState<SwiperClass>();
  const [loading, setIsLoading] = useState(true);

  // 스터디 fetch
  useEffect(() => {
    if (!user) return;
    const fetchStudies = async () => {
      try {
        const { data } = await getStudiesInfo();
        setStudies(data.studies);
      } catch (error) {
        console.error('스터디 목록을 불러오는데 실패했습니다.', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudies();
  }, [user]);

  // 비회원
  if (user === null) return null;

  // 회원
  return (
    <>
      <div className='pt-[105px]'>
        <div className='flex items-center justify-between mt-[6px]'>
          <p className='text-[22px] font-bold'>내 스터디</p>
          {studies.length > 4 && (
            <div className='flex gap-2 swiper-nav-btns'>
              <button
                type='button'
                className='w-[30px] h-[30px] border border-border1 rounded-full flex justify-center items-center'
                onClick={() => {
                  swiper?.slidePrev();
                }}
              >
                <ChevronLeft className='opacity-20 w-5 h-5' />
              </button>
              <button
                type='button'
                className='w-[30px] h-[30px] border border-border1 rounded-full flex justify-center items-center'
                onClick={() => {
                  swiper?.slideNext();
                }}
              >
                <ChevronRight className='opacity-20 w-5 h-5' />
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
              {studies.length > 4 ? (
                <Swiper
                  modules={[Navigation, Pagination, A11y]}
                  spaceBetween={0}
                  slidesPerView={4}
                  loop={true}
                  onSlideChange={() => console.log('slide change')}
                  onSwiper={(e) => {
                    setSwiper(e);
                  }}
                >
                  {studies &&
                    studies.map((study) => (
                      <SwiperSlide key={`${study.studyId}`}>
                        <StudyCard
                          studyId={study.studyId}
                          name={study.name}
                          leaderNickname={study.leaderNickname}
                          currentCount={study.currentCount}
                          capacity={study.capacity}
                          startDate={study.startDate}
                          category={study.category}
                          studyType={study.studyType}
                          introduction={study.introduction}
                          imageUrl={study.imageUrl}
                          finished={study.finished}
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
              ) : (
                <div className='flex pt-[30px] pb-[10px] gap-10'>
                  <div className='flex shrink-0 gap-10'>
                    {studies &&
                      studies.map((study) => (
                        <StudyCard
                          key={`${study.studyId}`}
                          studyId={study.studyId}
                          name={study.name}
                          leaderNickname={study.leaderNickname}
                          currentCount={study.currentCount}
                          capacity={study.capacity}
                          startDate={study.startDate}
                          category={study.category}
                          studyType={study.studyType}
                          introduction={study.introduction}
                          imageUrl={study.imageUrl}
                          finished={study.finished}
                        />
                      ))}
                  </div>
                  <div className='w-full h-[310px] flex items-center justify-center text-gray3 bg-gray4/40 rounded-[30px]'>
                    <div className='text-center'>
                      <Link href='#recruit' className='group'>
                        <LockKeyhole
                          className='mx-auto w-12 h-12 mb-3'
                          strokeWidth={1}
                        />
                        <p className='mb-2 t3'>
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
