'use client';

import { useCallback, useMemo } from 'react';

import { usePathname } from 'next/navigation';

// Define types for the nav items
interface SubItem {
    path: string;
}

interface NavItem {
    path: string;
    subItems?: SubItem[];
}

const useActiveNav = (navItems: NavItem[]): string[] => {
    const pathname = usePathname();

    // Function to determine active navigation paths
    const getActiveNav = useCallback(() => {
        const active: string[] = [];

        navItems.forEach((item) => {
            // Check if the current path starts with the item's path
            if (pathname.startsWith(item.path)) {
                active.push(item.path); // Mark the parent item as active

                // Check if any sub-items are active
                const hasActiveSubItem = item.subItems?.some(subItem => pathname.startsWith(subItem.path));

                // If there are active sub-items, do not mark the sub-items separately
                if (hasActiveSubItem) {
                    // You can add any additional logic here if needed
                }
            }
        });

        return active;
    }, [pathname, navItems]);

    // Memoize the result to prevent unnecessary recalculations
    return useMemo(() => getActiveNav(), [getActiveNav]);
};

export default useActiveNav;
