import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="/" className="font-semibold text-xl">
              ProductSphere
            </a>
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
            <a
              href="/login"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Login
            </a>
            <Button asChild variant="outline">
              <a href="/register">Register</a>
            </Button>
            <Button asChild>
              <a href="/dashboard">Dashboard</a>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Streamline Your Workflow
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our platform helps teams collaborate efficiently, track progress, and deliver projects on time.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <a href="/register">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="lg">
                    <a href="#demo">Watch Demo</a>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 p-6 shadow-lg">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    Dashboard Preview
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides all the tools you need to manage your projects efficiently.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              {[
                {
                  title: "Task Management",
                  description: "Create, assign, and track tasks with ease.",
                },
                {
                  title: "Team Collaboration",
                  description: "Work together seamlessly with real-time updates.",
                },
                {
                  title: "Analytics Dashboard",
                  description: "Get insights into your team's performance.",
                },
                {
                  title: "File Sharing",
                  description: "Share and manage documents in one place.",
                },
                {
                  title: "Automated Workflows",
                  description: "Set up automations to save time and reduce errors.",
                },
                {
                  title: "Mobile Access",
                  description: "Access your projects from anywhere, anytime.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <CheckCircle2 className="h-6 w-6 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-center text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">Pricing</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that's right for you and your team.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              {[
                {
                  title: "Starter",
                  price: "$9",
                  description: "Perfect for individuals and small teams.",
                  features: ["Up to 5 users", "Basic task management", "1GB storage", "Email support"],
                },
                {
                  title: "Professional",
                  price: "$29",
                  description: "Ideal for growing teams with more needs.",
                  features: [
                    "Up to 20 users",
                    "Advanced task management",
                    "10GB storage",
                    "Priority support",
                    "Custom workflows",
                  ],
                },
                {
                  title: "Enterprise",
                  price: "$99",
                  description: "For large organizations with complex requirements.",
                  features: [
                    "Unlimited users",
                    "Advanced analytics",
                    "Unlimited storage",
                    "24/7 support",
                    "Custom integrations",
                    "Dedicated account manager",
                  ],
                },
              ].map((plan, index) => (
                <div key={index} className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                  <h3 className="text-xl font-bold">{plan.title}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                  <p className="mt-2 text-muted-foreground">{plan.description}</p>
                  <ul className="mt-4 space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-gray-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-6">Get Started</Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Customers Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don't just take our word for it. Here's what our customers have to say.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              {[
                {
                  quote:
                    "This platform has completely transformed how our team works together. We're more efficient than ever.",
                  author: "Sarah Johnson",
                  role: "Project Manager, TechCorp",
                },
                {
                  quote:
                    "The analytics dashboard gives us insights we never had before. It's been a game-changer for our decision-making.",
                  author: "Michael Chen",
                  role: "CTO, StartupX",
                },
                {
                  quote:
                    "Customer support is exceptional. Any issues we've had were resolved quickly and professionally.",
                  author: "Emily Rodriguez",
                  role: "Operations Director, GrowthCo",
                },
                {
                  quote:
                    "We've reduced our project delivery time by 30% since implementing this solution. Highly recommended!",
                  author: "David Kim",
                  role: "Product Lead, InnovateInc",
                },
              ].map((testimonial, index) => (
                <div key={index} className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                  <blockquote className="flex-1 text-lg font-medium italic text-muted-foreground">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="mt-4">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of teams already using our platform to improve their workflow.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <a href="/register">
                    Sign Up Now <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="lg">
                  <a href="/contact">Contact Sales</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
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
    </div>
  )
}
