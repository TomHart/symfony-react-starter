import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import React, {ChangeEventHandler} from "react";

type EmailInputProps<T extends string | number | readonly string[] | undefined> = {
    handleChange: ChangeEventHandler<HTMLInputElement>;
    errors: { email?: string[] };
    meta?: string;
    defaultValue?: T
}

export default function EmailInput<T extends string | number | readonly string[] | undefined>({
                                                                                                  handleChange,
                                                                                                  errors,
                                                                                                  meta,
                                                                                                  defaultValue
                                                                                              }: EmailInputProps<T>) {
    return <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
            id="email"
            type="email"
            name="email"
            placeholder="name@example.com"
            required
            defaultValue={defaultValue}
            onChange={handleChange}
            className={errors.email ? 'border-red-500' : ''}
        />

        {meta ? <p className="text-xs text-muted-foreground">{meta}</p> : null}

        {errors.email?.map((msg, i) => (
            <div key={i} className="text-red-500 text-sm">{msg}</div>
        ))}
    </div>;
}