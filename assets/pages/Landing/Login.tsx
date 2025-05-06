import React from 'react'
import {ArrowLeft} from "lucide-react"
import {useRenderSymfonyForm} from "@/hooks/symfonyFormHooks";
import EmailInput from "@/components/form/EmailInput";
import PasswordInput from "@/components/form/PasswordInput";
import {Link} from "react-router-dom";

export default function Login() {

    const {
        errors,
        handleChange,
        handleSubmit,
        elements
    } = useRenderSymfonyForm({
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

                <elements.GeneralErrors/>
                <elements.SubmitButton text="Sign In" submittingText="Logging in..."/>
            </form>
        </div>
        <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register"
                  className="text-primary hover:underline">
                Register
            </Link>
        </div>
        <div className="flex justify-center">
            <a href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4"/>
                Back to home
            </a>
        </div>
    </div>;
}