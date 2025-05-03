import React, {useState} from 'react'
import {loadSymfonyForm} from "@/hooks/loadSymfonyForm";
import {Input} from "@/components/ui/input";
import {useSymfonyForm} from "@/hooks/useSymfonyForm";
import PasswordInput from "@/components/form/PasswordInput";
import EmailInput from "@/components/form/EmailInput";
import { Label } from '@/components/ui/label';

type SymfonyFormProps = {
    formName: any;
    // submitUrl: string;
    // initialData: Record<string, any>;
    // onSuccess?: (response: any) => void;
    // onError?: (error: any) => void;
    // elements?: React.ReactNode[];
}

export function SymfonyFormWrapper({}: SymfonyFormProps) {
    const {loading, formData} = loadSymfonyForm();

    if (loading) return <div>Loading form...</div>;
    if (!formData) return <div>Failed to load form.</div>;

    return <SymfonyForm formData={formData}/>;
}

type FormStructure = {
    formId: string;
    fields: {
        name: string;
        type: string;
        constraints: {
            type: string;
            message?: string;
            allowNull?: boolean;
            groups?: string[];
            max?: number;
            min?: number;
            exactMessage?: string;
            charsetMessage?: string;
            maxMessage?: string;
            minMessage?: string;
        }[];
        label: string;
    }[];
    csrf_namespace: string;
}

type InnerFormProps = {
    formData: FormStructure;
};

export function SymfonyForm({formData}: InnerFormProps) {

    const {
        errors,
        handleSubmit,
        handleChange,
        elements
    } = useSymfonyForm({
        csrfNamespace: 'registration_form',
        submitUrl: '/register',
        initialData: {}
    });

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            {formData.fields.map(field => {
                const {name, type, label} = field;

                switch (type) {
                    case 'email':
                        return (
                            <EmailInput handleChange={handleChange} errors={{ email: errors.email }}/>
                        );
                    case 'password':
                        return (
                            <PasswordInput
                                fieldName={name}
                                handleChange={handleChange}
                                showForgotPassword={false}
                                errors={errors}
                            />
                        );
                    case 'submit':
                        return <elements.SubmitButton text={label} submittingText="Submitting..."/>
                    default:
                        return (
                            <div className="space-y-2">
                                <Label htmlFor={name}>{label}</Label>
                                <Input
                                    id={name}
                                    type="hidden"
                                    name={name}
                                    placeholder={label}
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                        );
                }
            })}
            {/*<div className="space-y-2">*/}
            {/*    <Label htmlFor="email">Email</Label>*/}
            {/*    <Input*/}
            {/*        id="email"*/}
            {/*        type="email"*/}
            {/*        name="email"*/}
            {/*        placeholder="name@example.com"*/}
            {/*        required*/}
            {/*        onChange={handleChange}*/}
            {/*        className={errors.email ? 'border-red-500' : ''}*/}
            {/*    />*/}
            {/*    {errors.email?.map((msg, i) => (*/}
            {/*        <div key={i} className="text-red-500 text-sm">{msg}</div>*/}
            {/*    ))}*/}
            {/*</div>*/}
            {/*<div className="space-y-2">*/}
            {/*    <div className="flex items-center justify-between">*/}
            {/*        <Label htmlFor="password">Password</Label>*/}
            {/*    </div>*/}
            {/*    <div className="relative">*/}
            {/*        <Input*/}
            {/*            id="password"*/}
            {/*            name="plainPassword"*/}
            {/*            type={showPassword ? 'text' : 'password'}*/}
            {/*            placeholder="••••••••"*/}
            {/*            required*/}
            {/*            onChange={handleChange}*/}
            {/*            className={errors.plainPassword ? 'border-red-500' : ''}*/}
            {/*        />*/}
            {/*        <Button*/}
            {/*            type="button"*/}
            {/*            variant="ghost"*/}
            {/*            size="icon"*/}
            {/*            className="absolute right-2 top-1/2 -translate-y-1/2"*/}
            {/*            onClick={togglePasswordVisibility}*/}
            {/*        >*/}
            {/*            {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}*/}
            {/*            <span className="sr-only">Toggle password visibility</span>*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*    {errors.plainPassword?.map((msg, i) => (*/}
            {/*        <div key={i} className="text-red-500 text-sm">{msg}</div>*/}
            {/*    ))}*/}
            {/*</div>*/}

            {errors.registration_form?.map((msg, i) => (
                <div key={i} className="text-red-500 text-sm">{msg}</div>
            ))}

        </form>
    );
}