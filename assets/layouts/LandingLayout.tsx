import React from "react"
import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";

export default function LandingLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container m-auto @container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link to="/" className="font-semibold text-xl">
                        Product Sphere
                    </Link>
                </div>
                <nav className="hidden md:flex gap-6">
                    <a
                        href="#features"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Features
                    </a>
                    <a
                        href="#pricing"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Pricing
                    </a>
                    <a
                        href="#testimonials"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Testimonials
                    </a>
                </nav>
                <div className="flex items-center gap-4">
                    <Link
                        to="/login"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Login
                    </Link>
                    <Button asChild variant="outline">
                        <Link to="/register">Register</Link>
                    </Button>
                    <Button asChild>
                        <a href="/dashboard">Dashboard</a>
                    </Button>
                </div>
            </div>
        </header>
        <main className="container @container m-auto flex flex-col flex-1 items-center justify-center py-6 md:py-12 lg:py-16 xl:py-24">
            {children}
        </main>
        <footer className="w-full border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-sm text-muted-foreground">© 2025 ProductSphere. All rights reserved.</p>
                <div className="flex gap-4">
                    <a href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                        Terms
                    </a>
                    <a href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                        Privacy
                    </a>
                    <a href="/contact" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    </div>;
}
