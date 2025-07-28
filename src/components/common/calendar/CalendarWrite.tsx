import { useState, useTransition } from 'react';
import dayjs from 'dayjs';
import {
  postStudyEvent,
  postUserEvent,
  putStudyEvent,
  putUserEvent,
} from '@/lib/api/calendar.api';
import { userAuthStore } from '@/stores/userStore';
import { ScheduleInputType } from './CalendarBigShell';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';

export default function CalendarWrite({
  type,
  categoryId,
  data,
  writeCloseHandler,
  handleEventAdd,
  handleUpdate,
}: {
  type: string;
  categoryId: number;
  data?: UnionScheduleType;
  writeCloseHandler: () => void;
  handleEventAdd?: (id: number, data: ScheduleInputType) => void;
  handleUpdate?: (id: number, data: ScheduleInputType) => void;
}) {
  const CalendarDays = dynamic(
    () => import('lucide-react').then((m) => m.CalendarDays),
    { ssr: false }
  );
  const Clock = dynamic(() => import('lucide-react').then((m) => m.Clock), {
    ssr: false,
  });
  const X = dynamic(() => import('lucide-react').then((m) => m.X), {
    ssr: false,
  });

  const authId = Number(userAuthStore().user?.id);
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
    if (e.target.checked) {
      setStartTime('00:00');
      setEndTime('23:59');
    } else {
      setStartTime('');
      setEndTime('');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      //  날짜 비교를 위해 dayjs 객체로 변환
      const start = dayjs(`${startDay} ${startTime}`);
      const end = dayjs(`${endDay} ${endTime}`);

      const event = {
        title: title,
        description: content,
        startTime: start.format('YYYY-MM-DDTHH:mm'),
        endTime: end.format('YYYY-MM-DDTHH:mm'),
      };

      //시작날짜와 종료날짜  유효성 검사
      if (start.isBefore(end)) {
        // 개인일정 수정, 개인일정 등록
        if (type === 'personal') {
          const inputData = {
            userId: categoryId,
            title: title,
            description: content,
            startTime: start.format('YYYY-MM-DDTHH:mm'),
            endTime: end.format('YYYY-MM-DDTHH:mm'),
          };
          // api
          if (data) {
            await putUserEvent(authId, data.scheduleId, inputData);
            // 프론트에서 보이는 변경
            // 수정 함수가 있으면 수정
            handleUpdate?.(data?.scheduleId, event);
            toast.success('일정 수정이 완료되었습니다.');
          } else {
            const { data: id } = await postUserEvent(authId, inputData);
            // 프론트에서 보이는 변경
            // 등록 함수가 있으면 등록
            handleEventAdd?.(id, event);
            toast.success('일정 등록이 완료되었습니다.');
          }
        } else {
          // 팀일정 수정, 팀일정 등록
          const inputData = {
            teamId: categoryId,
            title: title,
            description: content,
            startTime: start.format('YYYY-MM-DDTHH:mm:ss'),
            endTime: end.format('YYYY-MM-DDTHH:mm:ss'),
          };
          // api
          if (data) {
            await putStudyEvent(categoryId, data.scheduleId, inputData);
            // 프론트에서 보이는 변경
            // 수정 함수가 있으면 수정
            handleUpdate?.(data?.scheduleId, event);
            toast.success('일정 수정이 완료되었습니다.');
          } else {
            const { data: id } = await postStudyEvent(categoryId, inputData);
            // 프론트에서 보이는 변경
            // 등록 함수가 있으면 등록
            handleEventAdd?.(id, event);
            toast.success('일정 등록이 완료되었습니다.');
          }
        }

        writeCloseHandler();
      } else {
        toast.error('일정의 시작날짜가 종료날짜보다 큽니다.');
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
                  disabled={
                    !title ||
                    !startDay ||
                    !endDay ||
                    !startTime ||
                    !endTime ||
                    isPending
                  }
                >
                  {data ? '수정' : '등록'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
