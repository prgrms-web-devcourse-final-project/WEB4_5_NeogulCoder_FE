'use client';
import { useEffect, useRef, useState } from 'react';
import CalendarBig from './CalendarBig';
import CalendarBigDetail from './CalendarBigDetail';
import CalendarWrite from './CalendarWrite';
import { ChevronDown } from 'lucide-react';
import { getStudyEvents, getUserEvents } from '@/lib/api/calendar.api';
import { UserInfo } from '@/stores/userStore';
import CalendarBigSkeleton from './Skeleton/CalendarBigSkeleton';
import { calendarFormattingResult } from '@/utils/calendarTypeFormatting';
import { useStudyStore } from '@/stores/studyInfoStore';

export type ScheduleInputType = {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
};

export default function CalendarBigShell({
  type,
  user,
  categories,
}: {
  type: string;
  user: UserInfo;
  categories: { name: string; id: number }[];
}) {
  const studyIsProgress = useStudyStore().isProgress;
  const selectRef = useRef<HTMLDivElement>(null);
  // 날짜별 상세 팝업
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailDate, setDetailDate] = useState(''); // 상세 날짜
  const openDetailHandler = (date: string) => {
    setDetailOpen(true);
    setDetailDate(date);
  };
  const closeDetailHandler = () => {
    setDetailOpen(false);
  };

  // 일정 등록 팝업
  const [writeOpen, setWriteOpen] = useState(false);
  const writeOpenHandler = () => {
    setWriteOpen(true);
  };
  const writeCloseHandler = () => {
    setWriteOpen(false);
  };

  // 카테고리
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [colorNumber, setColorNumber] = useState(0);

  const [events, setEvents] = useState<UnionScheduleType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 카테고리가 변경 되면 각 카테고리에 맞는 api일정을 가져오도록..
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      let data;
      try {
        if (selectedCategory.name === '내 일정') {
          const { data: result } = await getUserEvents(selectedCategory.id);
          data = result;
        } else {
          const { data: result } = await getStudyEvents(selectedCategory.id);
          data = result;
        }
        setEvents(calendarFormattingResult(data));
      } catch (error) {
        console.error('일정을 불러오지 못했습니다.', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [selectedCategory, type]);

  // 일정등록
  const handleEventAdd = (schedulerId: number, newData: ScheduleInputType) => {
    const newDataFormatting = {
      ...newData,
      writerId: user.id,
      writerNickname: user.nickname,
      writerProfileImageUrl: user.profileImageUrl,
      scheduleId: schedulerId,
    };
    setEvents((prev) => [...prev, newDataFormatting]);
  };

  // 일정수정
  const handleEventUpdate = (
    scheduleId: number,
    newData: ScheduleInputType
  ) => {
    setEvents((prev) =>
      prev.map((item) =>
        item.scheduleId === scheduleId ? { ...item, ...newData } : item
      )
    );
  };

  // 일정삭제
  const handleEventDelete = (scheduleId: number) => {
    setEvents((prev) => prev.filter((f) => f.scheduleId !== scheduleId));
  };

  // 카테고리 외부 클릭시 닫힘
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 캘린더 컬러값
  const colors = [
    '#CAF1FF',
    '#FFE0DD',
    '#FFF0B4',
    '#FFE5CC',
    '#C8FCFA',
    '#D5D4FC',
    '#F4C5F3',
    '#A7D7EB',
    '#C7F7CD',
    '#E1EAF3',
    '#CED7DE',
    '#B6FAFD',
    '#CDF3F4',
    '#F5D9FF',
    '#FFE6FB',
    '#EDF0FF',
    '#BAF1DA',
    '#BCFAE1',
    '#DCF0E4',
    '#CAF6E5',
    '#F0B9D6',
    '#FFC2D2',
    '#FFD2D5',
  ];

  return (
    <>
      <div className={`${type === 'my' && 'mb-5'}`}>
        <h1 className='tb3'>{type === 'my' ? '캘린더' : '팀 캘린더'}</h1>
      </div>
      <div className='flex justify-between items-end mb-3'>
        {/* 내 캘린더 일때만 select 나오도록 */}
        {type === 'my' && (
          <div className='flex items-center t3'>
            <div
              className={`w-1.5 h-7 rounded-full`}
              style={{ backgroundColor: `${colors[colorNumber]}` }}
            ></div>
            <div className='relative'>
              <button
                type='button'
                className={`flex px-4 cursor-pointer items-center`}
                onClick={() => setIsCategoryOpen((prev) => !prev)}
              >
                <p className='mr-1'>{selectedCategory.name}</p>
                <ChevronDown className='w-5 h-5 ml-3' />
              </button>
              {isCategoryOpen && (
                <div
                  ref={selectRef}
                  className='absolute w-[132px] border border-main/10 bg-white rounded-[20px] shadow-lg overflow-hidden tm4 p-3 z-10'
                >
                  <div className='flex flex-col'>
                    {categories?.map((category, i) => (
                      <button
                        key={`${category.name}${i}`}
                        type='button'
                        className='flex items-center justify-center h-10 w-full rounded-[10px] hover:bg-gray4'
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsCategoryOpen(false);
                          setColorNumber(i);
                        }}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {studyIsProgress && (
          <button
            onClick={writeOpenHandler}
            className='button-sm-type1 ml-auto'
          >
            일정등록
          </button>
        )}
      </div>
      {isLoading ? (
        <CalendarBigSkeleton />
      ) : type === 'my' ? (
        <CalendarBig
          openDetailHandler={openDetailHandler}
          events={events}
          colorStr={colors[colorNumber]}
        />
      ) : (
        <CalendarBig openDetailHandler={openDetailHandler} events={events} />
      )}

      {detailOpen && categories && (
        <CalendarBigDetail
          type={
            type === 'my' && selectedCategory.name === '내 일정'
              ? 'personal'
              : 'study'
          } // 개인일정, 스터디 일정 api가 다르기 때문에 어떤 카테고리인지 분류해야 하기때문에 type으로 전달
          closeDetailHandler={closeDetailHandler}
          handleEventDelete={handleEventDelete}
          handleEventUpdate={handleEventUpdate}
          date={detailDate}
          categoryId={type === 'my' ? selectedCategory.id : categories[0].id} //마이페이지 캘린더면 선택된 카테고리의 id값, 스터디 캘린더면 카테고리 첫번째 id 값
        />
      )}
      {writeOpen && categories && (
        <CalendarWrite
          type={
            type === 'my' && selectedCategory.name === '내 일정'
              ? 'personal'
              : 'study'
          } // 개인일정, 스터디 일정 api가 다르기 때문에 어떤 카테고리인지 분류해야 하기때문에 type으로 전달
          categoryId={type === 'my' ? selectedCategory.id : categories[0].id} //마이페이지 캘린더면 선택된 카테고리의 id값, 스터디 캘린더면 카테고리 첫번째 id 값
          writeCloseHandler={writeCloseHandler}
          handleEventAdd={handleEventAdd}
        />
      )}
    </>
  );
}
