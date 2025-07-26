'use client';

import { ChevronDown } from 'lucide-react';
import ClientEditorWrapper from '@/components/common/ClientEditorWrapper';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import { fetchStudyInfo } from '@/lib/api/study/fetchStudyInfo';
import { modifyStudyPost } from '@/lib/api/study/modify';
import { usePathname, useRouter } from 'next/navigation';

export default function Page() {
  const pathname = usePathname();
  const router = useRouter();
  const postId = Number(pathname.split('/').pop());
  const studyId = Number(pathname.split('/')[2]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const editorRef = useRef<ToastEditor>(null);

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchStudyInfo(postId);
      setCategory(data.postInfo.category);
      setTitle(data.postInfo.title);
      setContent(data.postInfo.content);
    } catch (error) {
      console.error('데이터 불러오기 실패ㅠㅠ:', error);
    }
  }, [postId]);

  useEffect(() => {
    if (!isNaN(postId)) {
      fetchData();
    }
  }, [postId, fetchData]);

  const handleSubmit = async () => {
    const instance = editorRef.current?.getInstance();
    const content = instance?.getMarkdown() || '';

    const payload = {
      title: title,
      category: category,
      content: content,
    };

    try {
      const data = await modifyStudyPost(postId, payload);
      console.log('수정 완료', data);
      router.push(`/study/${studyId}/study-community/detail/${postId}`);
    } catch (error) {
      console.error('수정 실패', error);
    }
    console.log('Title:', title, 'Content:', content, 'category:', category);
  };

  return (
    <>
      <div className='relative inline-block w-[320px] mb-6'>
        <select
          className='w-full h-[60px] border-[1px] rounded-[10px] pl-4 pr-10 appearance-none'
          style={{ borderColor: 'var(--color-border3)' }}
          name='selectedCategory'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value='' disabled hidden>
            게시글 유형을 선택해 주세요
          </option>
          <option value='NOTICE'>공지</option>
          <option value='FREE'>자유</option>
        </select>

        <div className='absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none'>
          <ChevronDown />
        </div>
      </div>

      <input
        className='border-[1px] w-full h-15 rounded-[10px] p-5 mb-10'
        style={{ borderColor: 'var(--color-border3)' }}
        placeholder='제목을 입력해주세요'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <div className='mb-10'>
        <ClientEditorWrapper editorRef={editorRef} content={content} />
      </div>
      <div className='flex justify-end'>
        <button className='button-type6 mr-[15px] hover:bg-[#f5f5f5]'>
          취소
        </button>
        <button
          className='button-type5 hover:bg-[#292929]'
          onClick={handleSubmit}
        >
          수정
        </button>
      </div>
    </>
  );
}
