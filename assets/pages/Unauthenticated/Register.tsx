import React, { ChangeEvent, FormEvent, useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useCsrfToken from "@/hooks/useCsrfToken";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const { csrfToken, error, isLoading } = useCsrfToken(); // Get CSRF token

    const [formData, setFormData] = useState({
        email: '',
        plainPassword: '',
        _token: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({}); // Store errors per field

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true); // Set submission to true (loading state)
        setErrors({}); // Clear any previous errors

        // Start preparing the form data
        const formBody = new URLSearchParams();
        formData['_token'] = csrfToken;

        // Append form data fields (email, password, etc.)
        for (const [key, value] of Object.entries(formData)) {
            formBody.append(`registration_form[${key}]`, String(value));
        }

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody.toString(),
                credentials: 'include', // Ensure cookies are sent for the current session
            });

            if (response.ok) {
                console.log('User registered successfully');

                window.location.href = '/admin';
            } else {
                // Handle errors
                const responseData = await response.json();
                if (responseData.errors) {
                    setErrors(responseData.errors); // Store the errors for each field
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ registration_form: ['An error occurred while submitting the form. Please try again.'] });
        } finally {
            setIsSubmitting(false); // Stop loading state
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="m-auto w-full max-w-md space-y-8">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Welcome!</h1>
                <p className="text-muted-foreground">Enter your details to sign up</p>
            </div>
            <div className="space-y-6">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="name@example.com"
                            required
                            onChange={handleChange}
                            className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email?.map((msg, i) => (
                            <div key={i} className="text-red-500 text-sm">{msg}</div>
                        ))}
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                        </div>
                        <div className="relative">
                            <Input
                                id="password"
                                name="plainPassword"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                required
                                onChange={handleChange}
                                className={errors.plainPassword ? 'border-red-500' : ''}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                <span className="sr-only">Toggle password visibility</span>
                            </Button>
                        </div>
                        {errors.plainPassword?.map((msg, i) => (
                            <div key={i} className="text-red-500 text-sm">{msg}</div>
                        ))}
                    </div>

                    {errors.registration_form?.map((msg, i) => (
                        <div key={i} className="text-red-500 text-sm">{msg}</div>
                    ))}

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Sign Up'}
                    </Button>
                </form>
                <div className="relative">
                    <div className="mb-2 inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full">
                        Google
                    </Button>
                    <Button variant="outline" className="w-full">
                        GitHub
                    </Button>
                </div>
            </div>
            <div className="text-center text-sm">
                Have an account already?{' '}
                <a href="/Users/thr15/Development/Tom/symfony-scaffolding/assets/pages/Unauthenticated/Login" className="text-primary hover:underline">
                    Login
                </a>
            </div>
            <div className="flex justify-center">
                <a href="/public" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to home
                </a>
            </div>
        </div>
    );
}
