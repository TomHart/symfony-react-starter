import React, {useState} from 'react'
import {ArrowLeft, Eye, EyeOff} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Checkbox} from "@/components/ui/checkbox"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
        </div>
        <div className="space-y-6">
            <form className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@example.com" required/>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a href="/forgot-password" className="text-sm text-primary hover:underline">
                            Forgot password?
                        </a>
                    </div>
                    <div className="relative">
                        <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" required/>
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
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="remember"/>
                    <Label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Remember me
                    </Label>
                </div>
                <Button type="submit" className="w-full">
                    Sign in
                </Button>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"/>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                    Google
                </Button>
                <Button variant="outline" className="w-full">
                    GitHub
                </Button>
            </div>
        </div>
        <div className="text-center text-sm">
            Don't have an account?{" "}
            <a href="/register" className="text-primary hover:underline">
                Register
            </a>
        </div>
        <div className="flex justify-center">
            <a href="/public" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4"/>
                Back to home
            </a>
        </div>
    </div>;
}
