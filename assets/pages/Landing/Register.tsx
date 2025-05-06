import React from 'react';
import {ArrowLeft} from 'lucide-react';
import {Link} from "react-router-dom";
import {SymfonyFormWrapper} from "@/components/form/SymfonyForm";
import {useUser} from "@/provider/UserContext";

export default function Register() {
    const {user, loading} = useUser();

    if (loading) {
        return <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className='m-auto animate-spin'
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        </svg>;
    }

    if (user) {
        window.location.href = '/admin';
        return <p>Already logged in, redirecting...</p>;
    }

    return <RegisterInner/>;
}

function RegisterInner() {

    return (
        <div className="m-auto w-full max-w-md space-y-8">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Welcome!</h1>
                <p className="text-muted-foreground">Enter your details to sign up</p>
            </div>
            <div className="space-y-6">
                <SymfonyFormWrapper formUrl='/register/render' submitUrl='/register'
                                    onSuccess={() => window.location.href = '/admin'}/>
            </div>
            <div className="text-center text-sm">
                Have an account already?{' '}
                <Link to="/login" className="text-primary hover:underline">
                    Login
                </Link>
            </div>
            <div className="flex justify-center">
                <a href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Back to home
                </a>
            </div>
        </div>
    );
}
