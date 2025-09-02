'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Save, Upload, User } from 'lucide-react'
import { useState } from 'react'

export default function ProfileForm() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        title: 'Senior Full Stack Developer',
        bio: 'Passionate software developer with 5+ years of experience in building modern web applications. Specializing in React, Next.js, and Node.js.',
        location: 'San Francisco, CA',
        website: 'https://johndoe.dev',
        linkedin: 'https://linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // TODO: Replace with actual API call
            console.log('Updating profile:', formData)

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Show success message
            console.log('Profile updated successfully!')
        } catch (error) {
            console.error('Error updating profile:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">


            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                        Update your personal information and contact details.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Profile Picture */}
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="/api/placeholder/150/150" alt="Profile" />
                                <AvatarFallback>
                                    <User className="h-8 w-8" />
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <Button type="button" variant="outline" size="sm">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Photo
                                </Button>
                                <p className="text-xs text-muted-foreground mt-1">
                                    JPG, PNG or GIF. Max size 2MB.
                                </p>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="John"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="title">Professional Title</Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="e.g., Senior Full Stack Developer"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                placeholder="Tell us about yourself..."
                                rows={4}
                            />
                        </div>

                        {/* Contact Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                placeholder="San Francisco, CA"
                            />
                        </div>

                        {/* Social Links */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium">Social Links</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="website">Website</Label>
                                    <Input
                                        id="website"
                                        name="website"
                                        type="url"
                                        value={formData.website}
                                        onChange={handleInputChange}
                                        placeholder="https://yourwebsite.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="linkedin">LinkedIn</Label>
                                    <Input
                                        id="linkedin"
                                        name="linkedin"
                                        type="url"
                                        value={formData.linkedin}
                                        onChange={handleInputChange}
                                        placeholder="https://linkedin.com/in/yourprofile"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="github">GitHub</Label>
                                <Input
                                    id="github"
                                    name="github"
                                    type="url"
                                    value={formData.github}
                                    onChange={handleInputChange}
                                    placeholder="https://github.com/yourusername"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="min-w-32"
                            >
                                {loading ? (
                                    <>
                                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
