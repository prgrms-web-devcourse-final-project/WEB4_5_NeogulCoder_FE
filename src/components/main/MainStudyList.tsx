import { ChevronLeft, ChevronRight } from 'lucide-react';
import StudyCard from '../my/StudyCard';
import { useEffect, useState } from 'react';
import { getStudiesInfo } from '@/lib/api/study.api';

export default function MainStudyList() {
  const [studies, setStudies] = useState<StudiesListType[]>([]);
  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const { data } = await getStudiesInfo();
        setStudies(data.studies);
      } catch (error) {
        console.error('스터디 목록을 불러오는데 실패 했습니다.', error);
      }
    };

    fetchStudies();
  }, []);

  return (
    <>
      <div className='flex items-center justify-between mt-[6px]'>
        <p className='text-[22px] font-bold'>내 스터디</p>
        <div className='flex gap-2'>
          <button
            type='button'
            className='w-[30px] h-[30px] border border-border1 rounded-full flex justify-center items-center'
          >
            <ChevronLeft className='opacity-20 w-5 h-5' />
          </button>
          <button
            type='button'
            className='w-[30px] h-[30px] border border-border1 rounded-full flex justify-center items-center'
          >
            <ChevronRight className='opacity-20 w-5 h-5' />
          </button>
        </div>
      </div>
      <div className='mt-[30px] flex gap-[52px]'>
        {studies &&
          studies.map((study, index) => (
            <StudyCard
              key={index}
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
    </>
  );
}
