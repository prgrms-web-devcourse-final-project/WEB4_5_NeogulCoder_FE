'use client';

import dynamic from 'next/dynamic';
import { Editor as ToastEditor } from '@toast-ui/react-editor';

type Props = {
  editorRef: React.RefObject<ToastEditor | null>;
  content?: string;
};

const Editor = dynamic(() => import('./Editor'), {
  ssr: false,
});

export default function ClientEditorWrapper({ editorRef, content }: Props) {
  return <Editor editorRef={editorRef} content={content} />;
}
