'use client';

import CommonProps from '@/props/common-props';
import { SessionProvider } from 'next-auth/react';

export default function AuthProvider({ children }: CommonProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
