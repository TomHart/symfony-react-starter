import React, {ChangeEvent, FormEvent, useState} from 'react';
import useCsrfToken from './useCsrfToken';
import SubmitButton from "@/components/form/SubmitButton";

type UseSymfonyFormOptions<T> = {
    csrfNamespace?: string,
    submitUrl: string;
    formKey?: string;
    csrfFieldName?: keyof T;
    initialData: T;
    onSuccess?: (response: Response) => void;
};

type ErrorsType<T> = {
    [K in keyof UseSymfonyFormOptions<T>["initialData"]]?: string[];
} & {
    general?: string[];
    [formKey: string]: string[] | undefined;
}


export enum FieldTypes {
    email = 'email',
    password = 'password',
    submit = 'submit',
    input = 'input'
}

type Constraints = {
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
};

type BaseField = {
    name: string;
    label: string;
    constraints: Constraints[];
};

type SubmitField = BaseField & {
    type: FieldTypes.submit;
    submittingText: string;
};

type OtherField = BaseField & {
    type: Exclude<FieldTypes, FieldTypes.submit>;
};

type Field = SubmitField | OtherField;

export type FormStructure = {
    formId: string;
    fields: Field[];
    csrf_namespace: string;
};

export function useLoadSymfonyForm({formUrl}: { formUrl: string }) {
    const [loading, setLoading] = React.useState(true);
    const [formData, setFormData] = React.useState<FormStructure>();

    React.useEffect(() => {
        async function fetchForm() {
            try {
                const response = await fetch(formUrl, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setFormData({
                        ...data,
                        fields: data.fields.map(parseField),
                    });
                } else {
                    console.error('Failed to fetch form:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching form:', error);
            } finally {
                setLoading(false);
            }
        }

        void fetchForm();
    }, [formUrl]);

    return {loading, formData};
}

function parseField(raw: any): Field {
    if (raw.type === FieldTypes.submit) {
        return {...raw, type: FieldTypes.submit,} as SubmitField;
    }

    return {...raw, type: raw.type as Exclude<FieldTypes, FieldTypes.submit>,} as OtherField;
}

export function useRenderSymfonyForm<T extends { [key: string]: any }>(
    {
        csrfNamespace = 'authenticate',
        submitUrl,
        formKey,
        csrfFieldName = '_token',
        initialData,
        onSuccess,
    }: UseSymfonyFormOptions<T>) {

    const {fetchCsrfToken, isLoading: isCsrfLoading} = useCsrfToken({
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

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const csrfToken = await fetchCsrfToken();
        setIsSubmitting(true);
        setErrors({});

        const formBody = new URLSearchParams();

        const formDataWithToken = {
            ...formData,
            [csrfFieldName as string]: csrfToken
        };
        const entries = Object.entries(formDataWithToken);
        entries.push(['submit', '']);
        for (const [key, value] of entries) {
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