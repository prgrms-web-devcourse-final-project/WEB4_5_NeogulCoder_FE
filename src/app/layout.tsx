import type { Metadata } from 'next';
import '../styles/globals.css';
import UserStore from './user-store';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer } from 'react-toastify';

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
        <ToastContainer
          toastClassName='tm4 toast-paperlogy'
          position='top-center'
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme='light'
          transition={Bounce}
        />
      </body>
    </html>
  );
}
