'use client';

import { Button } from '@/components/custom/button';
import { PasswordInput } from '@/components/custom/password-input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoginModel from '@/models/login-model';
import { IconBrandFacebook, IconBrandGoogle } from '@tabler/icons-react';
import { HTMLAttributes, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import LoginSchema from '@/schema/login-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginModel>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (model: LoginModel) => {
    setIsLoading(true);
    console.log("model", model)
    const loginStatus = await signIn('credentials', {
      redirect: false,
      email: model.email,
      password: model.password,
      rememberMe: model.rememberMe,
      callbackUrl: '/admin',
    });

    if (loginStatus && !loginStatus.error) {
      toast({
        title: 'Login successful',
        description: <span>Redirecting on dashboard</span>,
      });
    } else {
      setIsLoading(false);
      toast({
        title: 'Error',
        description: <span>Invalid email or password</span>,
      });
    }
  };

  useEffect(() => {
    if (status && status === 'authenticated' && session && session.user) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('at', session.user.token || '');
        localStorage.setItem('utz', session.user.timezoneId || 'Pacific Standard Time');
        localStorage.setItem('curCode', 'INR');
        localStorage.setItem('locales', 'en-IN');
        localStorage.setItem('fullName', session.user.fullName || '');
        localStorage.setItem('profilePicture', session.user.profilePicture || '');
      }

      router.push('/admin');
    }
  }, [status, session, router]);


  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage>{form.formState.errors.email && <span>{form.formState.errors.email.message}</span>}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link href="/forgot-password" className="text-sm font-medium text-muted-foreground hover:opacity-75">
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage>{form.formState.errors.password && <span>{form.formState.errors.password.message}</span>}</FormMessage>
                </FormItem>
              )}
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rememberMe"
                {...form.register('rememberMe')}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-sm">Remember Me</label>
            </div>

            <Button type={`submit`} className="mt-2" loading={isLoading}>
              Login
            </Button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" className="w-full" type="button" loading={isLoading} leftSection={<IconBrandGoogle className="h-4 w-4" />}>
                Google
              </Button>
              <Button variant="outline" className="w-full" type="button" loading={isLoading} leftSection={<IconBrandFacebook className="h-4 w-4" />}>
                Facebook
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
