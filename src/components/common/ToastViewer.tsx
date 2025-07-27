// ToastViewerClient.tsx
'use client';

import dynamic from 'next/dynamic';

const ToastViewer = dynamic(
  () => import('@toast-ui/react-editor').then((mod) => mod.Viewer),
  { ssr: false }
);

export default ToastViewer;
