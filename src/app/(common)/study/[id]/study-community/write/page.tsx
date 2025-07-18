import ClientEditorWrapper from '@/components/common/ClientEditorWrapper';
import { ChevronDown } from 'lucide-react';
export default function page() {
  return (
    <>
      <div className='relative inline-block w-[320px] mb-6'>
        <select
          className='w-full h-[60px] border-[1px] rounded-[10px] pl-4 pr-10 appearance-none'
          style={{ borderColor: 'var(--color-border3)' }}
          name='selectedStudy'
          defaultValue=''
        >
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
      ></input>
      <div className='mb-10'>
        <ClientEditorWrapper />
      </div>
      <div className='flex justify-end'>
        <button className='button-type6 mr-[15px] hover:bg-[#f5f5f5]'>
          취소
        </button>
        <button className='button-type5 hover:bg-[#292929]'>등록</button>
      </div>
    </>
  );
}
