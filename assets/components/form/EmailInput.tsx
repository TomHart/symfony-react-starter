import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import React from "react";
import {EmailInputProps} from "./InputTypes";

export default function EmailInput({
                                                                  handleChange,
                                                                  errors,
                                                                  meta,
                                                                  defaultValue,
                                                                  fieldName = 'email'
                                                              }: EmailInputProps) {
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
            className={errors[fieldName] ? 'border-red-500' : ''}
        />

        {meta ? <p className="text-xs text-muted-foreground">{meta}</p> : null}

        {errors[fieldName]?.map((msg, i) => (
            <div key={i} className="text-red-500 text-sm">{msg}</div>
        ))}
    </div>;
}