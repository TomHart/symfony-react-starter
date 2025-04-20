import React from 'react'
import {
  BarChart,
  Calendar,
  ChevronDown,
  Home,
  LineChart,
  MessageSquare,
  PieChart,
  Plus,
  Settings,
  Users,
  X,
} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Progress} from "@/components/ui/progress"
import {Badge} from "@/components/ui/badge"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"

export default function Dashboard(): React.JSX.Element {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
      <div className="flex flex-1">
        {/* Sidebar - Desktop */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 mt-16 hidden w-64 transform border-r bg-background transition-transform duration-300 ease-in-out md:block ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col py-4">
            <div className="px-4 py-2">
              <h2 className="text-lg font-semibold">Dashboard</h2>
            </div>
            <nav className="flex-1 space-y-1 px-2 py-4">
              {[
                { name: "Overview", icon: Home, current: true },
                { name: "Analytics", icon: BarChart, current: false },
                { name: "Projects", icon: LineChart, current: false },
                { name: "Team", icon: Users, current: false },
                { name: "Calendar", icon: Calendar, current: false },
                { name: "Messages", icon: MessageSquare, current: false },
                { name: "Reports", icon: PieChart, current: false },
                { name: "Settings", icon: Settings, current: false },
              ].map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                    item.current
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Mobile menu */}
        <div className={`fixed inset-0 z-50 md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
          <div className="fixed inset-0 bg-black/50" onClick={toggleMobileMenu}></div>
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-background p-4">
            <div className="flex items-center justify-between">
              <a href="/public" className="font-semibold text-xl">
                ProductSphere
              </a>
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="mt-4">
              <Input type="search" placeholder="Search..." className="w-full bg-background" />
            </div>
            <nav className="mt-8 space-y-1">
              {[
                { name: "Overview", icon: Home, current: true },
                { name: "Analytics", icon: BarChart, current: false },
                { name: "Projects", icon: LineChart, current: false },
                { name: "Team", icon: Users, current: false },
                { name: "Calendar", icon: Calendar, current: false },
                { name: "Messages", icon: MessageSquare, current: false },
                { name: "Reports", icon: PieChart, current: false },
                { name: "Settings", icon: Settings, current: false },
              ].map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                    item.current
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <main className={`flex-1 p-4 md:p-6 ${sidebarOpen ? "md:ml-64" : ""}`}>
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, John! Here's what's happening today.</p>
              </div>
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Last 30 days <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                    <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                    <DropdownMenuItem>Last 3 months</DropdownMenuItem>
                    <DropdownMenuItem>Last year</DropdownMenuItem>
                    <DropdownMenuItem>All time</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> New Project
                </Button>
              </div>
            </div>

            {/* Stats cards */}
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2,350</div>
                  <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+3 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">72.8%</div>
                  <p className="text-xs text-muted-foreground">+10.1% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Over Time</CardTitle>
                  <CardDescription>Monthly revenue for the past year</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <div className="h-full w-full">
                    {/* Fake chart - in a real app, you'd use a chart library */}
                    <div className="flex h-full w-full flex-col justify-end">
                      <div className="flex h-[250px] items-end gap-2">
                        {[40, 30, 45, 25, 60, 75, 65, 45, 80, 85, 90, 95].map((height, i) => (
                          <div key={i} className="relative flex w-full flex-col items-center">
                            <div className="w-full rounded-md bg-primary" style={{ height: `${height}%` }}></div>
                            <span className="mt-1 text-xs text-muted-foreground">
                              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>New users over the past 6 months</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <div className="h-full w-full">
                    {/* Fake line chart */}
                    <div className="relative h-[250px] w-full">
                      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path
                          d="M0,100 L0,60 C10,50 20,40 30,45 C40,50 50,20 60,25 C70,30 80,10 90,15 L100,5 L100,100 Z"
                          fill="rgba(147, 51, 234, 0.1)"
                          stroke="none"
                        />
                        <path
                          d="M0,60 C10,50 20,40 30,45 C40,50 50,20 60,25 C70,30 80,10 90,15 L100,5"
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="2"
                        />
                      </svg>
                      <div className="absolute bottom-0 flex w-full justify-between px-2 text-xs text-muted-foreground">
                        <span>Jul</span>
                        <span>Aug</span>
                        <span>Sep</span>
                        <span>Oct</span>
                        <span>Nov</span>
                        <span>Dec</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Projects and Tasks */}
            <div className="mt-6">
              <Tabs defaultValue="projects">
                <div className="flex items-center justify-between">
                  <TabsList>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                  </TabsList>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
                <TabsContent value="projects" className="mt-4">
                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {[
                          {
                            name: "Website Redesign",
                            progress: 75,
                            status: "In Progress",
                            members: 4,
                          },
                          {
                            name: "Mobile App Development",
                            progress: 32,
                            status: "In Progress",
                            members: 6,
                          },
                          {
                            name: "Marketing Campaign",
                            progress: 100,
                            status: "Completed",
                            members: 3,
                          },
                          {
                            name: "Database Migration",
                            progress: 48,
                            status: "In Progress",
                            members: 2,
                          },
                          {
                            name: "API Integration",
                            progress: 90,
                            status: "In Review",
                            members: 5,
                          },
                        ].map((project, i) => (
                          <div key={i} className="flex items-center justify-between p-4">
                            <div className="flex flex-col gap-1">
                              <div className="font-medium">{project.name}</div>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant={
                                    project.status === "Completed"
                                      ? "outline"
                                      : project.status === "In Review"
                                        ? "secondary"
                                        : "default"
                                  }
                                >
                                  {project.status}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{project.members} members</span>
                              </div>
                            </div>
                            <div className="flex w-1/3 flex-col gap-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">{project.progress}%</span>
                              </div>
                              <Progress value={project.progress} className="h-2" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="tasks" className="mt-4">
                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {[
                          {
                            name: "Design homepage mockup",
                            dueDate: "Today",
                            priority: "High",
                            completed: false,
                          },
                          {
                            name: "Fix navigation bug",
                            dueDate: "Tomorrow",
                            priority: "Medium",
                            completed: false,
                          },
                          {
                            name: "Write API documentation",
                            dueDate: "Yesterday",
                            priority: "Low",
                            completed: true,
                          },
                          {
                            name: "Review pull requests",
                            dueDate: "Today",
                            priority: "High",
                            completed: false,
                          },
                          {
                            name: "Update dependencies",
                            dueDate: "Next week",
                            priority: "Medium",
                            completed: false,
                          },
                        ].map((task, i) => (
                          <div key={i} className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`h-5 w-5 rounded-full border ${
                                  task.completed ? "bg-primary" : "bg-background"
                                }`}
                              ></div>
                              <div className="flex flex-col">
                                <span className={task.completed ? "text-muted-foreground line-through" : ""}>
                                  {task.name}
                                </span>
                                <span className="text-xs text-muted-foreground">Due {task.dueDate}</span>
                              </div>
                            </div>
                            <Badge
                              variant={
                                task.priority === "High"
                                  ? "destructive"
                                  : task.priority === "Medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {task.priority}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Recent Activity */}
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions across your projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {[
                      {
                        user: "John Doe",
                        action: "created a new task",
                        target: "Design System Documentation",
                        time: "2 hours ago",
                      },
                      {
                        user: "Sarah Smith",
                        action: "completed",
                        target: "Homepage Redesign",
                        time: "5 hours ago",
                      },
                      {
                        user: "Alex Johnson",
                        action: "commented on",
                        target: "API Integration Plan",
                        time: "Yesterday",
                      },
                      {
                        user: "Emily Chen",
                        action: "joined project",
                        target: "Mobile App Development",
                        time: "2 days ago",
                      },
                      {
                        user: "Michael Brown",
                        action: "updated",
                        target: "Q4 Marketing Strategy",
                        time: "3 days ago",
                      },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`/placeholder.svg?${i}`} alt={activity.user} />
                          <AvatarFallback>
                            {activity.user
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            <span className="font-semibold">{activity.user}</span> {activity.action}{" "}
                            <span className="font-semibold">{activity.target}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
  )
}
