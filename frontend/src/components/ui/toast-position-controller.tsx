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
import { useToastPosition } from "@/providers/toast-position-provider";

const positions: { value: ToastPosition; label: string }[] = [
    { value: 'top-left', label: 'Top Left' },
    { value: 'top-center', label: 'Top Center' },
    { value: 'top-right', label: 'Top Right' },
    { value: 'bottom-left', label: 'Bottom Left' },
    { value: 'bottom-center', label: 'Bottom Center' },
    { value: 'bottom-right', label: 'Bottom Right' },
];

export function ToastPositionController() {
    const { position, setPosition } = useToastPosition();
    const { success, error, info } = useEnhancedToast();

    const showTestToast = () => {
        success(
            'Position Updated!',
            `Toasts will now appear at ${positions.find(p => p.value === position)?.label}`
        );
    };

    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Toast Position:</label>
                <Select value={position} onValueChange={(value: ToastPosition) => setPosition(value)}>
                    <SelectTrigger className="w-40">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {positions.map((pos) => (
                            <SelectItem key={pos.value} value={pos.value}>
                                {pos.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Button onClick={showTestToast} size="sm">
                Test Position
            </Button>
        </div>
    );
}
