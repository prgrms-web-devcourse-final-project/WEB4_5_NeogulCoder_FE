'use client';
import ManagerListSkeleton from '@/components/manager/ManagerListSkeleton';
import ManagerPagination from '@/components/manager/ManagerPagination';
import ManagerRecruitmentList from '@/components/manager/ManagerRecruitmentList';
import { deleteAdminPost, getAdminPosts } from '@/lib/api/manager/manager';
import { userAuthStore } from '@/stores/userStore';
import { Search, SearchX, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

export type AdminPostType = {
  id: number;
  subject: string;
  expiredDate: string;
  activated: boolean;
};

export default function ManagerRecruitmentsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchKeyword = useMemo(
    () => searchParams.get('search') || '',
    [searchParams]
  );
  const pageParams = useMemo(
    () => Number(searchParams.get('page')) || 1,
    [searchParams]
  );
  const user = userAuthStore((state) => state.user);
  const [keyword, setKeyword] = useState(searchKeyword || '');
  const [page, setPage] = useState(pageParams || 1);
  const [recruits, setRecruits] = useState<AdminPostType[]>([]);
  const [isLoading, setLoading] = useState(true);

  const [totalPage, setTotalPage] = useState(1);

  // 모집글 삭제
  const handleDelete = async (id: number) => {
    try {
      await deleteAdminPost(id);
      setRecruits((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, activated: false } : item
        )
      );
      toast.success(`해당 모집글을 비활성화하였습니다.`);
    } catch (error) {
      toast.error(`모집글 비활성화 실패 ${error}`);
    }
  };

  // 목록 가져오기
  useEffect(() => {
    if (!user) return;
    if (user.role !== 'ROLE_ADMIN') {
      router.push('/');
      return;
    }
    const fetchRecruit = async () => {
      setLoading(true);
      try {
        const keyword = searchParams.get('search') || '';
        const pageNum = Number(searchParams.get('page')) || 1;

        const { data } = await getAdminPosts(pageNum - 1, keyword);

        setTotalPage(data.totalPages);
        setRecruits(data.content);
        setKeyword(keyword);
        setPage(pageNum);
      } catch (error) {
        console.error('모집글 목록을 불러오지 못했습니다.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecruit();
  }, [user, searchParams, router]);

  // 키보드 Enter검색
  const searchSubject = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/manager/recruitment?search=${keyword}&page=1`);
    }
  };

  // 페이지 변경
  const handlePage = (num: number) => {
    router.push(`/manager/recruitment?search=${keyword}&page=${num}`);
    setPage(num);
  };

  // 리셋
  const handleClear = () => {
    setKeyword('');
    router.push(`/manager/recruitment?page=1`);
  };

  // 버튼 클릭 검색
  const handleClickSubmit = () => {
    router.push(`/manager/recruitment?search=${keyword}&page=1`);
  };

  return (
    <>
      <div className='flex flex-wrap justify-between items-start mb-3 lg:mb-4 gap-2'>
        <h1 className='tb2 whitespace-nowrap'>모집글 목록</h1>
        <div className='w-full max-w-[285px] lg:w-auto flex items-center bg-gray4 rounded-2xl pr-4'>
          <div className='w-full lg:w-auto relative'>
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={searchSubject}
              className='h-9 t4 px-3 placeholder:text-gray3 w-full lg:w-auto'
              placeholder='모집글 제목 검색'
            ></input>
          </div>

          <div className='flex  w-[60px] items-center justify-end'>
            {keyword && (
              <button className='' onClick={handleClear}>
                <X className='w-4.5 h-4.5 text-gray2/80' />
              </button>
            )}
            <button onClick={handleClickSubmit}>
              <Search className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>
      <div className='min-h-[580px] mb-10'>
        <div className='w-full border rounded-[10px] border-border1 overflow-hidden'>
          <table className='w-full table-fixed'>
            <colgroup>
              <col className='w-[45%] lg:w-[50%]'></col>
              <col className='w-[25%] lg:w-[20%]'></col>
              <col className='w-[15%]'></col>
              <col className='w-[15%]'></col>
            </colgroup>
            <thead className='bg-gray4 h-15'>
              <tr className='border-b border-border1'>
                <th className='px-2 lg:px-5 text-[14px] lg:text-base'>제목</th>
                <th className='px-2 lg:px-5 text-[14px] lg:text-base'>
                  모집마감일
                </th>
                <th className='px-2 lg:px-5 text-[14px] lg:text-base'>상태</th>
                <th className='w-[200px] px-2 lg:px-5 text-[14px] lg:text-base'>
                  삭제
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <ManagerListSkeleton colsNumber={4} key={`skeleton${i}`} />
                ))
              ) : recruits.length > 0 ? (
                recruits.map((recruit) => (
                  <ManagerRecruitmentList
                    key={`${recruit.id}`}
                    recruit={recruit}
                    handleDelete={handleDelete}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={4}>
                    <div className='w-full h-[500px] flex items-center justify-center text-gray3'>
                      <div>
                        <SearchX
                          className='w-12 h-12 mx-auto mb-3'
                          strokeWidth={1.5}
                        />
                        <div className='flex gap-2 items-center'>
                          <span className='tb3'>
                            {searchKeyword !== '' ? `" ${searchKeyword} "` : ''}
                          </span>
                          조회 결과가 없습니다.
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ManagerPagination
        page={page}
        handlePage={handlePage}
        total={totalPage}
      />
    </>
  );
}
