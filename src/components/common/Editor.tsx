"use client";

import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useRef } from "react";
import { useEffect } from "react";

export default function MyEditor() {
  const editorRef = useRef<Editor>(null);

  // const handleSave = () => {
  //   const markdown = editorRef.current?.getInstance().getMarkdown();
  //   console.log("작성된 내용:", markdown);
  // };

  useEffect(() => {
    const instance = editorRef.current?.getInstance();
    if (instance) {
      instance.setMarkdown(""); // 강제로 빈 내용으로 설정
    }
  }, []);

  return (
    <div>
      <Editor
        ref={editorRef}
        previewStyle='vertical'
        height='400px'
        initialEditType='wysiwyg'
        useCommandShortcut={true}
        hideModeSwitch={true}
        initialValue=''
      />
      {/* <button
        onClick={handleSave}
        className='mt-4 bg-black text-white px-4 py-2 rounded'
      >
        저장
      </button> */}
    </div>
  );
}
