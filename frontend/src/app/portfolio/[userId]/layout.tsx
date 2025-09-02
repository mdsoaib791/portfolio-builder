"use client";

import React from 'react';

export default function PortfolioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="portfolio-container">
            {children}
        </div>
    );
}
