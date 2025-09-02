'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Calendar, MapPin, User } from 'lucide-react';
import { useGetWorkExperienceById } from '@/hooks/services-hook/use-work-experience.service.hook';
import { WorkExperienceDto } from '@/dtos/work-experience-dto';
import moment from 'moment';

interface ViewWorkExperienceProps {
    id: number;
    isOpen: boolean;
    onClose: (isRefresh?: boolean) => void;
}

export default function ViewWorkExperience({ id, isOpen, onClose }: ViewWorkExperienceProps) {
    const [workExperience, setWorkExperience] = useState<WorkExperienceDto | null>(null);
    const getWorkExperienceById = useGetWorkExperienceById(id, isOpen && id > 0);

    useEffect(() => {
        if (getWorkExperienceById.status === 'success' && getWorkExperienceById.data?.data?.data) {
            setWorkExperience(getWorkExperienceById.data.data.data);
        }
    }, [getWorkExperienceById.status, getWorkExperienceById.data?.data?.data]);

    const formatDate = (date: string | Date | null | undefined) => {
        if (!date) return 'Present';
        return moment(date).format('MMMM YYYY');
    };

    const calculateDuration = (startDate: string | Date, endDate: string | Date | null | undefined) => {
        const start = moment(startDate);
        const end = endDate ? moment(endDate) : moment();

        const duration = moment.duration(end.diff(start));
        const years = Math.floor(duration.asYears());
        const months = Math.floor(duration.asMonths()) % 12;

        let result = '';
        if (years > 0) result += `${years} year${years > 1 ? 's' : ''}`;
        if (months > 0) {
            if (result) result += ' ';
            result += `${months} month${months > 1 ? 's' : ''}`;
        }

        return result || 'Less than a month';
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Work Experience Details</DialogTitle>
                    <DialogDescription>
                        View detailed information about this work experience entry
                    </DialogDescription>
                </DialogHeader>

                {getWorkExperienceById.isLoading ? (
                    <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-muted rounded w-1/3"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                        <div className="space-y-2">
                            <div className="h-3 bg-muted rounded w-full"></div>
                            <div className="h-3 bg-muted rounded w-3/4"></div>
                            <div className="h-3 bg-muted rounded w-1/2"></div>
                        </div>
                    </div>
                ) : workExperience ? (
                    <div className="space-y-6">
                        {/* Main Information */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2">
                                        <CardTitle className="text-xl">{workExperience.position}</CardTitle>
                                        <CardDescription className="flex items-center gap-2 text-base">
                                            <Building className="h-4 w-4" />
                                            {workExperience.companyName}
                                        </CardDescription>
                                    </div>
                                    {!workExperience.endDate && (
                                        <Badge variant="secondary" className="text-sm">
                                            Current Position
                                        </Badge>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Duration */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            Duration
                                        </div>
                                        <div className="text-sm">
                                            <div>{formatDate(workExperience.startDate)} - {formatDate(workExperience.endDate)}</div>
                                            <div className="text-muted-foreground">
                                                {calculateDuration(workExperience.startDate, workExperience.endDate)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    {workExperience.location && (
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                                <MapPin className="h-4 w-4" />
                                                Location
                                            </div>
                                            <div className="text-sm">{workExperience.location}</div>
                                        </div>
                                    )}

                                    {/* User ID (if needed for admin view) */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                            <User className="h-4 w-4" />
                                            User ID
                                        </div>
                                        <div className="text-sm font-mono">{workExperience.userId}</div>
                                    </div>

                                    {/* Timestamps */}
                                    <div className="space-y-2">
                                        <div className="text-sm font-medium text-muted-foreground">Record Info</div>
                                        <div className="text-xs text-muted-foreground space-y-1">
                                            <div>Created: {moment(workExperience.createdAt).format('MMM DD, YYYY')}</div>
                                            <div>Updated: {moment(workExperience.updatedAt).format('MMM DD, YYYY')}</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Description */}
                        {workExperience.description && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Job Description</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="prose prose-sm max-w-none">
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                            {workExperience.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        <Building className="mx-auto h-12 w-12 mb-4 opacity-50" />
                        <p>Work experience not found or failed to load.</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
