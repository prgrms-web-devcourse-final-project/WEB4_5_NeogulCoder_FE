import Image from 'next/image';
import { useEffect, useState } from 'react';
import FeedbackModalSkeleton from './skeleton/FeedbackModalSkeleton';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import basicBunny from '@/assets/images/basic-bunny.svg';
import { useParams } from 'next/navigation';
import { ReviewContent } from '@/types/pr';
import { getReviewContentsByUserId } from '@/lib/api/pr';

export default function FeedbackModal({ onClose }: { onClose: () => void }) {
  const params = useParams();
  const userId = params?.userId ? Number(params.userId) : null;
  const [reviews, setReviews] = useState<ReviewContent[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const [page, setPage] = useState(0);
  const pageSize = 5;

  const hasPrev = page > 0;
  const hasNext = page < totalPages - 1;

  const handlePrev = () => {
    if (hasPrev) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (hasNext) setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (!userId) return;

    const fetchReviews = async () => {
      try {
        const res = await getReviewContentsByUserId(userId, page, pageSize);
        setReviews(res.reviewContents);
        setTotalPages(res.totalPages);
      } catch (error) {
        console.error('피드백 불러오기 실패: ', error);
      }
    };

    fetchReviews();
  }, [userId, page]);

  return (
    <div className='flex flex-col bg-white w-screen h-screen lg:w-[520px] lg:h-[660px] rounded-[10px] items-center shadow-sm px-6 py-6 relative'>
      <div className='flex justify-between items-center w-full mb-2 lg:mb-[30px]'>
        <h2 className='tm2'>피드백</h2>
        <X className='w-6 h-6 cursor-pointer' onClick={onClose} />
      </div>

      <div className='flex flex-col gap-6 w-full overflow-y-auto max-h-[500px] mt-8 scroll-custom-4'>
        {reviews.length > 0 ? (
          reviews.map((feedback, index) => {
            const isLastItem =
              page === totalPages - 1 && index === reviews.length - 1;

            return (
              <div
                key={index}
                className={`flex flex-col gap-3 w-full pb-5 ${
                  !isLastItem ? 'border-b border-gray-200' : ''
                }`}
              >
                <div className='flex gap-3'>
                  <div className='w-[46px] h-[46px] rounded-full overflow-hidden flex-shrink-0'>
                    <Image
                      src={feedback.imageAccessUrl ?? basicBunny}
                      alt='프로필 이미지'
                      width={46}
                      height={46}
                      className='object-cover rounded-full border border-border1'
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
            );
          })
        ) : (
          <FeedbackModalSkeleton />
        )}
      </div>

      {totalPages >= 1 && (
        <div className='flex justify-center items-center gap-4 bottom-5 absolute'>
          <button
            onClick={handlePrev}
            disabled={!hasPrev}
            className='p-1 hover:text-main disabled:opacity-30 '
          >
            <ChevronLeft className='cursor-pointer' />
          </button>
          <span className='t5 cursor-default'>
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={!hasNext}
            className='p-1 hover:text-main disabled:opacity-30'
          >
            <ChevronRight className='cursor-pointer' />
          </button>
        </div>
      )}
    </div>
  );
}
