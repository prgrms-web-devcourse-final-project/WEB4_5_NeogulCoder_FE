import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import { useEffect } from 'react';

type Props = {
  editorRef: React.RefObject<ToastEditor | null>;
  content?: string;
};

export default function MyEditor({ editorRef, content }: Props) {
  useEffect(() => {
    const instance = editorRef.current?.getInstance();
    if (instance) {
      instance.setMarkdown(content);
    }
  }, [editorRef, content]);

  // const handleChange = () => {
  //   const markdown = editorRef.current?.getInstance().getMarkdown();
  //   if (markdown !== undefined) {
  //     onChange(markdown);
  //   }
  // };

  return (
    <div className='tm3'>
      <ToastEditor
        ref={editorRef}
        previewStyle='vertical'
        height='600px'
        initialEditType='wysiwyg'
        useCommandShortcut={true}
        hideModeSwitch={true}
        initialValue=''
        // onChange={handleChange}
      />
    </div>
  );
}
