import { LoginDto } from '@/dtos/login-dto';
import axios from 'axios';

import { NextAuthOptions } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: '',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          debugger; // Debugger for VSCode/Browser
          console.log('authorize: credentials received', credentials);
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            },
            {
              headers: {
                'content-type': 'application/json',
                clientId: `${process.env.NEXT_PUBLIC_API_CLIENT_ID}`,
              },
            }
          );
          console.log('authorize: backend response', response.data);
          debugger; // Debugger after API call
          return response.data.data;
        } catch (error) {
          console.error('authorize: error', error);
          debugger; // Debugger on error
          return null;
        }
      },
    }),
  ],
  secret: `${process.env.NEXTAUTH_SECRET}`,
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = (token as unknown as LoginDto).user;
      return session;
    },
  },
  session: { strategy: 'jwt' },
  events: {
    async signOut() { },
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV !== 'production',
  pages: {
    signIn: '/login',
  },
};
