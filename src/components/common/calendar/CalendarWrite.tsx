import { CalendarDays, Clock, X } from 'lucide-react';
import { useState, useTransition } from 'react';
import dayjs from 'dayjs';
import {
  postStudyEvent,
  postUserEvent,
  putStudyEvent,
  putUserEvent,
} from '@/lib/api/calendar.api';

export default function CalendarWrite({
  type,
  writeCloseHandler,
  data,
  studyId,
}: {
  type: string;
  writeCloseHandler: () => void;
  data?: StudyScheduleType;
  studyId: number;
}) {
  const userId = 12; //로그인 구현되면 가져올 Id값
  const [title, setTitle] = useState(data ? data.title : '');
  const [content, setContent] = useState(data ? data.description : '');
  const [startDay, setStartDay] = useState(
    data ? dayjs(data.startTime).format('YYYY-MM-DD') : ''
  );
  const [startTime, setStartTime] = useState(
    data ? dayjs(data.startTime).format('HH:mm') : ''
  );
  const [endDay, setEndDay] = useState(
    data ? dayjs(data.endTime).format('YYYY-MM-DD') : ''
  );
  const [endTime, setEndTime] = useState(
    data ? dayjs(data.endTime).format('HH:mm') : ''
  );
  const [allDay, setAllDay] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleAllDay = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllDay(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const start = allDay ? `${startDay}T00:00` : `${startDay}T${startTime}`;
      const end = allDay ? `${endDay}T23:59` : `${endDay}T${endTime}`;

      const date1 = dayjs(start);
      const date2 = dayjs(end);

      //시작날짜와 종료날짜  유효성 검사
      if (date1.isBefore(date2)) {
        // 개인일정 수정, 개인일정 등록
        // 팀일정 수정, 팀일정 등록
        if (type === 'personal') {
          const inputData = {
            userId: studyId,
            title: title,
            description: content,
            startTime: start,
            endTime: end,
          };
          // api 구현후...
          // if (data) {
          //   putUserEvent(userId, data.calendarId, inputData);
          // } else {
          //   postUserEvent(userId, inputData);
          // }
        } else {
          const inputData = {
            teamId: studyId,
            title: title,
            description: content,
            startTime: start,
            endTime: end,
          };
          // api 구현후...
          // if (data) {
          //   putStudyEvent(studyId, data.calendarId, inputData);
          // } else {
          //   postStudyEvent(studyId, inputData);
          // }
        }

        alert('✨데이터가 등록 되었습니다.');
      } else {
        alert('🚫시작날짜가 종료날짜보다 큽니다.');
      }
    });
  };

  return (
    <>
      <div className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-15 flex items-center justify-center'>
        <div className='py-7 rounded-[10px] bg-white drop-shadow-md max-w-[650px] min-w-[580px]'>
          <div className='flex justify-between mb-8 px-9 '>
            <h3 className='tm2'>일정 {data ? '수정' : '등록'}</h3>
            <button onClick={writeCloseHandler}>
              <X className='w-8 y-8' />
            </button>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className='px-9 mb-8 flex flex-col gap-4 max-h-[calc(90vh-160px)] overflow-auto'>
                <div className='shrink-0'>
                  <p className='t3 mb-3'>
                    제목 <span className='tm5 text-red'>(필수)</span>
                  </p>
                  <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='w-full input-type2'
                  />
                </div>
                <div className='shrink-0'>
                  <p className='t3'>
                    기간 <span className='tm5 text-red'>(필수)</span>
                  </p>
                  <div className='mb-3 justify-end flex'>
                    <label
                      htmlFor='allDay'
                      className='tl4 flex items-center gap-2.5 cursor-pointer'
                    >
                      <span>종일</span>
                      <div className='relative text-[0px]'>
                        <input
                          id='allDay'
                          checked={allDay}
                          onChange={handleAllDay}
                          type='checkbox'
                          className=' cursor-pointer w-5 h-5 peer border border-border1 appearance-none rounded-sm checked:bg-blue-500 checked:border-blue-500'
                        />
                        <span className='pointer-events-none absolute left-[7px] top-0.5 w-1.5 h-3 border-white border-r-2 border-b-2 rotate-45 opacity-0 peer-checked:opacity-100'></span>
                      </div>
                    </label>
                  </div>
                  <div className='flex items-center gap-3 mb-3'>
                    <p className='tl4 shrink-0'>시작</p>
                    <label className='w-full relative'>
                      <input
                        type='date'
                        value={startDay}
                        onChange={(e) => setStartDay(e.target.value)}
                        className='date-custom w-full input-type2 tm3 pr-9!'
                      />
                      <CalendarDays
                        strokeWidth={1}
                        className='w-5 h-5 text-gray5 absolute right-3 top-1/2 -translate-y-1/2 -z-1'
                      />
                    </label>
                    {!allDay && (
                      <label className='relative'>
                        <input
                          type='time'
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className='date-custom w-full input-type2 tm3 pr-11!'
                        />
                        <Clock
                          strokeWidth={1}
                          className='w-5 h-5 text-gray5 absolute right-3 top-1/2 -translate-y-1/2 -z-1'
                        />
                      </label>
                    )}
                  </div>
                  <div className='flex items-center gap-3 mb-3'>
                    <p className='tl4  shrink-0'>종료</p>
                    <label className='w-full relative'>
                      <input
                        type='date'
                        value={endDay}
                        onChange={(e) => setEndDay(e.target.value)}
                        className='date-custom w-full input-type2 tm3 pr-9!'
                      />
                      <CalendarDays
                        strokeWidth={1}
                        className='w-5 h-5 text-gray5 absolute right-3 top-1/2 -translate-y-1/2 -z-1'
                      />
                    </label>
                    {!allDay && (
                      <label className='relative'>
                        <input
                          type='time'
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className='date-custom w-full input-type2 tm3 pr-11!'
                        />
                        <Clock
                          strokeWidth={1}
                          className='w-5 h-5 text-gray5 absolute right-3 top-1/2 -translate-y-1/2 -z-1'
                        />
                      </label>
                    )}
                  </div>
                </div>
                <div className='shrink-0'>
                  <p className='t3 mb-3'>내용</p>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className='input-type2 resize-none w-full h-[90px]! py-3'
                  />
                </div>
              </div>
              <div className='px-9'>
                <button
                  type='submit'
                  className='button-modal1'
                  disabled={!(title && startDay && endDay)}
                >
                  등록
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
