import React from 'react'
import {Input} from "@/components/ui/input";
import {FieldTypes, FormStructure, useLoadSymfonyForm, useRenderSymfonyForm} from "@/hooks/symfonyFormHooks";
import PasswordInput from "@/components/form/PasswordInput";
import EmailInput from "@/components/form/EmailInput";
import {Label} from '@/components/ui/label';

type SymfonyFormProps = {
    formUrl: string;
    submitUrl: string;
    onSuccess?: (response: any) => void;
}

export function SymfonyFormWrapper({formUrl, onSuccess, submitUrl}: SymfonyFormProps) {
    const {loading, formData} = useLoadSymfonyForm({formUrl});

    if (loading) return <svg
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
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>;
    if (!formData) return <div>Failed to load form.</div>;

    return <SymfonyForm formData={formData} submitUrl={submitUrl} onSuccess={onSuccess}/>;
}

type InnerFormProps = {
    formData: FormStructure;
    onSuccess?: (response: any) => void;
    submitUrl: string;
};

function SymfonyForm({formData, submitUrl, onSuccess}: InnerFormProps) {

    const {
        errors,
        handleSubmit,
        handleChange,
        elements
    } = useRenderSymfonyForm({
        csrfNamespace: formData.csrf_namespace,
        submitUrl: submitUrl,
        formKey: formData.csrf_namespace,
        initialData: {},
        onSuccess: onSuccess
    });

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            {formData.fields.map(field => {

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

            {errors.registration_form?.map((msg, i) => (
                <div key={i} className="text-red-500 text-sm">{msg}</div>
            ))}

        </form>
    );
}