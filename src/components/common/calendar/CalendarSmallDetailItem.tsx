import dayjs from 'dayjs';

export default function CalendarSmallDetailItem({
  data,
}: {
  data: ScheduleType;
}) {
  return (
    <>
      <div className='flex items-center'>
        <div className='t5 border-r-4 border-logo1 pr-4 py-1 leading-tight'>
          <div>{dayjs(data.startTime).format('HH:mm')}</div>
          <div>{dayjs(data.endTime).format('HH:mm')}</div>
        </div>
        <div className='tm4 px-3.5 '>{data.title}</div>
      </div>
    </>
  );
}
