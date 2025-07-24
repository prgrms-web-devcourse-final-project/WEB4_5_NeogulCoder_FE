export default function CalendarBigSkeleton() {
  return (
    <>
      <div className='h-15 w-60 bg-neutral-100 animate-pulse rounded mb-5'></div>
      <div className='grid grid-rows-5 gap-1.5'>
        {Array.from({ length: 5 }).map((n, j) => (
          <div key={j} className='grid grid-cols-7 gap-1.5'>
            {Array.from({ length: 7 }).map((m, i) => (
              <div
                key={i}
                className='w-full h-[100px] bg-neutral-100 animate-pulse rounded'
              ></div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
