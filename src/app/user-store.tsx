'use client';

import { useEffect } from 'react';
import { userAuthStore } from '@/stores/userStore';

export default function UserStore() {
  useEffect(() => {
    const loginStatus = localStorage.getItem('login_status');
    // console.log(loginStatus);
    if (loginStatus === 'Y') userAuthStore.getState().fetchUser();
  }, []);

  return null;
}
