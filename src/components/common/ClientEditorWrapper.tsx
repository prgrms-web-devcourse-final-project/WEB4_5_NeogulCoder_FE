"use client";

import dynamic from "next/dynamic";

// ✅ dynamic import로 ssr: false
const Editor = dynamic(() => import("./Editor"), {
  ssr: false,
});

export default function ClientEditorWrapper() {
  return <Editor />;
}
