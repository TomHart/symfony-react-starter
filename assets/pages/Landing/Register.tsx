import React, {useState} from 'react';
import {ArrowLeft, Eye, EyeOff} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useSymfonyForm} from "@/hooks/useSymfonyForm";
import {Link} from "react-router-dom";

export default function Register() {

    const {
        formData,
        errors,
        handleSubmit,
        handleChange,
        elements
    } = useSymfonyForm({
        csrfNamespace: 'registration_form',
        submitUrl: '/register',
        initialData: {
            email: '',
            plainPassword: '',
            _token: ''
        }
    });

    const [showPassword, setShowPassword] = useState(false);


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

                    <elements.SubmitButton text="Sign Up" submittingText="Submitting..."/>
                </form>
            </div>
            <div className="text-center text-sm">
                Have an account already?{' '}
                <Link to="/login" className="text-primary hover:underline">
                    Login
                </Link>
            </div>
            <div className="flex justify-center">
                <a href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to home
                </a>
            </div>
        </div>
    );
}
