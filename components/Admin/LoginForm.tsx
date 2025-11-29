'use client';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useCallback, useState } from "react"
import axios from "axios"
import InputError from "../input-error";
import { Spinner } from "@/components/ui/spinner"

import { Toaster } from "@/components/ui/sonner"
import { useRouter } from 'next/navigation';

interface LoginFormProps extends React.ComponentProps<'div'> {
    hasSignUp?: boolean;
    login_type?: string
}

export function LoginForm({
    hasSignUp = false,
    login_type = 'admin',
    className,
    ...props
}: LoginFormProps) {

    const base_url = process.env.NEXT_PUBLIC_BASE_URL;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();

    let loginUrl = base_url;

    if (login_type === 'admin') {
        loginUrl = base_url + '/api/admin/login';
    }else{ 
        loginUrl = base_url + '/api/vendor/login';
    }


    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        if (!email || !password) {
            setError("Email and password are required.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(loginUrl, {
                email,
                password,
            });

            if (response.status === 200) {
                setSuccess('Login successful! Redirecting...');
                if(login_type === 'admin'){
                    router.push('/admin/dashboard');
                }else{
                    router.push('/vendor/dashboard');
                }
            } else {
                setError(response.data?.message || 'An unexpected error occurred.');
            }
        } catch {
            const errorMessage = 'Failed to connect or log in. Please check your credentials.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }


    }, [email, password, loginUrl, router])

    if (success) {
        toast.success(success)
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                {error && <InputError message={error} />}
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="enter your password"
                                    required />
                            </Field>
                            <Field>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading && <Spinner />}
                                    Login
                                </Button>
                                {hasSignUp &&
                                    <FieldDescription className="text-center">
                                        Don&apos;t have an account? <a href="#">Sign up</a>
                                    </FieldDescription>
                                }

                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
            <Toaster position="top-left" />
        </div>
    )
}
