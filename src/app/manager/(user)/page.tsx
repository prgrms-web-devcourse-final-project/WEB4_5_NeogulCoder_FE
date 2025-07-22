'use client';

import ManagerPagination from '@/components/manager/ManagerPagination';
import ManagerListSkeleton from '@/components/manager/ManagerListSkeleton';
import ManagerUserList from '@/components/manager/ManagerUserList';
import { deleteAdminUser, getAdminUser } from '@/lib/api/manager/manager';
import { userAuthStore } from '@/stores/userStore';
import { Search, SearchX } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

export type AdminUserType = {
  id: number;
  email: string;
  nickname: string;
  activated: null | boolean;
};

export default function UserPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchKeyword = useMemo(
    () => searchParams.get('search') || '',
    [searchParams]
  );
  const pageParams = useMemo(
    () => Number(searchParams.get('page')) || 0,
    [searchParams]
  );
  const user = userAuthStore((state) => state.user);
  const [keyword, setKeyword] = useState(searchKeyword || '');
  const [page, setPage] = useState(pageParams || 1);
  const [users, setUsers] = useState<AdminUserType[]>([]);
  const [isLoading, setLoading] = useState(true);

  const [totalPage, setTotalPage] = useState(0);

  // 페이지 변경
  const handlePage = (num: number) => {
    router.push(`/manager?search=${keyword}&page=${num}`);
    setPage(num);
  };

  // 이용자 삭제
  const handleDelete = async (id: number) => {
    try {
      await deleteAdminUser(id);
      setUsers((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, activated: false } : item
        )
      );
      alert('삭제');
    } catch (error) {
      console.error('사용자 삭제 실패', error);
    }
  };

  // 목록 가져오기
  useEffect(() => {
    if (!user) return;

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { data } = await getAdminUser(page - 1, searchKeyword || '');
        setTotalPage(data.totalPages);
        setUsers(data.content);
      } catch (error) {
        console.error('사용자 목록을 불러오지 못했습니다.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user, page, searchKeyword]);

  const searchEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/manager?search=${keyword}&page=1`);
    }
  };

  return (
    <>
      <div className='flex justify-between items-start mb-4'>
        <h1 className='tb2'>회원 목록</h1>
        <div className='relative'>
          <Search className='w-5 h-5 text-gray3 absolute top-1/2 -translate-y-1/2 left-3' />
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={searchEmail}
            className='bg-gray4 rounded-2xl px-3 py-1.5 pl-10'
            placeholder='이메일 검색'
          ></input>
        </div>
      </div>
      <div className='h-[580px] mb-10'>
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
                <th className='px-5'>이름</th>
                <th className='px-5'>이메일</th>
                <th className='px-5'>상태</th>
                <th className='px-5'>상태변경</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <ManagerListSkeleton colsNumber={4} key={i} />
                ))
              ) : users.length > 0 ? (
                users.map((user) => (
                  <ManagerUserList
                    key={`${user.id}`}
                    user={user}
                    handleDelete={handleDelete}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={4}>
                    <div className='w-full h-[300px] flex items-center justify-center text-gray3'>
                      <div>
                        <SearchX
                          className='w-12 h-12 mx-auto mb-3'
                          strokeWidth={1.5}
                        />
                        <div className='flex gap-2 items-center'>
                          <span className='tb3'>
                            {keyword !== '' ? `" ${keyword} "` : ''}
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
