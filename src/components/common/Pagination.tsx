'use client';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  // if (totalPages <= 1) return null;

  const visiblePages = 5;
  const startPage = Math.floor(currentPage / visiblePages) * visiblePages;
  const endPage = Math.min(startPage + visiblePages, totalPages);

  const handlePageChange = (page: number) => {
    if (page < 0 || page >= totalPages || page === currentPage) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onPageChange(page);
  };

  return (
    <div className='flex gap-5 justify-center items-center mt-4'>
      <button
        onClick={() => handlePageChange(0)}
        disabled={currentPage === 0}
        className='w-6 h-6 text-sm text-text1 disabled:text-gray3 disabled:cursor-default!'
      >
        <ChevronsLeft />
      </button>

      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className='w-6 h-6 text-sm text-text1 disabled:text-gray3 disabled:cursor-default!'
      >
        <ChevronLeft />
      </button>

      <div className='flex items-center gap-3 tl2 text-text1'>
        {Array.from(
          { length: endPage - startPage },
          (_, i) => startPage + i
        ).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`flex justify-center items-center w-6 h-6 rounded-[50%] text-sm ${
              page === currentPage ? 'bg-main text-white' : 'bg-none text-text1'
            }`}
          >
            {page + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className='w-6 h-6 text-sm text-text1 disabled:text-gray3 disabled:cursor-default!'
      >
        <ChevronRight />
      </button>

      <button
        onClick={() => handlePageChange(totalPages - 1)}
        disabled={currentPage === totalPages - 1}
        className='w-6 h-6 text-sm text-text1 disabled:text-gray3 disabled:cursor-default!'
      >
        <ChevronsRight />
      </button>
    </div>
  );
}
