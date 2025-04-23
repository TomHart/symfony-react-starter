import React, {useState} from "react"
import {Eye, EyeOff} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {User, useUser} from "@/provider/UserContext";
import {useSymfonyForm} from "@/hooks/useSymfonyForm";
import EmailInput from "@/components/form/EmailInput";
import Loading from "@/pages/Landing/Loading";
import PasswordInput from "@/components/form/PasswordInput";

export default function ProfileEdit() {

    const {user, loading, error} = useUser();

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <h1>USER ERROR</h1>;
    }

    return (
        <div className="container max-w-6xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Edit Profile</h1>
                <p className="text-muted-foreground">Update your personal information and account settings</p>
            </div>

            <Tabs defaultValue="personal" className="space-y-8">
                <TabsList className="w-full justify-start border-b pb-px">
                    <TabsTrigger
                        value="personal"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                    >
                        Personal Information
                    </TabsTrigger>
                    <TabsTrigger
                        value="password"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                    >
                        Password
                    </TabsTrigger>
                    {/*<TabsTrigger*/}
                    {/*    value="notifications"*/}
                    {/*    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"*/}
                    {/*>*/}
                    {/*    Notifications*/}
                    {/*</TabsTrigger>*/}
                    {/*<TabsTrigger*/}
                    {/*    value="account"*/}
                    {/*    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"*/}
                    {/*>*/}
                    {/*    Account*/}
                    {/*</TabsTrigger>*/}
                </TabsList>

                <TabsContent value="personal" className="space-y-8">
                    {/* Profile Photo */}
                    {/*<Card>*/}
                    {/*    <CardHeader>*/}
                    {/*        <CardTitle>Profile Photo</CardTitle>*/}
                    {/*        <CardDescription>This will be displayed on your profile and in comments</CardDescription>*/}
                    {/*    </CardHeader>*/}
                    {/*    <CardContent className="flex flex-col items-center sm:flex-row sm:items-start sm:gap-8">*/}
                    {/*        <div className="relative mb-4 sm:mb-0">*/}
                    {/*            <Avatar className="h-24 w-24">*/}
                    {/*                <AvatarImage src="/placeholder.svg" alt="Profile"/>*/}
                    {/*                <AvatarFallback>JD</AvatarFallback>*/}
                    {/*            </Avatar>*/}
                    {/*            <Button*/}
                    {/*                size="icon"*/}
                    {/*                variant="outline"*/}
                    {/*                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full border-2 border-background"*/}
                    {/*            >*/}
                    {/*                <Camera className="h-4 w-4"/>*/}
                    {/*                <span className="sr-only">Upload new photo</span>*/}
                    {/*            </Button>*/}
                    {/*        </div>*/}
                    {/*        <div className="flex flex-col gap-2 text-center sm:text-left">*/}
                    {/*            <h3 className="font-medium">Upload a new photo</h3>*/}
                    {/*            <p className="text-sm text-muted-foreground">*/}
                    {/*                JPG, GIF or PNG. Max size of 800K. Square aspect ratio recommended.*/}
                    {/*            </p>*/}
                    {/*            <div className="flex flex-wrap gap-2">*/}
                    {/*                <Button variant="outline" size="sm">*/}
                    {/*                    Upload*/}
                    {/*                </Button>*/}
                    {/*                <Button variant="ghost" size="sm">*/}
                    {/*                    Remove*/}
                    {/*                </Button>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </CardContent>*/}
                    {/*</Card>*/}

                    {/* Personal Information */}
                    <PersonalInformationCard user={user}/>
                </TabsContent>

                <TabsContent value="password" className="space-y-8">
                    <PasswordCard user={user}/>
                </TabsContent>

                {/*<TabsContent value="notifications" className="space-y-8">*/}
                {/*    <Card>*/}
                {/*        <CardHeader>*/}
                {/*            <CardTitle>Notification Preferences</CardTitle>*/}
                {/*            <CardDescription>Manage how you receive notifications</CardDescription>*/}
                {/*        </CardHeader>*/}
                {/*        <CardContent className="space-y-6">*/}
                {/*            <div className="space-y-4">*/}
                {/*                <h3 className="text-sm font-medium">Email Notifications</h3>*/}
                {/*                <Separator/>*/}
                {/*                {[*/}
                {/*                    {*/}
                {/*                        title: "Project updates",*/}
                {/*                        description: "Get notified when a project is updated or completed",*/}
                {/*                        defaultChecked: true,*/}
                {/*                    },*/}
                {/*                    {*/}
                {/*                        title: "Task assignments",*/}
                {/*                        description: "Get notified when you're assigned to a task",*/}
                {/*                        defaultChecked: true,*/}
                {/*                    },*/}
                {/*                    {*/}
                {/*                        title: "Comments and mentions",*/}
                {/*                        description: "Get notified when someone mentions you or comments on your work",*/}
                {/*                        defaultChecked: true,*/}
                {/*                    },*/}
                {/*                    {*/}
                {/*                        title: "Team announcements",*/}
                {/*                        description: "Get notified about important team announcements",*/}
                {/*                        defaultChecked: false,*/}
                {/*                    },*/}
                {/*                    {*/}
                {/*                        title: "Product updates",*/}
                {/*                        description: "Get notified about new features and improvements",*/}
                {/*                        defaultChecked: false,*/}
                {/*                    },*/}
                {/*                ].map((item, i) => (*/}
                {/*                    <div key={i} className="flex items-center justify-between">*/}
                {/*                        <div className="space-y-0.5">*/}
                {/*                            <div className="text-sm font-medium">{item.title}</div>*/}
                {/*                            <div className="text-xs text-muted-foreground">{item.description}</div>*/}
                {/*                        </div>*/}
                {/*                        <Switch defaultChecked={item.defaultChecked}/>*/}
                {/*                    </div>*/}
                {/*                ))}*/}
                {/*            </div>*/}
                {/*            <div className="space-y-4">*/}
                {/*                <h3 className="text-sm font-medium">In-App Notifications</h3>*/}
                {/*                <Separator/>*/}
                {/*                {[*/}
                {/*                    {*/}
                {/*                        title: "Project updates",*/}
                {/*                        description: "Get notified when a project is updated or completed",*/}
                {/*                        defaultChecked: true,*/}
                {/*                    },*/}
                {/*                    {*/}
                {/*                        title: "Task assignments",*/}
                {/*                        description: "Get notified when you're assigned to a task",*/}
                {/*                        defaultChecked: true,*/}
                {/*                    },*/}
                {/*                    {*/}
                {/*                        title: "Comments and mentions",*/}
                {/*                        description: "Get notified when someone mentions you or comments on your work",*/}
                {/*                        defaultChecked: true,*/}
                {/*                    },*/}
                {/*                    {*/}
                {/*                        title: "Team announcements",*/}
                {/*                        description: "Get notified about important team announcements",*/}
                {/*                        defaultChecked: true,*/}
                {/*                    },*/}
                {/*                ].map((item, i) => (*/}
                {/*                    <div key={i} className="flex items-center justify-between">*/}
                {/*                        <div className="space-y-0.5">*/}
                {/*                            <div className="text-sm font-medium">{item.title}</div>*/}
                {/*                            <div className="text-xs text-muted-foreground">{item.description}</div>*/}
                {/*                        </div>*/}
                {/*                        <Switch defaultChecked={item.defaultChecked}/>*/}
                {/*                    </div>*/}
                {/*                ))}*/}
                {/*            </div>*/}
                {/*        </CardContent>*/}
                {/*        <CardFooter className="flex justify-end gap-2">*/}
                {/*            <Button variant="outline">Reset to defaults</Button>*/}
                {/*            <Button>Save preferences</Button>*/}
                {/*        </CardFooter>*/}
                {/*    </Card>*/}
                {/*</TabsContent>*/}

                {/*<TabsContent value="account" className="space-y-8">*/}
                {/*    <Card>*/}
                {/*        <CardHeader>*/}
                {/*            <CardTitle>Account Settings</CardTitle>*/}
                {/*            <CardDescription>Manage your account preferences and settings</CardDescription>*/}
                {/*        </CardHeader>*/}
                {/*        <CardContent className="space-y-6">*/}
                {/*            <div className="space-y-4">*/}
                {/*                <div className="flex items-center justify-between">*/}
                {/*                    <div className="space-y-0.5">*/}
                {/*                        <div className="text-sm font-medium">Two-factor authentication</div>*/}
                {/*                        <div className="text-xs text-muted-foreground">*/}
                {/*                            Add an extra layer of security to your account*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    <Button variant="outline" size="sm">*/}
                {/*                        Enable*/}
                {/*                    </Button>*/}
                {/*                </div>*/}
                {/*                <Separator/>*/}
                {/*                <div className="flex items-center justify-between">*/}
                {/*                    <div className="space-y-0.5">*/}
                {/*                        <div className="text-sm font-medium">Language</div>*/}
                {/*                        <div className="text-xs text-muted-foreground">Set your preferred language</div>*/}
                {/*                    </div>*/}
                {/*                    <Button variant="outline" size="sm" className="flex items-center gap-1">*/}
                {/*                        English (US)*/}
                {/*                        <ChevronRight className="h-4 w-4"/>*/}
                {/*                    </Button>*/}
                {/*                </div>*/}
                {/*                <Separator/>*/}
                {/*                <div className="flex items-center justify-between">*/}
                {/*                    <div className="space-y-0.5">*/}
                {/*                        <div className="text-sm font-medium">Time zone</div>*/}
                {/*                        <div className="text-xs text-muted-foreground">Set your local time zone</div>*/}
                {/*                    </div>*/}
                {/*                    <Button variant="outline" size="sm" className="flex items-center gap-1">*/}
                {/*                        (UTC-08:00) Pacific Time*/}
                {/*                        <ChevronRight className="h-4 w-4"/>*/}
                {/*                    </Button>*/}
                {/*                </div>*/}
                {/*                <Separator/>*/}
                {/*                <div className="flex items-center justify-between">*/}
                {/*                    <div className="space-y-0.5">*/}
                {/*                        <div className="text-sm font-medium">Email visibility</div>*/}
                {/*                        <div className="text-xs text-muted-foreground">Control who can see your email*/}
                {/*                            address*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    <Button variant="outline" size="sm" className="flex items-center gap-1">*/}
                {/*                        Team members only*/}
                {/*                        <ChevronRight className="h-4 w-4"/>*/}
                {/*                    </Button>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </CardContent>*/}
                {/*        <CardFooter className="flex justify-end gap-2">*/}
                {/*            <Button variant="outline">Cancel</Button>*/}
                {/*            <Button>Save settings</Button>*/}
                {/*        </CardFooter>*/}
                {/*    </Card>*/}

                {/*    <Card className="border-destructive">*/}
                {/*        <CardHeader>*/}
                {/*            <CardTitle className="text-destructive">Danger Zone</CardTitle>*/}
                {/*            <CardDescription>Irreversible and destructive actions</CardDescription>*/}
                {/*        </CardHeader>*/}
                {/*        <CardContent className="space-y-4">*/}
                {/*            <div className="flex items-center justify-between">*/}
                {/*                <div className="space-y-0.5">*/}
                {/*                    <div className="text-sm font-medium">Delete account</div>*/}
                {/*                    <div className="text-xs text-muted-foreground">*/}
                {/*                        Permanently delete your account and all of your data*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                <Button variant="destructive" size="sm">*/}
                {/*                    Delete account*/}
                {/*                </Button>*/}
                {/*            </div>*/}
                {/*        </CardContent>*/}
                {/*    </Card>*/}
                {/*</TabsContent>*/}
            </Tabs>
        </div>
    )
}

function PersonalInformationCard({user}: { user: User }) {

    const {
        formData,
        errors,
        isSubmitting,
        isCsrfLoading,
        handleChange,
        handleSubmit,
    } = useSymfonyForm({
        csrfNamespace: 'update_email',
        submitUrl: `/api/user/${user?.id}/email`,
        csrfFieldName: '_token',
        initialData: {
            email: user?.email,
            _token: ''
        },
        onSuccess: (response: Response) => {
            if (response.ok) {
                window.location.href = '/admin';
            }
        },
    })

    return <Card>
        <form onSubmit={handleSubmit}>
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/*<div className="grid gap-4 sm:grid-cols-2">*/}
                {/*    <div className="space-y-2">*/}
                {/*        <Label htmlFor="first-name">First name</Label>*/}
                {/*        <Input id="first-name" defaultValue="John"/>*/}
                {/*    </div>*/}
                {/*    <div className="space-y-2">*/}
                {/*        <Label htmlFor="last-name">Last name</Label>*/}
                {/*        <Input id="last-name" defaultValue="Doe"/>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="space-y-2">
                    <EmailInput handleChange={handleChange}
                                errors={errors}
                                defaultValue={formData.email}
                                meta="This email will be used for account-related notifications"/>
                </div>
                {/*<div className="space-y-2">*/}
                {/*    <Label htmlFor="phone">Phone number</Label>*/}
                {/*    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567"/>*/}
                {/*</div>*/}
                {/*<div className="space-y-2">*/}
                {/*    <Label htmlFor="bio">Bio</Label>*/}
                {/*    <Textarea*/}
                {/*        id="bio"*/}
                {/*        placeholder="Write a short bio about yourself"*/}
                {/*        defaultValue="Product Manager with 5+ years of experience in SaaS products."*/}
                {/*        className="min-h-[100px]"*/}
                {/*    />*/}
                {/*    <p className="text-xs text-muted-foreground">Brief description for your profile</p>*/}
                {/*</div>*/}
                {/*<div className="grid gap-4 sm:grid-cols-2">*/}
                {/*    <div className="space-y-2">*/}
                {/*        <Label htmlFor="company">Company</Label>*/}
                {/*        <Input id="company" defaultValue="Acme Inc."/>*/}
                {/*    </div>*/}
                {/*    <div className="space-y-2">*/}
                {/*        <Label htmlFor="role">Job title</Label>*/}
                {/*        <Input id="role" defaultValue="Product Manager"/>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <div className="flex flex-col items-end">
                    {errors.general?.map((msg, i) => (
                        <p key={i} className="text-red-500 text-sm">{msg}</p>
                    ))}

                    <Button type="submit" disabled={isSubmitting || isCsrfLoading}>
                        {isSubmitting ? 'Saving...' : (isCsrfLoading ? 'Preparing...' : 'Save changes')}
                    </Button>
                </div>
            </CardFooter>
        </form>
    </Card>;
}

function PasswordCard({user}: { user: User }) {

    const [showPassword, setShowPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const togglePasswordVisibility = (field: string) => {
        switch (field) {
            case "current":
                setShowPassword(!showPassword)
                break
            case "new":
                setShowNewPassword(!showNewPassword)
                break
            case "confirm":
                setShowConfirmPassword(!showConfirmPassword)
                break
        }
    }

    const {
        formData,
        errors,
        isSubmitting,
        isCsrfLoading,
        handleChange,
        handleSubmit,
    } = useSymfonyForm({
        csrfNamespace: 'update_password',
        submitUrl: `/api/user/${user?.id}/password`,
        csrfFieldName: '_token',
        initialData: {
            currentPassword: '',
            ['plainPassword[first]']: '',
            ['plainPassword[second]']: '',
            _token: ''
        },
        onSuccess: (response: Response) => {
            if (response.ok) {
                window.location.href = '/admin';
            }
        },
    })

    return <Card>
        <form onSubmit={handleSubmit}>
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="current-password">Current password</Label>
                    <div className="relative">
                        <PasswordInput
                            handleChange={handleChange}
                            errors={errors}
                            fieldName="currentPassword"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirm-password">New password</Label>
                    <PasswordInput
                        handleChange={handleChange}
                        errors={errors}
                        fieldName="plainPassword[first]"
                        meta="Password must be at least 8 characters and include a number and a symbol"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm new password</Label>
                    <PasswordInput
                        handleChange={handleChange}
                        errors={errors}
                        fieldName="plainPassword[second]"
                    />
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">

                {errors.general?.map((msg, i) => (
                    <p key={i} className="text-red-500 text-sm">{msg}</p>
                ))}

                <Button type="submit" disabled={isSubmitting || isCsrfLoading}>
                    {isSubmitting ? 'Updating...' : (isCsrfLoading ? 'Preparing...' : 'Update Password')}
                </Button>
            </CardFooter>
        </form>
    </Card>;
}