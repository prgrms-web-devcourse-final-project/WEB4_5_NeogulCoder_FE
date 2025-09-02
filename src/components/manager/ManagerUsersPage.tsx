'use client';

import ManagerPagination from '@/components/manager/ManagerPagination';
import ManagerListSkeleton from '@/components/manager/ManagerListSkeleton';
import ManagerUserList from '@/components/manager/ManagerUserList';
import {
  deleteAdminUser,
  getAdminUser,
  postAdminUser,
} from '@/lib/api/manager/manager';
import { userAuthStore } from '@/stores/userStore';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { Search, SearchX, X } from 'lucide-react';

export type AdminUserType = {
  id: number;
  email: string;
  nickname: string;
  activated: null | boolean;
};

export default function ManagerUsersPage() {
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
  const [users, setUsers] = useState<AdminUserType[]>([]);
  const [isLoading, setLoading] = useState(true);

  const [totalPage, setTotalPage] = useState(1);

  // 페이지 변경
  const handlePage = (num: number) => {
    router.push(`/manager?search=${keyword}&page=${num}`);
    setPage(num);
  };

  // 이용자 비활성화
  const handleDelete = async (id: number) => {
    try {
      await deleteAdminUser(id);
      setUsers((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, activated: false } : item
        )
      );
      toast.success(`해당 사용자를 비활성화 하였습니다.`);
    } catch (error) {
      toast.error(`사용자 비활성화 실패 ${error}`);
    }
  };

  // 이용자 활성화
  const handleActive = async (id: number) => {
    try {
      await postAdminUser(id);
      setUsers((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, activated: true } : item
        )
      );
      toast.success(`해당 사용자를 활성화 하였습니다.`);
    } catch (error) {
      toast.error(`사용자 활성화 실패 ${error}`);
    }
  };

  // 목록 가져오기
  useEffect(() => {
    if (!user) return;

    if (user.role !== 'ROLE_ADMIN') {
      router.push('/');
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const keyword = searchParams.get('search') || '';
        const pageNum = Number(searchParams.get('page')) || 1;
        const { data } = await getAdminUser(pageNum - 1, keyword);
        setTotalPage(data.totalPages);
        setUsers(data.content);
        setKeyword(keyword);
        setPage(pageNum);
      } catch (error) {
        console.error('사용자 목록을 불러오지 못했습니다.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user, router, searchParams]);

  const searchEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/manager?search=${keyword}&page=1`);
    }
  };

  // 리셋
  const handleClear = () => {
    setKeyword('');
    router.push(`/manager?page=1`);
  };

  // 버튼 클릭 검색
  const handleClickSubmit = () => {
    router.push(`/manager?search=${keyword}&page=1`);
  };
  return (
    <>
      <div className='flex flex-wrap justify-between items-start mb-3 lg:mb-4 gap-2'>
        <h1 className='tb2 whitespace-nowrap'>회원 목록</h1>
        <div className='w-full max-w-[285px] lg:w-auto flex items-center bg-gray4 rounded-2xl pr-4'>
          <div className='w-full lg:w-auto relative'>
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={searchEmail}
              className='w-full lg:w-auto h-9 t4 px-3 placeholder:text-gray3'
              placeholder='회원 이메일 검색'
            ></input>
          </div>

          <div className='flex w-[60px] items-center justify-end ml-auto'>
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
              <col className='w-[30%]'></col>
              <col className='w-[40%]'></col>
              <col className='w-[15%]'></col>
              <col className='w-[15%]'></col>
            </colgroup>
            <thead className='bg-gray4 h-15'>
              <tr className='border-b border-border1'>
                <th className='px-1 lg:px-5 text-[12px] lg:text-base'>이름</th>
                <th className='px-1 lg:px-5 text-[12px] lg:text-base'>
                  이메일
                </th>
                <th className='px-1 lg:px-5 text-[12px] lg:text-base'>상태</th>
                <th className='px-1 lg:px-5 text-[12px] lg:text-base'>
                  상태변경
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <ManagerListSkeleton colsNumber={4} key={`skeleton${i}`} />
                ))
              ) : users.length > 0 ? (
                users.map((user) => (
                  <ManagerUserList
                    key={`${user.id}`}
                    user={user}
                    handleDelete={handleDelete}
                    handleActive={handleActive}
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
