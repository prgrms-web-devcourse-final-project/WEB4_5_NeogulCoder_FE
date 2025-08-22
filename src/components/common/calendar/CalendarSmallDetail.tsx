import CalendarSmallDetailItem from './CalendarSmallDetailItem';
import dayjs from 'dayjs';
import { dayFormatting } from '@/utils/day';
import isBetween from 'dayjs/plugin/isBetween';
import Link from 'next/link';
import { useStudyStore } from '@/stores/studyInfoStore';
import { CalendarDays, ChevronRight } from 'lucide-react';

dayjs.extend(isBetween);

export default function CalendarSmallDetail({
  date,
  studyId,
  calendarData,
}: {
  date: string;
  studyId: number;
  calendarData: StudyScheduleType[];
}) {
  const studyIsProgress = useStudyStore().isProgress;
  const dateFormat = (date: string) => {
    const dateString = `${dayjs(date).format('M')}월 ${dayjs(date).get(
      'D'
    )}일 (${dayFormatting(date)})`;

    return dateString;
  };

  // 날짜 filter
  const filterResults = calendarData.filter((result) => {
    const startDay = dayjs(result.startTime).format('YYYY-MM-DD');
    const endDay = dayjs(result.endTime).format('YYYY-MM-DD');
    return dayjs(date).isBetween(startDay, endDay, 'day', '[]');
  });

  return (
    <>
      <div className='lg:w-full lg:grid lg:grid-rows-[auto_1fr] h-full px-1.5 mx-3.5 lg:mx-0 lg:px-9 border-t lg:border-t-0 lg:border-l border-border1 py-3'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='tm2 text-[14px]'>{dateFormat(date)}</h3>
          <Link
            href={`/study/${studyId}/calendar`}
            className='flex items-center t5'
          >
            전체보기
            <ChevronRight className='w-4 h-4' />
          </Link>
        </div>
        <div className='flex h-full overflow-auto flex-col gap-5'>
          {filterResults && filterResults.length > 0 ? (
            filterResults.map((result, i) => (
              <CalendarSmallDetailItem key={i} data={result} />
            ))
          ) : (
            <div className='flex h-full justify-center flex-col gap-5'>
              <div className='text-center'>
                <CalendarDays
                  className='mx-auto mb-3  w-[35px] h-[35px] lg:w-[50px] lg:h-[50px] text-border2'
                  strokeWidth={1}
                />
                <p className='tm4 text-border2  mb-3'>
                  해당 날짜에 등록된 일정이 없습니다.
                </p>
                {studyIsProgress && (
                  <Link
                    href={`/study/${studyId}/calendar`}
                    className='button-sm-type1 !text-[12px]'
                  >
                    일정등록하러 가기
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
