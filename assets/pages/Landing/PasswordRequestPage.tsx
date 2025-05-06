import React from 'react'

import {useRenderSymfonyForm} from "@/hooks/symfonyFormHooks";
import {Label} from "@/components/ui/label";
import PasswordInput from "@/components/form/PasswordInput";
import {useNavigate} from 'react-router-dom';

export default function SubmitResetPasswordRequest() {
    const navigate = useNavigate();

    const {
        errors,
        handleChange,
        handleSubmit,
        elements
    } = useRenderSymfonyForm({
        submitUrl: '/reset-password/reset',
        csrfFieldName: '_token',
        csrfNamespace: 'change_password',
        formKey: 'change_password_form',
        initialData: {
            ['plainPassword[first]']: '',
            ['plainPassword[second]']: '',
            _token: ''
        },
        onSuccess: async (response: Response) => {
            if (response.ok) {
                navigate('/login');
            }
        },
    });

    return <div className="m-auto w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <p className="text-muted-foreground">
                Enter your new password below
            </p>
        </div>
        <div className="space-y-6">

            <form className="space-y-4" onSubmit={handleSubmit}>

                <div className="space-y-2">
                    <Label htmlFor="confirm-password">New password</Label>
                    <PasswordInput
                        handleChange={handleChange}
                        errors={errors}
                        fieldName="plainPassword[first]"
                        meta="Password must be at least 8 characters and include a number and a symbol"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm new password</Label>
                    <PasswordInput
                        handleChange={handleChange}
                        errors={errors}
                        fieldName="plainPassword[second]"
                    />
                </div>

                <elements.GeneralErrors />
                <elements.SubmitButton text="Reset" submittingText="Resetting..."/>
            </form>

        </div>
    </div>;
}