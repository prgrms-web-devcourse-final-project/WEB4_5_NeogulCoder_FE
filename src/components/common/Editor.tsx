import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import { useEffect } from 'react';

type Props = {
  editorRef: React.RefObject<ToastEditor | null>;
};

export default function MyEditor({ editorRef }: Props) {
  useEffect(() => {
    const instance = editorRef.current?.getInstance();
    if (instance) {
      instance.setMarkdown('');
    }
  }, []);

  return (
    <div>
      <ToastEditor
        ref={editorRef}
        previewStyle='vertical'
        height='600px'
        initialEditType='wysiwyg'
        useCommandShortcut={true}
        hideModeSwitch={true}
        initialValue=''
      />
    </div>
  );
}
