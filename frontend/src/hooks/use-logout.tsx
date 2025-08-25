'use client';

import { signOut } from 'next-auth/react';

export default function useLogout() {
  async function logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('at');
      localStorage.removeItem('utz');
      localStorage.removeItem('curCode');
      localStorage.removeItem('locales');
      localStorage.removeItem('fullName');
      localStorage.removeItem('profilePicture');
    }
    await signOut({ callbackUrl: '/' });
  }

  return logout;
}
