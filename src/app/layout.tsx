import type { Metadata } from 'next';
import '../styles/globals.css';
import UserStore from './user-store';

export const metadata: Metadata = {
  title: 'Wibby',
  description: 'Wibby',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        <UserStore />
        {children}
      </body>
    </html>
  );
}
