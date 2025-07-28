'use client';

import ClientEditorWrapper from '@/components/common/ClientEditorWrapper';
import { ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import { writeStudyPost } from '@/lib/api/study/write';
import { usePathname, useRouter } from 'next/navigation';
import CategoryStudyModal2 from '@/components/study/CategoryStudyModal2';

export default function StudyCommunityWritePage() {
  const pathname = usePathname();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const isSelectedCategory = category !== '카테고리';
  const studyId = Number(pathname.split('/')[2]);
  const editorRef = useRef<ToastEditor>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    const instance = editorRef.current?.getInstance();
    const content = instance?.getMarkdown() || '';
    const categoryMap: { [key: string]: string } = {
      공지: 'NOTICE',
      자유: 'FREE',
    };

    const englishCategory = categoryMap[category] || category;

    const payload = {
      title: title,
      category: englishCategory, // 영문으로 보냄
      content: content,
    };

    try {
      const data = await writeStudyPost(studyId, payload);
      const postId = data.data;

      console.log('생성 완료', data);
      router.push(`/study/${studyId}/study-community/detail/${postId}`);
    } catch (error) {
      console.error('생성 실패', error);
    }

    console.log(
      'Title:',
      title,
      'Content:',
      content,
      'Category:',
      englishCategory
    );
  };

  return (
    <>
      <div className='relative '>
        <button
          type='button'
          style={{ borderColor: 'var(--color-border3)' }}
          className={`w-[320px] h-[60px] rounded-[10px] flex items-center justify-between p-5 border mb-6  ${
            isSelectedCategory
              ? 'border-main text-text1 tm4'
              : 'border-main/10 text-text1/50 tm4'
          } `}
          onClick={() => setIsCategoryOpen((prev) => !prev)}
        >
          <p className={`mr-1 ${!category ? 'text-gray-400' : 'text-black'}`}>
            {category ? category : '게시글 유형을 선택해 주세요'}
          </p>
          <ChevronDown className='w-4 h-4' />
        </button>

        {isCategoryOpen && (
          <div className='absolute top-15 left-0 z-10'>
            <CategoryStudyModal2
              onSelect={(category: string) => {
                setCategory(category);
                setIsCategoryOpen(false);
              }}
            />
          </div>
        )}
      </div>

      <input
        className='border-[1px] w-full h-15 rounded-[10px] p-5 mb-10 tm4  placeholder-gray-400'
        style={{ borderColor: 'var(--color-border3)' }}
        placeholder='제목을 입력해주세요'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <div className='mb-10'>
        <ClientEditorWrapper editorRef={editorRef} onChange={setContent} />
      </div>
      <div className='flex justify-end'>
        <button className='button-type6 mr-[15px] hover:bg-[#f5f5f5]'>
          취소
        </button>
        <button
          className='button-type5 hover:bg-[#292929]'
          onClick={handleSubmit}
          disabled={category === '' || title === '' || content.trim() === ''}
        >
          등록
        </button>
      </div>
    </>
  );
}
