import React, { ChangeEventHandler } from "react";
type EmailInputProps<T extends string | number | readonly string[] | undefined> = {
    handleChange: ChangeEventHandler<HTMLInputElement>;
    errors: {
        email?: string[];
    };
    meta?: string;
    defaultValue?: T;
};
export default function EmailInput<T extends string | number | readonly string[] | undefined>({ handleChange, errors, meta, defaultValue }: EmailInputProps<T>): React.JSX.Element;
export {};
