'use client';

import { Button } from '@/components/custom/button';
import { PasswordInput } from '@/components/custom/password-input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import RegisterModel from '@/models/register-model';
import CreateUserModel from '@/models/create-user-model';
import { IconBrandFacebook, IconBrandGoogle } from '@tabler/icons-react';
import { HTMLAttributes, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import RegisterSchema from '@/schema/register-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRegister } from '@/hooks/services-hook/use-account.service.hook';

interface UserRegisterFormProps extends HTMLAttributes<HTMLDivElement> { }

export function UserRegisterForm({ className, ...props }: UserRegisterFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const registerMutation = useRegister();

    const form = useForm<RegisterModel>({
        resolver: yupResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            phoneCountryCode: '+1',
            confirmPassword: '',
            agreeToTerms: false,
        },
    });

    const onSubmit = async (model: RegisterModel) => {
        setIsLoading(true);

        try {
            // Transform the form data to match backend CreateUserModel
            const createUserData: CreateUserModel = {
                email: model.email,
                password: model.password,
                firstName: model.firstName || undefined,
                lastName: model.lastName || undefined,
                phoneNumber: model.phoneNumber || undefined,
                phoneCountryCode: model.phoneCountryCode || undefined,
            };

            const response = await registerMutation.mutateAsync(createUserData);

            if (response && response.status === 201) {
                toast({
                    title: 'Registration successful!',
                    description: 'Your account has been created. Please check your email to verify your account.',
                });

                // Redirect to login page after successful registration
                router.push('/login');
            }
        } catch (error: any) {
            console.error('Registration error:', error);

            let errorMessage = 'Registration failed. Please try again.';

            if (error?.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error?.response?.data?.errors && Array.isArray(error.response.data.errors)) {
                errorMessage = error.response.data.errors.join(', ');
            } else if (error?.message) {
                errorMessage = error.message;
            }

            toast({
                title: 'Registration Error',
                description: errorMessage,
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-2 gap-2">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John" {...field} />
                                        </FormControl>
                                        <FormMessage>
                                            {form.formState.errors.firstName && (
                                                <span>{form.formState.errors.firstName.message}</span>
                                            )}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Doe" {...field} />
                                        </FormControl>
                                        <FormMessage>
                                            {form.formState.errors.lastName && (
                                                <span>{form.formState.errors.lastName.message}</span>
                                            )}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="name@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.email && (
                                            <span>{form.formState.errors.email.message}</span>
                                        )}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-4 gap-2">
                            <FormField
                                control={form.control}
                                name="phoneCountryCode"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>Code</FormLabel>
                                        <FormControl>
                                            <Input placeholder="+1" {...field} />
                                        </FormControl>
                                        <FormMessage>
                                            {form.formState.errors.phoneCountryCode && (
                                                <span>{form.formState.errors.phoneCountryCode.message}</span>
                                            )}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            <div className="col-span-3">
                                <FormField
                                    control={form.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel>Phone Number (Optional)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="123-456-7890" {...field} />
                                            </FormControl>
                                            <FormMessage>
                                                {form.formState.errors.phoneNumber && (
                                                    <span>{form.formState.errors.phoneNumber.message}</span>
                                                )}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.password && (
                                            <span>{form.formState.errors.password.message}</span>
                                        )}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.confirmPassword && (
                                            <span>{form.formState.errors.confirmPassword.message}</span>
                                        )}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center gap-2 mt-2">
                            <input
                                type="checkbox"
                                id="agreeToTerms"
                                {...form.register('agreeToTerms')}
                                className="mr-2"
                            />
                            <label htmlFor="agreeToTerms" className="text-sm">
                                I agree to the{' '}
                                <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>
                        {form.formState.errors.agreeToTerms && (
                            <FormMessage>
                                <span className="text-sm text-red-500">
                                    {form.formState.errors.agreeToTerms.message}
                                </span>
                            </FormMessage>
                        )}

                        <Button type="submit" className="mt-4" loading={isLoading}>
                            Create Account
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
                            <Button
                                variant="outline"
                                className="w-full"
                                type="button"
                                loading={isLoading}
                                leftSection={<IconBrandGoogle className="h-4 w-4" />}
                            >
                                Google
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full"
                                type="button"
                                loading={isLoading}
                                leftSection={<IconBrandFacebook className="h-4 w-4" />}
                            >
                                Facebook
                            </Button>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}
