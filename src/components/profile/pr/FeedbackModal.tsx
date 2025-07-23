'use client';
// import musicBunny from '@/assets/images/music-bunny.svg';
import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { ReviewContent } from '@/types/pr';
import { getReviewContents } from '@/lib/api/pr';

export default function FeedbackModal({ onClose }: { onClose: () => void }) {
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState<ReviewContent[]>([]);
  const [page, setPage] = useState(0);
  const perPage = 5;

  useEffect(() => {
    const fetchReviwes = async () => {
      try {
        const res = await getReviewContents(page, perPage);
        setVisibleReviews(res.reviewContents);
        setTotalPages(res.totalPages);
        setHasNext(res.hasNext);
      } catch (error) {
        console.error('리뷰 불러오기 실패: ', error);
      }
    };
    fetchReviwes();
  }, [page]);

  const hasPrev = page > 0;

  const handlePrev = () => {
    if (hasPrev) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (hasNext) setPage((prev) => prev + 1);
  };

  return (
    <div className='flex flex-col bg-white w-[520px] h-[660px] rounded-[10px] items-center shadow-sm px-6 py-6'>
      <div className='flex justify-between items-center w-full mb-2'>
        <h2 className='tm2'>피드백</h2>
        <X className='w-6 h-6 cursor-pointer' onClick={onClose} />
      </div>

      <div className='flex flex-col gap-6 w-full overflow-y-auto max-h-[600px] mt-5'>
        {visibleReviews.map((feedback, index) => (
          <div
            key={index}
            className={`flex flex-col gap-3 w-full pb-5 ${
              index !== visibleReviews.length - 1
                ? 'border-b border-gray-200'
                : ''
            }`}
          >
            <div className='flex gap-3'>
              <div className='w-[46px] h-[46px] rounded-full overflow-hidden flex-shrink-0'>
                <Image
                  src={feedback.imageAccessUrl}
                  alt='프로필 이미지'
                  width={46}
                  height={46}
                  className='object-cover rounded-full'
                />
              </div>
              <div className='flex flex-col justify-center'>
                <p className='tm4'>{feedback.nickname}</p>
                <p className='t5 text-text1/50'>{feedback.createdAt}</p>
              </div>
            </div>
            <p className='t4 text-text1 pl-[60px] text-wrap'>
              {feedback.content}
            </p>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className='flex justify-center items-center gap-4 mt-12'>
          <button
            onClick={handlePrev}
            disabled={!hasPrev}
            className='p-1 hover:text-main disabled:opacity-30'
          >
            <ChevronLeft />
          </button>
          <span className='t5'>
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={!hasNext}
            className='p-1 hover:text-main disabled:opacity-30'
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
