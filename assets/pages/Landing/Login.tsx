import React from 'react'
import {ArrowLeft} from "lucide-react"

import {Button} from "@/components/ui/button"
import {useSymfonyForm} from "@/hooks/useSymfonyForm";
import EmailInput from "@/components/form/EmailInput";
import PasswordInput from "@/components/form/PasswordInput";

export default function Login() {

    const {
        errors,
        handleChange,
        handleSubmit,
        elements
    } = useSymfonyForm({
        submitUrl: '/login',
        csrfFieldName: '_csrf_token',
        initialData: {
            email: '',
            password: '',
            _csrf_token: ''
        },
        onSuccess: (response: Response) => {
            if (response.ok) {
                window.location.href = '/admin';
            }
        },
    });

    return <div className="m-auto w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
        </div>
        <div className="space-y-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
                <EmailInput handleChange={handleChange} errors={errors}/>
                <PasswordInput
                    fieldName='password'
                    handleChange={handleChange}
                    showForgotPassword={true}
                    errors={errors}
                />

                <elements.GeneralErrors />
                <elements.SubmitButton text="Sign In" submittingText="Logging in..."/>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"/>
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
            Don't have an account?{" "}
            <a href="/Users/thr15/Development/Tom/symfony-scaffolding/assets/pages/Unauthenticated/Register"
               className="text-primary hover:underline">
                Register
            </a>
        </div>
        <div className="flex justify-center">
            <a href="/public" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4"/>
                Back to home
            </a>
        </div>
    </div>;
}

// Disable Cache
// 12 requests
// 5.43 MB / 1.14 MB transferred
// Finish: 5.26 s
// DOMContentLoaded: 5.16 s
// load: 5.16 s
//
// reset_password_request_form[email]	"a3@b.com"
// reset_password_request_form[_token]	"50c5e5a8c5a.6ulEZ6Cc32Iy_0RIEwtfx8E0Mx6gEdVqfQVneYIU1qU.h64uJvXylT1dxiJwZ31sjqNFQXONaYo8CVApC9h9verTozYyyOWHMFinfA"
