import React from 'react';
import Background3D from './Background3D';
import Navbar from './Navbar';

const PageContainer = ({ children, title }) => {
    return (
        <div className="min-h-screen bg-background flex flex-col relative overflow-hidden transition-colors duration-300">
            {/* Shared Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Background3D />
            </div>

            {/* Navbar - Sticky at top */}
            <Navbar />

            {/* Scrollable Content Area */}
            <div className="flex-1 relative z-10 flex flex-col pt-4 pb-6 px-4 md:px-8 overflow-y-auto">
                <div className="w-full max-w-7xl mx-auto flex flex-col h-full">
                    {title && (
                        <div className="mb-4 animate-in fade-in slide-in-from-top-4 duration-500">
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                                {title}
                            </h1>
                        </div>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PageContainer;
