import {ChangeEventHandler} from "react";

type BaseInputProps<
    FieldName extends string | number | symbol,
    DefaultValueType = string
> = {
    handleChange: ChangeEventHandler<HTMLInputElement>;
    errors: { [K in FieldName]?: string[] };
    meta?: string;
    defaultValue?: DefaultValueType
    fieldName: FieldName;
}

export type PasswordInputProps<FieldName extends string> = BaseInputProps<FieldName> & {
    showForgotPassword?: boolean;
};

export type EmailInputProps = Omit<BaseInputProps<"email">, "fieldName"> & {
    fieldName?: "email";
};