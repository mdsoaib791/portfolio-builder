import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { options } from '@/app/api/auth/[...nextauth]/options';

import { UserRegisterForm } from '@/components/account/register';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
    title: `Register - ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: `Create your account on ${process.env.NEXT_PUBLIC_APP_NAME}`,
};

export default async function RegisterPage() {
    const session = await getServerSession(options); //to get the session on server component

    if (session) {
        redirect('/dashboard');
    }

    return (
        <>
            <div className="container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0">
                <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8">
                    <div className="mb-4 flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-6 w-6"
                        >
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                        <h1 className="text-xl font-medium">{process.env.NEXT_PUBLIC_APP_NAME}</h1>
                    </div>
                    <Card className="p-6">
                        <div className="flex flex-col space-y-2 text-left">
                            <h1 className="text-2xl font-semibold tracking-tight">Create Account</h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your details below to create your account
                            </p>
                        </div>
                        <UserRegisterForm />
                        <div className="mt-4 text-center text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                                Sign in here
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}