import React, { ChangeEventHandler } from "react";
type EmailInputProps<FieldName extends string> = {
    handleChange: ChangeEventHandler<HTMLInputElement>;
    showForgotPassword?: boolean;
    errorPasswordField: FieldName;
    errors: {
        [K in FieldName]?: string[];
    };
};
export default function PasswordInput<FieldName extends string = 'password'>({ handleChange, showForgotPassword, errorPasswordField, errors }: EmailInputProps<FieldName>): React.JSX.Element;
export {};
