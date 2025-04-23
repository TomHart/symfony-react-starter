import { ChangeEvent, FormEvent } from 'react';
type UseSymfonyFormOptions<T> = {
    csrfNamespace?: string;
    submitUrl: string;
    formKey?: string;
    csrfFieldName: keyof T;
    initialData: T;
    onSuccess?: (response: Response) => void;
};
export declare function useSymfonyForm<T extends {
    [key: string]: any;
}>({ csrfNamespace, submitUrl, formKey, csrfFieldName, initialData, onSuccess, }: UseSymfonyFormOptions<T>): {
    formData: T;
    setFormData: import("react").Dispatch<import("react").SetStateAction<T>>;
    errors: { [K in keyof T]?: string[] | undefined; } & {
        [formKey: string]: string[] | undefined;
        general?: string[];
    };
    isSubmitting: boolean;
    isCsrfLoading: boolean;
    csrfError: string | null;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
};
export {};
