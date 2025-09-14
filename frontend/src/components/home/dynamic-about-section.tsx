"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { PortfolioData } from "@/contexts/portfolio-context";

interface DynamicAboutSectionProps {
    portfolioData: PortfolioData;
}

export function DynamicAboutSection({ portfolioData }: DynamicAboutSectionProps) {
    const { user } = portfolioData;

    return (
        <section id="about" className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="rounded-2xl mb-8 md:mb-0 flex items-center justify-center">
                        <Image
                            src={user?.profilePicture || "/images/about-image.png"}
                            alt={`${user?.fullName || 'User'} profile picture`}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">About {user?.fullName || 'Me'}</h2>
                        
                        <p className="text-muted-foreground mb-4">
                            {user?.userName ? `@${user.userName}` : ''}
                        </p>
                        
                        <p className="text-muted-foreground mb-4">
                            Professional with expertise in various technologies and tools. Committed to delivering high-quality solutions and constantly improving skills.
                        </p>
                        
                        <p className="text-muted-foreground mb-6">
                            Looking for opportunities to collaborate on interesting projects and contribute to innovative solutions.
                        </p>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Contact Information</h3>
                            <div className="space-y-2">
                                {user?.email && (
                                    <p className="text-muted-foreground">
                                        <span className="font-medium">Email:</span> {user.email}
                                    </p>
                                )}
                                {user?.phoneNumber && (
                                    <p className="text-muted-foreground">
                                        <span className="font-medium">Phone:</span> {user.phoneNumber}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
