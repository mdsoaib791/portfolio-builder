'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface WorkExperienceFilterProps {
    onCompanyNameChange: (value: string) => void;
    onPositionChange: (value: string) => void;
    onLocationChange: (value: string) => void;
    resetForm: () => void;
}

export default function WorkExperienceFilter({
    onCompanyNameChange,
    onPositionChange,
    onLocationChange,
    resetForm,
}: WorkExperienceFilterProps) {
    return (
        <div className="space-y-4 p-4 border rounded-lg bg-card">
            <div className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                <h3 className="font-medium">Filter Work Experience</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <Input
                        placeholder="Search by company name..."
                        onChange={(e) => onCompanyNameChange(e.target.value)}
                    />
                </div>
                <div>
                    <Input
                        placeholder="Search by position..."
                        onChange={(e) => onPositionChange(e.target.value)}
                    />
                </div>
                <div>
                    <Input
                        placeholder="Search by location..."
                        onChange={(e) => onLocationChange(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={resetForm}>
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                </Button>
            </div>
        </div>
    );
}
