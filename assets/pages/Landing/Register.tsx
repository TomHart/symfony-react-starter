import React from 'react';
import {ArrowLeft} from 'lucide-react';
import {Link} from "react-router-dom";
import {SymfonyFormWrapper} from "@/components/form/SymfonyForm";

export default function Register() {

    return (
        <div className="m-auto w-full max-w-md space-y-8">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Welcome!</h1>
                <p className="text-muted-foreground">Enter your details to sign up</p>
            </div>
            <div className="space-y-6">
                <SymfonyFormWrapper formUrl='/register/render' submitUrl='/register' onSuccess={() => alert('Success!')}/>
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
