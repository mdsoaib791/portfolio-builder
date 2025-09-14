"use client";

import ManageProject from "@/components/dashboard/projects/add-update";
import ManageSkill from "@/components/dashboard/skills/add-update";
import ManageWorkExperience from "@/components/dashboard/work-experience/add-update";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Book, Briefcase, ChevronRight, Code, Edit, Globe, PlusCircle, Sparkles, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function DashboardPage() {
    const { currentUser, loading } = useCurrentUser();
    const [userId, setUserId] = useState<string | null>(null);


    const [showProjectModal, setShowProjectModal] = useState(false);
    const [showSkillModal, setShowSkillModal] = useState(false);
    const [showExperienceModal, setShowExperienceModal] = useState(false);
    const [showAIGenerator, setShowAIGenerator] = useState(false);

    const closeModals = () => {
        setShowProjectModal(false);
        setShowSkillModal(false);
        setShowExperienceModal(false);
        setShowAIGenerator(false);
    };



    useEffect(() => {
        if (currentUser) {
            setUserId(String(currentUser.id));
        }
    }, [currentUser]);

    return (
        <>


            {currentUser && (
                <Card className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-none">
                    <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="mb-4 md:mb-0">
                                <h2 className="text-2xl font-bold text-indigo-700 mb-2">Your Public Portfolio</h2>
                                <p className="text-gray-600">Your portfolio is live and ready to be shared with the world!</p>
                            </div>
                            <div className="flex space-x-3">
                                <Button variant="outline">
                                    <Link href={`/portfolio/${currentUser.id}`} target="_blank">
                                        <Globe className="mr-2 h-4 w-4" /> View Portfolio
                                    </Link>
                                </Button>
                                <Button>
                                    <span>Share Portfolio</span>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* AI Portfolio Generator Card */}
            {!showAIGenerator ? (
                <Card className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border-none">
                    <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="mb-4 md:mb-0">
                                <h2 className="text-2xl font-bold text-purple-700 mb-2 flex items-center gap-2">
                                    <Sparkles className="w-6 h-6" />
                                    AI Portfolio Generator
                                </h2>
                                <p className="text-gray-600">Create your entire portfolio instantly using AI - just describe yourself or upload your CV!</p>
                            </div>
                            <div className="flex space-x-3">
                                <Button onClick={() => setShowAIGenerator(true)} className="bg-purple-600 hover:bg-purple-700">
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Generate Portfolio
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <Button variant="ghost" onClick={() => setShowAIGenerator(false)}>
                            ← Back to Dashboard
                        </Button>
                    </div>

                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Dashboard Content - 2/3 width */}
                <div className="md:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Skills Card */}
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader className="bg-blue-50 rounded-t-xl">
                                <CardTitle className="flex items-center">
                                    <Code className="mr-2 h-5 w-5 text-blue-500" />
                                    Skills
                                </CardTitle>
                                <CardDescription>Manage your technical skills</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <p className="text-sm text-gray-500">Add and manage your professional skills and proficiency levels.</p>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" size="sm">
                                    <Link href="/dashboard/skills">
                                        View All
                                    </Link>
                                </Button>
                                <Button onClick={() => setShowSkillModal(true)} variant="default" size="sm" className="bg-blue-500 hover:bg-blue-600">

                                    <PlusCircle className="mr-1 h-4 w-4" /> Add New

                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Projects Card */}
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader className="bg-purple-50 rounded-t-xl">
                                <CardTitle className="flex items-center">
                                    <Book className="mr-2 h-5 w-5 text-purple-500" />
                                    Projects
                                </CardTitle>
                                <CardDescription>Showcase your best work</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <p className="text-sm text-gray-500">Add and manage your portfolio projects with descriptions and links.</p>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" size="sm">
                                    <Link href="/dashboard/projects">
                                        View All
                                    </Link>
                                </Button>
                                <Button onClick={() => setShowProjectModal(true)} variant="default" size="sm" className="bg-purple-500 hover:bg-purple-600">
                                    <PlusCircle className="mr-1 h-4 w-4" /> Add New
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Work Experience Card */}
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader className="bg-green-50 rounded-t-xl">
                                <CardTitle className="flex items-center">
                                    <Briefcase className="mr-2 h-5 w-5 text-green-500" />
                                    Work Experience
                                </CardTitle>
                                <CardDescription>Your professional journey</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <p className="text-sm text-gray-500">Add and manage your work history and professional experience.</p>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" size="sm">
                                    <Link href="/dashboard/work-experience">
                                        View All
                                    </Link>
                                </Button>
                                <Button onClick={() => setShowExperienceModal(true)} variant="default" size="sm" className="bg-green-500 hover:bg-green-600">

                                    <PlusCircle className="mr-1 h-4 w-4" /> Add New

                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* Recent Activity Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Your latest portfolio updates</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center p-3 bg-slate-50 rounded-md">
                                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                                        <Code className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium">Added new skill: React</p>
                                        <p className="text-sm text-gray-500">2 days ago</p>
                                    </div>
                                    <Button variant="ghost" size="sm" className="rounded-full">
                                        <Link href="/dashboard/skills">
                                            <ChevronRight className="h-5 w-5" />
                                        </Link>
                                    </Button>
                                </div>

                                <div className="flex items-center p-3 bg-slate-50 rounded-md">
                                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                                        <Book className="h-5 w-5 text-purple-500" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium">Updated project: Portfolio Builder</p>
                                        <p className="text-sm text-gray-500">1 week ago</p>
                                    </div>
                                    <Button variant="ghost" size="sm" className="rounded-full">
                                        <Link href="/dashboard/projects">
                                            <ChevronRight className="h-5 w-5" />
                                        </Link>
                                    </Button>
                                </div>

                                <div className="flex items-center p-3 bg-slate-50 rounded-md">
                                    <div className="bg-green-100 p-2 rounded-full mr-3">
                                        <Briefcase className="h-5 w-5 text-green-500" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium">Added work experience: Senior Developer</p>
                                        <p className="text-sm text-gray-500">2 weeks ago</p>
                                    </div>
                                    <Button variant="ghost" size="sm" className="rounded-full">
                                        <Link href="/dashboard/work-experience">
                                            <ChevronRight className="h-5 w-5" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" size="sm" className="w-full">
                                View All Activity
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Portfolio Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Portfolio Stats</CardTitle>
                            <CardDescription>Overview of your portfolio content</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <p className="text-3xl font-bold text-blue-500">8</p>
                                    <p className="text-sm font-medium">Skills</p>
                                </div>
                                <div className="p-4 bg-purple-50 rounded-lg">
                                    <p className="text-3xl font-bold text-purple-500">5</p>
                                    <p className="text-sm font-medium">Projects</p>
                                </div>
                                <div className="p-4 bg-green-50 rounded-lg">
                                    <p className="text-3xl font-bold text-green-500">3</p>
                                    <p className="text-sm font-medium">Work Experiences</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Profile Section - 1/3 width */}
                <div className="space-y-6">
                    {/* Profile Card */}
                    <Card>
                        <CardHeader className="bg-gray-50 rounded-t-xl">
                            <CardTitle className="flex items-center">
                                <User className="mr-2 h-5 w-5" />
                                Your Profile
                            </CardTitle>
                            <CardDescription>Manage your personal information</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center mb-6">
                                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center mb-4 relative">
                                    <User className="h-12 w-12 text-gray-400" />
                                    <button className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full">
                                        <Edit className="h-4 w-4" />
                                    </button>
                                </div>
                                <h3 className="text-xl font-bold">John Doe</h3>
                                <p className="text-sm text-gray-500">Senior Frontend Developer</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Email</p>
                                    <p>john.doe@example.com</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Location</p>
                                    <p>San Francisco, CA</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Website</p>
                                    <p>johndoe.dev</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">
                                <Link href="/dashboard/profile">
                                    <Edit className="mr-2 h-4 w-4" /> Update Profile
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Portfolio Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Portfolio Settings</CardTitle>
                            <CardDescription>Customize your public portfolio</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Portfolio URL</p>
                                        <p className="text-sm text-gray-500">{`/portfolio/${userId}`}</p>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Theme</p>
                                        <p className="text-sm text-gray-500">Modern Dark</p>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Layout</p>
                                        <p className="text-sm text-gray-500">Portfolio First</p>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">
                                <Link href="/dashboard/settings">
                                    All Settings
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Quick Links */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Links</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y">
                                <Link href={currentUser ? `/portfolio/${currentUser.id}` : "#"} className="flex items-center justify-between p-4 hover:bg-slate-50">
                                    <span>View Public Portfolio</span>
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                </Link>
                                <Link href="/dashboard/share" className="flex items-center justify-between p-4 hover:bg-slate-50">
                                    <span>Share Portfolio</span>
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                </Link>
                                <Link href="/dashboard/export" className="flex items-center justify-between p-4 hover:bg-slate-50">
                                    <span>Export as PDF</span>
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <ManageProject
                id={0}
                isOpen={showProjectModal}
                onClose={closeModals}
                onSuccess={closeModals}
            />
            <ManageSkill
                id={0}
                isOpen={showSkillModal}
                onClose={closeModals}
                onSuccess={closeModals}
            />
            <ManageWorkExperience
                id={0}
                isOpen={showExperienceModal}
                onClose={closeModals}
                onSuccess={closeModals}
            />
        </>
    );
}

export default DashboardPage;
