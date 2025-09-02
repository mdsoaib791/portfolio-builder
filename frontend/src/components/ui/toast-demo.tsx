"use client";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { ToastPosition } from "@/config/toast.config";
import { useEnhancedToast } from "@/hooks/use-enhanced-toast";
import { useState } from "react";

interface ToastDemoProps {
    currentPosition?: ToastPosition;
    onPositionChange?: (position: ToastPosition) => void;
}

const positions: { value: ToastPosition; label: string }[] = [
    { value: 'top-left', label: 'Top Left' },
    { value: 'top-center', label: 'Top Center' },
    { value: 'top-right', label: 'Top Right' },
    { value: 'bottom-left', label: 'Bottom Left' },
    { value: 'bottom-center', label: 'Bottom Center' },
    { value: 'bottom-right', label: 'Bottom Right' },
];

export function ToastDemo({ currentPosition = 'top-right', onPositionChange }: ToastDemoProps) {
    const [selectedPosition, setSelectedPosition] = useState<ToastPosition>(currentPosition);
    const { success, error, info } = useEnhancedToast();

    const handlePositionChange = (value: ToastPosition) => {
        setSelectedPosition(value);
        onPositionChange?.(value);
    };

    const showTestToast = () => {
        success(
            'Test Toast',
            `Toast positioned at ${positions.find(p => p.value === selectedPosition)?.label}`
        );
    };

    const showErrorToast = () => {
        error(
            'Error Toast',
            'This is an error message example'
        );
    };

    const showInfoToast = () => {
        info(
            'Info Toast',
            'This is an informational message'
        );
    };

    return (
        <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="text-lg font-semibold">Toast Configuration</h3>

            <div className="space-y-2">
                <label className="text-sm font-medium">Toast Position</label>
                <Select value={selectedPosition} onValueChange={handlePositionChange}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                        {positions.map((position) => (
                            <SelectItem key={position.value} value={position.value}>
                                {position.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex gap-2 flex-wrap">
                <Button onClick={showTestToast} variant="default" size="sm">
                    Show Success Toast
                </Button>
                <Button onClick={showErrorToast} variant="destructive" size="sm">
                    Show Error Toast
                </Button>
                <Button onClick={showInfoToast} variant="outline" size="sm">
                    Show Info Toast
                </Button>
            </div>
        </div>
    );
}
