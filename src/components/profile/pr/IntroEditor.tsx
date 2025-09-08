import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import { useRef, useState } from 'react';

export default function IntroductionEditor({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) {
  const editorRef = useRef<ToastEditor>(null);
  const [textLength, setTextLength] = useState(value?.length || 0);
  const maxLength = 500;

  const handleEditorChange = () => {
    const markdown = editorRef.current?.getInstance()?.getMarkdown() || '';
    setTextLength(markdown.length);
    onChange?.(markdown);
  };

  return (
    <div className='space-y-2'>
      <div className='h-[400px] lg:h-[450px]'>
        <ToastEditor
          ref={editorRef}
          previewStyle='tab'
          height='100%' // wrapper 높이에 맞추도록 100%
          initialValue={value}
          useCommandShortcut
          hideModeSwitch
          onChange={handleEditorChange}
          toolbarItems={[
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['ul', 'ol', 'task'],
            ['code', 'codeblock'],
          ]}
        />
      </div>
      <div className='text-right'>
        <div className='flex flex-col min-h-[40px]'>
          <p className='tm4 text-gray1'>
            {textLength}/{maxLength}자
          </p>
          <span
            className={`tm4 transition-opacity duration-200 ${
              textLength > maxLength ? 'text-red-500 opacity-100' : 'opacity-0'
            }`}
          >
            500자 이내로 작성해주세요
          </span>
        </div>
      </div>
    </div>
  );
}
