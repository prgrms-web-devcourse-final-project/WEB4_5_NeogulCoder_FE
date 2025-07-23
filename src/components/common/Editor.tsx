import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor, Editor as ToastEditor } from '@toast-ui/react-editor';
import { useEffect, useRef } from 'react';

// const editorRef = useRef<Editor>(null);

// const handleSave = () => {
//   const markdown = editorRef.current?.getInstance().getMarkdown();
//   console.log("작성된 내용:", markdown);
// };
// type Props = {
//   editorRef: React.RefObject<ToastEditor | null>;
// };

type MyEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function MyEditor({ value, onChange }: MyEditorProps) {
  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    const instance = editorRef.current?.getInstance();
    if (instance && value) {
      instance.setMarkdown(value); // 강제로 빈 내용으로 설정
    }
  }, []);

  const handleChange = () => {
    const markdown = editorRef.current?.getInstance().getMarkdown();
    if (markdown !== undefined) {
      onChange(markdown);
    }
  };

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
        onChange={handleChange}
      />
    </div>
  );
}
