'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import { useEffect, useRef, useState, useTransition } from 'react';
import '@/styles/attendance/attendance.css';
import { getStudyAttendance, postStudyAttendance } from '@/lib/api/study.api';
import axios from 'axios';
import dayjs from 'dayjs';
import { userAuthStore } from '@/stores/userStore';
import { useStudyStore } from '@/stores/studyInfoStore';
import StudyAttendanceSkeleton from './StudyAttendanceSkeleton';

export default function StudyAttendance({
  studyId,
  totalDays,
}: {
  studyId: number;
  totalDays: number;
}) {
  const calendarRef = useRef(null);
  const user = userAuthStore().user;
  const studyInfo = useStudyStore().study;
  const studyIsProgress = useStudyStore().isProgress;
  const [attendances, setAttendances] = useState<StudyAttendanceDaysType[]>([]);
  const [attendanceRate, setAttendanceRate] = useState(0);
  const [todayCheck, setTodayCheck] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      setIsLoading(true);
      try {
        const { data } = await getStudyAttendance(studyId);
        setAttendances(data.attendances);
        setAttendanceRate(data.attendanceRate);
        const today = data.attendances.find(
          (f: StudyAttendanceDaysType) =>
            f.attendanceDate === dayjs().format('YYYY-MM-DD')
        );
        setTodayCheck(today);
      } catch (error) {
        console.error('출석체크 정보를 불러오지 못했습니다.', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendance();
  }, [studyId]);

  const events = attendances.map((attendance) => ({
    title: '출석',
    date: attendance.attendanceDate,
  }));

  const handleAttendance = () => {
    startTransition(async () => {
      try {
        const prevCount = attendances.length;
        await postStudyAttendance(studyId);
        setAttendances((prev) => [
          ...prev,
          {
            studyId: studyId,
            userId: user?.id || 0,
            attendanceDate: dayjs().format('YYYY-MM-DD'),
          },
        ]);
        setAttendanceRate(Math.round(((prevCount + 1) / totalDays) * 100));
        setTodayCheck(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message ?? '출석 체크 실패';
          alert(message);
        }
      }
    });
  };

  return (
    <>
      <div className='flex justify-between mb-3'>
        <h3 className='tb3'>나의 스터디 출석정보</h3>
        {!isLoading && (
          <button
            className='button-sm-type1 disabled:!cursor-default'
            // pending, 오늘 출석 했으면, 진행중이 아닌 스터디 경우 버튼 막기
            disabled={isPending || todayCheck || !studyIsProgress}
            onClick={handleAttendance}
          >
            출석
          </button>
        )}
      </div>
      <div className='border border-border1 rounded-[10px] p-6'>
        {isLoading ? (
          <StudyAttendanceSkeleton />
        ) : (
          <>
            <div className='mb-12'>
              <h3 className='tm3 mb-[18px]'>주간 출석</h3>
              <div className='w-[450px] attendance'>
                <FullCalendar
                  ref={calendarRef}
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView='dayGridWeek'
                  locale={koLocale}
                  events={events}
                  validRange={{
                    start: dayjs(studyInfo?.startDate).format('YYYY-MM-DD'),
                    end: dayjs(studyInfo?.endDate).format('YYYY-MM-DD'),
                  }}
                  headerToolbar={{
                    left: 'prev',
                    center: 'title',
                    right: 'next',
                  }}
                  dayHeaderFormat={{
                    weekday: 'narrow',
                  }}
                  dayMaxEventRows={1}
                  height='auto'
                  contentHeight='auto'
                />
              </div>
            </div>
            <div>
              <h3 className='tm3'>전체 출석률</h3>
              <div>
                <div className='text-right tm4 mb-1.5'>{attendanceRate}%</div>
                <div className='w-full h-[16px] rounded-2xl bg-gray3/50 overflow-hidden'>
                  <div
                    className='h-full bg-orange'
                    style={{
                      width: `${attendanceRate}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
