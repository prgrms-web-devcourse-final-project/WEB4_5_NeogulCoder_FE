'use client';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import { useEffect } from 'react';
import { uploadImage } from '@/lib/api/study/uploadImage';
import { usePathname } from 'next/navigation';

type Props = {
  editorRef: React.RefObject<ToastEditor | null>;
  content?: string;
  onChange?: (value: string) => void;
};

export default function MyEditor({ editorRef, content, onChange }: Props) {
  const pathname = usePathname();
  const showImageButton =
    pathname.includes('/study') && pathname.includes('/study-community/write');
  const toolbarItems = showImageButton
    ? [
        ['heading', 'bold', 'italic'],
        ['link', 'image'],
        ['ul', 'ol', 'task'],
        ['code', 'codeblock'],
      ]
    : [
        ['heading', 'bold', 'italic'],
        ['ul', 'ol', 'task'],
        ['code', 'codeblock'],
      ];

  const handleImageUpload = async (
    blob: Blob,
    callback: (url: string, alt?: string) => void
  ) => {
    try {
      const imageUrl = await uploadImage(blob);
      callback(imageUrl, 'uploaded image');
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  useEffect(() => {
    const instance = editorRef.current?.getInstance();
    if (instance && content) {
      instance.setMarkdown(content);
    }
  }, [editorRef, content]);

  const handleChange = () => {
    const value = editorRef.current?.getInstance().getMarkdown() || '';
    onChange?.(value);
  };

  return (
    <div className='tm3'>
      <ToastEditor
        ref={editorRef}
        initialValue=' '
        height='600px'
        initialEditType='wysiwyg'
        useCommandShortcut={false}
        hideModeSwitch={true}
        toolbarItems={toolbarItems}
        hooks={{
          addImageBlobHook: handleImageUpload,
        }}
        onChange={handleChange}
      />
    </div>
  );
}
