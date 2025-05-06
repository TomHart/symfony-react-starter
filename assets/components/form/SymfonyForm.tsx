import React, {useState} from 'react'
import {FieldTypes, FormStructure, loadSymfonyForm} from "@/hooks/loadSymfonyForm";
import {Input} from "@/components/ui/input";
import {useSymfonyForm} from "@/hooks/useSymfonyForm";
import PasswordInput from "@/components/form/PasswordInput";
import EmailInput from "@/components/form/EmailInput";
import {Label} from '@/components/ui/label';

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

type InnerFormProps = {
    formData: FormStructure;
    formKey?: string
};

export function SymfonyForm({formData, formKey}: InnerFormProps) {

    const {
        errors,
        handleSubmit,
        handleChange,
        elements
    } = useSymfonyForm({
        csrfNamespace: formData.csrf_namespace,
        submitUrl: '/register',
        formKey: formData.csrf_namespace,
        initialData: {}
    });

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            {formData.fields.map(field => {
                //const {name, type, label} = field;

                switch (field.type) {
                    case FieldTypes.email:
                        return (
                            <EmailInput key={field.name} handleChange={handleChange} errors={{email: errors.email}}/>
                        );
                    case FieldTypes.password:
                        return (
                            <PasswordInput
                                key={field.name}
                                fieldName={field.name}
                                handleChange={handleChange}
                                showForgotPassword={false}
                                errors={errors}
                            />
                        );
                    case FieldTypes.submit:
                        return (
                            <elements.SubmitButton
                                key={field.name}
                                text={field.label}
                                submittingText={field.submittingText}
                            />
                        );
                    default:
                        return (
                            <div className="space-y-2" key={field.name}>
                                <Label htmlFor={field.name}>{field.label}</Label>
                                <Input
                                    id={field.name}
                                    type="hidden"
                                    name={field.name}
                                    placeholder={field.label}
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