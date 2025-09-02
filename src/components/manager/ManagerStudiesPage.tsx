'use client';
import ManagerCategoriesModal from '@/components/manager/ManagerCategoriesModal';
import ManagerListSkeleton from '@/components/manager/ManagerListSkeleton';
import ManagerPagination from '@/components/manager/ManagerPagination';
import ManagerStudyList from '@/components/manager/ManagerStudyList';
import {
  deleteAdminStudy,
  getAdminStudies,
  postAdminStudy,
} from '@/lib/api/manager/manager';
import { userAuthStore } from '@/stores/userStore';
import { categoryFormatting } from '@/utils/categoryFormatting';
import { ChevronDown, Search, SearchX, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import ManagerMobileCategoryModal from './ManagerMobileCategoryModal';

export type AdminStudyType = {
  id: number;
  name: string;
  category: string;
  finished: boolean;
  activated: boolean;
};
export default function ManagerStudiesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParams = useMemo(
    () => Number(searchParams.get('page')) || 1,
    [searchParams]
  );
  const searchKeyword = useMemo(
    () => searchParams.get('name') || '',
    [searchParams]
  );
  const searchCategory = useMemo(
    () => searchParams.get('category') || '',
    [searchParams]
  );
  const user = userAuthStore((state) => state.user);
  const [studies, setStudies] = useState<AdminStudyType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [isOpenCategoryModal, setIsOpenCategoryModal] = useState(false);
  const [keyword, setKeyword] = useState(searchKeyword || '');
  const [page, setPage] = useState(pageParams || 1);
  const [selectedCategory, setSelectedCategory] = useState(
    searchCategory || '전체'
  );

  // 스터디 비활성화
  const handleDelete = async (id: number) => {
    try {
      await deleteAdminStudy(id);
      setStudies((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, activated: false } : item
        )
      );
      toast.success(`해당 스터디를 비활성화 하였습니다.`);
    } catch (error) {
      toast.error(`스터디 비활성화 실패 ${error}`);
    }
  };

  // 스터디 활성화
  const handleActive = async (id: number) => {
    try {
      await postAdminStudy(id);
      setStudies((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, activated: true } : item
        )
      );
      toast.success(`해당 스터디를 활성화 하였습니다.`);
    } catch (error) {
      toast.error(`스터디 활성화 실패 ${error}`);
    }
  };

  // 목록 가져오기
  useEffect(() => {
    if (!user) return;

    if (user.role !== 'ROLE_ADMIN') {
      router.push('/');
      return;
    }

    const fetchStudies = async () => {
      setLoading(true);
      try {
        const keyword = searchParams.get('name') || '';
        const cate =
          searchParams.get('category') === '전체'
            ? ''
            : searchParams.get('category') || '';
        const pageNum = Number(searchParams.get('page')) || 1;
        const { data } = await getAdminStudies(pageNum - 1, keyword, cate);
        setTotalPage(data.totalPages);
        setStudies(data.content);

        setKeyword(keyword);
        setPage(pageNum);
        setSelectedCategory(cate || '전체');
      } catch (error) {
        console.error('사용자 목록을 불러오지 못했습니다.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudies();
  }, [user, searchParams, router]);

  // // 카테고리 선택
  const handleCategory = (category: string) => {
    setSelectedCategory(category);
    setIsOpenCategoryModal(false);
  };

  // 페이지 변경
  const handlePage = (num: number) => {
    router.push(
      `/manager/study?name=${searchKeyword}&category=${selectedCategory}&page=${num}`
    );
    setPage(num);
  };

  const handleClear = () => {
    setSelectedCategory('전체');
    setKeyword('');
    router.push(`/manager/study?page=1`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCategory = selectedCategory === '전체' ? '' : selectedCategory;
    router.push(
      `/manager/study?name=${keyword}&category=${newCategory}&page=1`
    );
  };
  const handleClickSubmit = () => {
    const newCategory = selectedCategory === '전체' ? '' : selectedCategory;
    router.push(
      `/manager/study?name=${keyword}&category=${newCategory}&page=1`
    );
  };

  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    handleResize(); // 최초 세팅
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className='flex flex-wrap justify-between items-start mb-3 lg:mb-4 gap-2'>
        <h1 className='tb2 whitespace-nowrap'>스터디 목록</h1>
        <div className='w-full max-w-[419px] lg:w-auto flex items-center ml-auto bg-gray4 rounded-2xl pr-4'>
          <div className='w-[150px] h-9 relative z-1 pl-4 pr-6'>
            <button
              className={`w-full h-full t4 text-left ${
                selectedCategory === '전체' && 'text-gray3'
              }`}
              onClick={(e) => {
                e.preventDefault();
                setIsOpenCategoryModal((prev) => !prev);
              }}
            >
              {categoryFormatting(selectedCategory)}
            </button>
            <ChevronDown className='absolute w-5 h-5 text-main/60 right-0 top-1/2 -translate-y-1/2 -z-1' />
            {width > 1025 ? (
              isOpenCategoryModal && (
                <div className='absolute top-full w-full left-0 z-1'>
                  <ManagerCategoriesModal
                    onSelect={handleCategory}
                    customCss='!w-full !h-[200px] !overflow-auto t4'
                  />
                </div>
              )
            ) : (
              <ManagerMobileCategoryModal
                selectedCategory={selectedCategory}
                isOpenCategoryModal={isOpenCategoryModal}
                closeFn={() => setIsOpenCategoryModal(false)}
                onSelect={handleCategory}
              />
            )}
          </div>
          <div className='w-full lg:w-auto relative'>
            <form onSubmit={handleSubmit}>
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                // onKeyDown={searchName}
                className='h-9 t4 px-3 placeholder:text-gray3 w-full lg:w-auto'
                placeholder='스터디 이름 검색'
              ></input>
            </form>
          </div>

          <div className='flex gap-3 w-[60px] items-center justify-end'>
            {(keyword || selectedCategory !== '전체') && (
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
          <table className='w-full'>
            <colgroup>
              <col className='w-[30%]'></col>
              <col className='w-[25%]'></col>
              <col className='w-[15%]'></col>
              <col className='w-[15%]'></col>
              <col className='w-[15%]'></col>
            </colgroup>
            <thead className='bg-gray4 h-15'>
              <tr className='border-b border-border1'>
                <th className='px-2 lg:px-5 text-[14px] lg:text-base'>이름</th>
                <th className='px-2 lg:px-5 text-[14px] lg:text-base'>
                  카테고리
                </th>
                <th className='px-2 lg:px-5 text-[14px] lg:text-base'>
                  종료여부
                </th>
                <th className='px-2 lg:px-5 text-[14px] lg:text-base'>상태</th>
                <th className='w-[200px] px-2 lg:px-5 text-[14px] lg:text-base'>
                  상태변경
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <ManagerListSkeleton colsNumber={5} key={`skeleton${i}`} />
                ))
              ) : studies.length > 0 ? (
                studies.map((study) => (
                  <ManagerStudyList
                    key={`${study.id}`}
                    study={study}
                    handleDelete={handleDelete}
                    handleActive={handleActive}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    <div className='w-full h-[500px] flex items-center justify-center text-gray3'>
                      <div>
                        <SearchX
                          className='w-12 h-12 mx-auto mb-3'
                          strokeWidth={1.5}
                        />
                        <div className='flex gap-2 items-center'>
                          <span className='tb3'>
                            {searchCategory !== ''
                              ? `" ${categoryFormatting(searchCategory)} "`
                              : ''}
                          </span>
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
