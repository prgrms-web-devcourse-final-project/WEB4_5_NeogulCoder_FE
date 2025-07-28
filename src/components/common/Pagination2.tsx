import dynamic from 'next/dynamic';

type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
};

export default function Pagination2({
  page,
  setPage,
  totalPages,
}: PaginationProps) {
  const ChevronLeft = dynamic(
    () => import('lucide-react').then((m) => m.ChevronLeft),
    { ssr: false }
  );

  const ChevronRight = dynamic(
    () => import('lucide-react').then((m) => m.ChevronRight),
    {
      ssr: false,
    }
  );
  const handleClick = (p: number) => {
    if (p >= 0 && p < totalPages) {
      setPage(p);
    }
  };

  return (
    <div className='flex gap-5 justify-center items-center'>
      <ChevronLeft
        className='w-6 h-6 cursor-pointer'
        onClick={() => handleClick(page - 1)}
      />
      <div className='flex items-center gap-3 tl2 text-text1'>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`flex justify-center items-center w-6 h-6 rounded-[50%] ${
              page === i ? 'bg-main text-white' : 'bg-none text-text1'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <ChevronRight
        className='w-6 h-6 cursor-pointer'
        onClick={() => handleClick(page + 1)}
      />
    </div>
  );
}
