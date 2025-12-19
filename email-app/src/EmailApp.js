import React, { Suspense } from 'react';
import EmailWidget from './EmailWidget';

import Background3D from './components/Background3D';
import GlassCard from './components/GlassCard';

const EmailApp = () => {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading Application...</div>}>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative overflow-hidden flex items-center justify-center p-4">
                <Background3D />
                <div className="relative z-10 w-full max-w-2xl h-[75vh]">
                    <GlassCard title="Email Client" className="h-full">
                        <div className="h-full flex flex-col">
                            <div className="flex-1 overflow-hidden">
                                <EmailWidget />
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </Suspense>
    );
};

export default EmailApp;
