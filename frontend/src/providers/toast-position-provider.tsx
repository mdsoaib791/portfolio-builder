"use client";

import { Toaster } from "@/components/ui/toaster";
import { ToastPosition } from "@/config/toast.config";
import { createContext, useContext, useState, ReactNode } from "react";

interface ToastPositionContextType {
    position: ToastPosition;
    setPosition: (position: ToastPosition) => void;
    limit: number;
    setLimit: (limit: number) => void;
    removeDelay: number;
    setRemoveDelay: (delay: number) => void;
}

const ToastPositionContext = createContext<ToastPositionContextType | undefined>(undefined);

export function ToastPositionProvider({ children }: { children: ReactNode }) {
    const [position, setPosition] = useState<ToastPosition>('top-right');
    const [limit, setLimit] = useState(3);
    const [removeDelay, setRemoveDelay] = useState(5000);

    return (
        <ToastPositionContext.Provider value={{
            position,
            setPosition,
            limit,
            setLimit,
            removeDelay,
            setRemoveDelay
        }}>
            {children}
            <Toaster position={position} limit={limit} removeDelay={removeDelay} />
        </ToastPositionContext.Provider>
    );
}

export function useToastPosition() {
    const context = useContext(ToastPositionContext);
    if (context === undefined) {
        throw new Error('useToastPosition must be used within a ToastPositionProvider');
    }
    return context;
}
