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
        rememberMe: { label: 'Remember Me', type: 'checkbox' },
      },
      async authorize(credentials) {
        try {
          console.log('authorize: credentials received', credentials);

          // Convert rememberMe properly
          const rememberMe = credentials?.rememberMe === 'true' || (credentials?.rememberMe as any) === true;

          const loginPayload = {
            email: credentials?.email,
            password: credentials?.password,
            rememberMe: rememberMe,
          };

          console.log('authorize: sending payload', loginPayload);

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
            loginPayload,
            {
              headers: {
                'content-type': 'application/json',
                'clientid': `${process.env.NEXT_PUBLIC_API_CLIENT_ID}`,
              },
            }
          );
          console.log('authorize: backend response', response.data);
          debugger; // Debugger after API call

          // Map backend user structure to frontend UserDto structure
          const backendUser = response.data.data.user;
          const mappedUser = {
            id: backendUser.id, // Use the actual user ID from backend
            userId: backendUser.id,
            userName: backendUser.email,
            email: backendUser.email,
            fullName: `${backendUser.firstName || ''} ${backendUser.lastName || ''}`.trim() || backendUser.email,
            roleName: backendUser.role || 'USER',
            profilePicture: backendUser.profileImageUrl || null,
            phoneNumber: backendUser.phoneNumber || null,
            token: response.data.data.token,
            isActive: backendUser.isActive || true,
            isDelete: false,
            userType: backendUser.role || 'USER',
            timezoneId: 'Pacific Standard Time',
          };

          return mappedUser;
        } catch (error) {
          console.error('authorize: error details', error);
          if (axios.isAxiosError(error)) {
            console.error('authorize: axios error response', error.response?.data);
            console.error('authorize: axios error status', error.response?.status);
          }
          return null;
        }
      },
    }),
  ],
  secret: `${process.env.NEXTAUTH_SECRET}`,
  callbacks: {
    async jwt({ token, user }) {
      // If user object exists, add it to the token
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      // Add user data to session
      if (token.user) {
        session.user = token.user as any;
      }
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
