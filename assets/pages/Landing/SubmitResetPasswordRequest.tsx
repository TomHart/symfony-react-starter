import React from 'react'
import {ArrowLeft} from "lucide-react"

import {useSymfonyForm} from "@/hooks/useSymfonyForm";
import EmailInput from "@/components/form/EmailInput";
import {Link} from "react-router-dom";

export default function SubmitResetPasswordRequest() {

    const [success, setSuccess] = React.useState(false);
    const [lifetime, setLifetime] = React.useState(1);

    const {
        formData,
        errors,
        handleChange,
        handleSubmit,
        elements
    } = useSymfonyForm({
        submitUrl: '/reset-password',
        csrfFieldName: '_token',
        csrfNamespace: 'reset_password',
        formKey: 'reset_password_request_form',
        initialData: {
            email: '',
            _token: ''
        },
        onSuccess: async (response: Response) => {
            if (response.ok) {
                setSuccess(true);
                setLifetime((await response.json()).tokenLifetime)
            }
        },
    });

    return <div className="m-auto w-full max-w-md space-y-8">

        {!success
            ?
            <>
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Reset Password</h1>
                    <p className="text-muted-foreground">
                        Enter your email, and if that email is registered we'll send you instructions to reset your
                        password
                    </p>
                </div>
                <div className="space-y-6">

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <EmailInput handleChange={handleChange} errors={errors}/>

                        <elements.GeneralErrors/>
                        <elements.SubmitButton text="Reset" submittingText="Checking..."/>
                    </form>

                </div>
            </>
            :
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Email has been sent</h1>
                <p className="text-muted-foreground">
                    An email has been sent that contains a link that you can click to reset your password. This link
                    will expire in {lifetime} hour(s).
                </p>
                <p className="text-muted-foreground">
                    If you don't receive an email please check your spam folder or <Link to="/reset-password" onClick={() => {
                        setSuccess(false);
                        formData.email = '';
                }}>try
                    again</Link>.
                </p>
            </div>
        }

        <div className="text-center text-sm">
            Don't have an account?{" "}
            <a href="/Users/thr15/Development/Tom/symfony-scaffolding/assets/pages/Unauthenticated/Register"
               className="text-primary hover:underline">
                Register
            </a>
        </div>
        <div className="text-center text-sm">
            Have an account already?{' '}
            <a href="/Users/thr15/Development/Tom/symfony-scaffolding/assets/pages/Unauthenticated/Login"
               className="text-primary hover:underline">
                Login
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