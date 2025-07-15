'use client';

import axios from 'axios';
import ClientEditorWrapper from '@/components/common/ClientEditorWrapper';
import { ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';
import { Editor as ToastEditor } from '@toast-ui/react-editor';

export default function Page() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const studyId = 1; // 더미 데이터
  const editorRef = useRef<ToastEditor>(null);

  const handleSubmit = async () => {
    const instance = editorRef.current?.getInstance();
    const content = instance?.getMarkdown() || '';

    const payload = {
      title: title,
      content: content,
      category: category,
    };

    try {
      const res = await axios.post(
        `https://wibby.cedartodo.uk/api/studies/${studyId}/posts`,
        payload
      );
      console.log('생성 완료', res.data);
    } catch (error) {
      console.error('생성 실패', error);
    }
    console.log('Title:', title, 'Content:', content, 'Category:', category);
  };

  return (
    <>
      <div className='relative inline-block w-[320px] mb-6'>
        <select
          className='w-full h-[60px] border-[1px] rounded-[10px] pl-4 pr-10 appearance-none'
          style={{ borderColor: 'var(--color-border3)' }}
          name='selectedStudy'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value='' disabled hidden>
            게시글 유형을 선택해 주세요
          </option>
          <option value='notification'>공지</option>
          <option value='free'>자유</option>
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
        <ClientEditorWrapper editorRef={editorRef} />
      </div>
      <div className='flex justify-end'>
        <button className='button-type6 mr-[15px] hover:bg-[#f5f5f5]'>
          취소
        </button>
        <button
          className='button-type5 hover:bg-[#292929]'
          onClick={handleSubmit}
        >
          등록
        </button>
      </div>
    </>
  );
}
