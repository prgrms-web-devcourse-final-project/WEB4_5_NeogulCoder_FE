import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function ManagerPagination({
  page,
  handlePage,
  total,
}: {
  page: number;
  handlePage: (num: number) => void;
  total: number;
}) {
  const itemCountPerPage = 5; // 페이지 숫자 보이는 갯수
  const [start, setStart] = useState(1);

  const hadlePrev = () => {
    setStart((prev) => prev - itemCountPerPage);
  };

  const hadleNext = () => {
    setStart((prev) => prev + itemCountPerPage);
  };

  return (
    <>
      <div className='flex gap-5 justify-center items-center'>
        <button
          onClick={hadlePrev}
          disabled={start <= 1}
          className='disabled:opacity-10 disabled:!cursor-default'
        >
          <ChevronLeft className='w-6 h-6' />
        </button>

        <div className='flex items-center gap-4 tl2 text-text1'>
          {/* 총 페이지가 0이면 1만 보이게, 5보다 작으면 total값 까지만 보이게, total-start가 5보다 작으면 그 숫자만큼만 보이게 아니면 5번 */}
          {Array.from({
            length:
              total === 0
                ? 1
                : total < itemCountPerPage
                ? total
                : total - start < itemCountPerPage
                ? total - start
                : itemCountPerPage,
          }).map((_, i) => (
            <button
              onClick={() => handlePage(start + i)}
              key={start + i}
              className={`flex justify-center items-center bg-none text-text1 w-7 h-7 tl3 rounded-[50%] ${
                page === start + i && '!bg-main !text-white'
              }`}
            >
              {start + i}
            </button>
          ))}
        </div>
        <button
          onClick={hadleNext}
          disabled={start + itemCountPerPage > total}
          className='disabled:opacity-10 disabled:!cursor-default'
        >
          <ChevronRight className='w-6 h-6' />
        </button>
      </div>
    </>
  );
}
