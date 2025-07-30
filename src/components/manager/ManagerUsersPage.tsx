'use client';

import ManagerPagination from '@/components/manager/ManagerPagination';
import ManagerListSkeleton from '@/components/manager/ManagerListSkeleton';
import ManagerUserList from '@/components/manager/ManagerUserList';
import { deleteAdminUser, getAdminUser } from '@/lib/api/manager/manager';
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
    () => Number(searchParams.get('page')) || 0,
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

  // 이용자 삭제
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
  }, [user, page, searchKeyword, router]);

  const searchEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/manager?search=${keyword}&page=1`);
      setPage(1);
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
      <div className='flex justify-between items-start mb-4'>
        <h1 className='tb2'>회원 목록</h1>
        <div className='flex items-center bg-gray4 rounded-2xl pr-4'>
          <div className='relative'>
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={searchEmail}
              className='h-9 t4 px-3 placeholder:text-gray3'
              placeholder='회원 이메일 검색'
            ></input>
          </div>

          <div className='flex gap-3 w-[60px] items-center justify-end'>
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
                <th className='px-5'>삭제</th>
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
