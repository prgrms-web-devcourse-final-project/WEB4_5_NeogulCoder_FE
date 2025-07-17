'use client';

import { useEffect } from 'react';
import { userAuthStore } from '@/store/userStore';

export default function UserStore() {
  useEffect(() => {
    userAuthStore.getState().fetchUser();
  }, []);

  return null;
}
