'use client';

import dynamic from 'next/dynamic';
const Viewer = dynamic(
  () => import('@toast-ui/react-editor').then((mod) => mod.Viewer),
  {
    ssr: false,
  }
);

type Props = {
  content: string;
};

export default function MarkdownViewer({ content }: Props) {
  return <Viewer initialValue={content} />;
}
