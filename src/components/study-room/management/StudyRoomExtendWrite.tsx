import { postStudyExtend } from '@/lib/api/study.api';
import { useStudiesStore } from '@/stores/useStudiesStore';
import dayjs from 'dayjs';
import { CalendarDays, X } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'react-toastify';

export default function StudyRoomExtendWrite({
  closeFn,
  handleExtend,
  endDate,
  studyId,
}: {
  closeFn: () => void;
  handleExtend: () => void;
  endDate: string;
  studyId: number;
}) {
  const [extendDate, setExtendDate] = useState('');
  const [isPending, startTransition] = useTransition();
  const study = useStudiesStore().studies.find((f) => f.studyId === studyId);
  const addStudies = useStudiesStore().addStudy;

  const hadleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const { data } = await postStudyExtend(studyId, extendDate);
        handleExtend();
        if (study)
          addStudies({
            studyId: data,
            name: study?.name,
            leaderNickname: study?.leaderNickname,
            capacity: study?.capacity,
            currentCount: study?.currentCount,
            startDate: dayjs(endDate)
              .add(1, 'day')
              .format('YYYY-MM-DDTHH:mm:ss'),
            endDate: extendDate,
            imageUrl: study?.imageUrl,
            introduction: study?.introduction,
            category: study?.category,
            studyType: study?.studyType,
            finished: false,
          });
        toast.success(`스터디를 연장했습니다.`);
        closeFn(); // 모달 닫기
      } catch (error) {
        toast.error(`스터디 연장에 실패했습니다 ${error}`);
      }
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const date = dayjs(e.target.value).endOf('day');
    setExtendDate(dayjs(date).format('YYYY-MM-DDTHH:mm:ss'));
  };
  return (
    <>
      <div className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center'>
        <div className='py-4 lg:py-7 rounded-[10px] bg-white drop-shadow-md max-w-[650px] lg:min-w-[580px] w-[calc(100%-36px)]'>
          <div className='flex justify-between mb-5 lg:mb-8 px-4 lg:px-9'>
            <h3 className='tm2'>스터디 연장</h3>
            <button onClick={closeFn}>
              <X className='w-6 h-6 lg:w-8 lg:h-8' />
            </button>
          </div>
          <div>
            <form>
              <div className='px-4 lg:px-9 mb-10 lg:mb-12 flex flex-col gap-4 max-h-[calc(90vh-160px)] overflow-auto'>
                <div className=' shrink-0'>
                  <p className='t3 mb-1.5 lg:mb-3'>
                    스터디의 새로운 종료일자{' '}
                    <span className='tm5 text-red'>(필수)</span>
                  </p>
                  <div className='text-center'>
                    <label className='relative'>
                      <input
                        type='date'
                        className='w-full lg:w-[300px] date-custom input-type2 tm3 pr-9!'
                        min={dayjs(endDate).add(1, 'day').format('YYYY-MM-DD')}
                        onChange={handleChange}
                      />
                      <CalendarDays
                        strokeWidth={1}
                        values={extendDate}
                        className='w-4 h-4 lg:w-5 lg:h-5 text-gray5 absolute right-3 top-1/2 -translate-y-1/2 -z-1'
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className='px-4 lg:px-9'>
                <button
                  className='button-modal1'
                  onClick={hadleSubmit}
                  disabled={isPending}
                >
                  연장하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
