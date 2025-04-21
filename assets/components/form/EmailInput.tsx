import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import React, {ChangeEventHandler} from "react";

type EmailInputProps = {
    handleChange: ChangeEventHandler<HTMLInputElement>;
    errors: { email?: string[] }
}

export default function EmailInput({handleChange, errors}: EmailInputProps) {
    return <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
            id="email"
            type="email"
            name="email"
            placeholder="name@example.com"
            required
            onChange={handleChange}
            className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email?.map((msg, i) => (
            <div key={i} className="text-red-500 text-sm">{msg}</div>
        ))}
    </div>;
}