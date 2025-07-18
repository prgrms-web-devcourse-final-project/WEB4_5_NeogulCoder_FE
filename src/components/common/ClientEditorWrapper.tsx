'use client';

import dynamic from 'next/dynamic';
import { Editor as ToastEditor } from '@toast-ui/react-editor';

type Props = {
  editorRef: React.RefObject<ToastEditor | null>;
};

const Editor = dynamic(() => import('./Editor'), {
  ssr: false,
});

export default function ClientEditorWrapper({ editorRef }: Props) {
  return <Editor editorRef={editorRef} />;
}
