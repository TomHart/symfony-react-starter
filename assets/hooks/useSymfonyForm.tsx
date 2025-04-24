import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import useCsrfToken from './useCsrfToken';
import SubmitButton from "@/components/form/SubmitButton";

type UseSymfonyFormOptions<T> = {
    csrfNamespace?: string,
    submitUrl: string;
    formKey?: string;
    csrfFieldName: keyof T;
    initialData: T;
    onSuccess?: (response: Response) => void;
};

type ErrorsType<T> = {
    [K in keyof UseSymfonyFormOptions<T>["initialData"]]?: string[];
} & {
    general?: string[];
    [formKey: string]: string[] | undefined;
}

export function useSymfonyForm<T extends { [key: string]: any }>(
    {
        csrfNamespace = 'authenticate',
        submitUrl,
        formKey,
        csrfFieldName = '_token',
        initialData,
        onSuccess,
    }: UseSymfonyFormOptions<T>) {

    const {csrfToken, error: csrfError, isLoading: isCsrfLoading} = useCsrfToken({
        namespace: csrfNamespace
    });
    const [formData, setFormData] = useState<T>({...initialData, [csrfFieldName]: ''});
    const [errors, setErrors] = useState<{
        [K in keyof T]?: string[];
    } & {
        general?: string[];
        [formKey: string]: string[] | undefined;
    }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (csrfToken) {
            setFormData((prev) => ({
                ...prev,
                [csrfFieldName]: csrfToken,
            }));
        }
    }, [csrfToken]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        const formBody = new URLSearchParams();
        for (const [key, value] of Object.entries(formData)) {
            if (formKey) {
                if (key.indexOf('[') === -1) {
                    formBody.append(`${formKey}[${key}]`, String(value));
                } else {
                    const split = key.split('[');
                    formBody.append(`${formKey}[${split[0]}][${split[1]}`, String(value));

                }
            } else {
                formBody.append(`${key}`, String(value));
            }
        }

        try {
            const response = await fetch(submitUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                },
                body: formBody.toString(),
                credentials: 'include',
            });

            if (response.ok) {
                onSuccess?.(response);
            } else {
                const data = await response.json();
                if (data.errors) {
                    setErrors(data.errors);
                }
            }
        } catch (err) {
            console.error('Form submission error:', err);
            setErrors({
                _form: ['An unexpected error occurred. Please try again.'],
            } as any);
        } finally {
            setIsSubmitting(false);
        }
    };

    const SubmitButtonWrapper = ({text, submittingText, csrfLoadingText = 'Preparing...'}: {
        text: string;
        submittingText: string;
        csrfLoadingText?: string;
    }) => (
        <SubmitButton
            text={text}
            submittingText={submittingText}
            csrfLoadingText={csrfLoadingText}
            isSubmitting={isSubmitting}
            isCsrfLoading={isCsrfLoading}
        />);

    return {
        formData,
        setFormData,
        errors,
        isSubmitting,
        isCsrfLoading,
        csrfError,
        handleChange,
        handleSubmit,
        elements: {
            SubmitButton: SubmitButtonWrapper,
            GeneralErrors: getGeneralErrorsDisplay(errors),
        }
    };
}

function getGeneralErrorsDisplay(errors: ErrorsType<{ _token: string, _csrf_token: string }>) {
    return () => (
        <>
            {errors._token?.map((msg, i) => (
                <div key={i} className="text-red-500 text-sm">{msg}</div>
            ))}

            {errors._csrf_token?.map((msg, i) => (
                <div key={i} className="text-red-500 text-sm">{msg}</div>
            ))}

            {errors.general?.map((msg, i) => (
                <div key={i} className="text-red-500 text-sm">{msg}</div>
            ))}
        </>
    );
}