import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {Eye, EyeOff} from "lucide-react";
import {PasswordInputProps} from "@/components/form/InputTypes";

export default function PasswordInput<FieldName extends string = 'password'>({
                                                                                 handleChange,
                                                                                 showForgotPassword = false,
                                                                                 fieldName,
                                                                                 meta,
                                                                                 errors
                                                                             }: PasswordInputProps<FieldName>) {

    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return <div className="space-y-2">
        {showForgotPassword ? <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a href="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
            </a>
        </div> : null}
        <div className="relative">
            <Input id="password"
                   name={fieldName}
                   type={showPassword ? "text" : "password"}
                   placeholder="••••••••" required
                   onChange={handleChange}
                   className={errors[fieldName] ? 'border-red-500' : ''}/>
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={togglePasswordVisibility}
            >
                {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                <span className="sr-only">Toggle password visibility</span>
            </Button>
        </div>

        {meta ? <p className="text-xs text-muted-foreground">{meta}</p> : null}

        {errors[fieldName]?.map((msg, i) => (
            <div key={i} className="text-red-500 text-sm">{msg}</div>
        ))}
    </div>;
}