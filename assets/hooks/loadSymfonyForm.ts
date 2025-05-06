import React from "react";


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

export function loadSymfonyForm() {
    const [loading, setLoading] = React.useState(true);
    const [formData, setFormData] = React.useState<FormStructure>();

    React.useEffect(() => {
        async function fetchForm() {
            try {
                const response = await fetch('/register/render', {
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
    }, []);

    return {loading, formData};
}

function parseField(raw: any): Field {
    if (raw.type === FieldTypes.submit) {
        return {...raw, type: FieldTypes.submit,} as SubmitField;
    }

    return {...raw, type: raw.type as Exclude<FieldTypes, FieldTypes.submit>,} as OtherField;
}