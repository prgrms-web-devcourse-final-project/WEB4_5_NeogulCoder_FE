'use client';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import { useEffect } from 'react';
import { axiosInstance } from '../../lib/api/axios';

type Props = {
  editorRef: React.RefObject<ToastEditor>;
  content?: string;
};

export default function MyEditor({ editorRef, content }: Props) {
  const handleImageUpload = async (
    blob: Blob,
    callback: (url: string, alt?: string) => void
  ) => {
    try {
      const formData = new FormData();
      formData.append('file', blob);

      const response = await axiosInstance.post(
        '/api/studies/posts/images',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const imageUrl = response?.data?.message;
      if (!imageUrl) {
        throw new Error('이미지 URL 없음');
      }

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

  return (
    <div className='tm3'>
      <ToastEditor
        ref={editorRef}
        previewStyle='vertical'
        height='600px'
        initialEditType='wysiwyg'
        useCommandShortcut={true}
        hideModeSwitch={true}
        hooks={{
          addImageBlobHook: handleImageUpload,
        }}
        initialValue=''
      />
    </div>
  );
}
