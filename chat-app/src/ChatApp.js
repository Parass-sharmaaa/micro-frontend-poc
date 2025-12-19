import React, { Suspense } from 'react';
import ChatWidget from './ChatWidget';

import Background3D from './components/Background3D';
import GlassCard from './components/GlassCard';

const ChatApp = () => {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-500">Loading Application...</div>}>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative overflow-hidden flex items-center justify-center p-4">
                {/* 3D Background from Host */}
                <div className="absolute inset-0 z-0">
                    <Background3D />
                </div>

                {/* Fixed Center Container with constrained width and height */}
                <div
                    className="relative z-10 w-full max-w-2xl"
                    style={{ height: '75vh', minHeight: '500px' }}
                >
                    <GlassCard title="Support Chat" className="h-full">
                        <div className="h-full flex flex-col">
                            <div className="flex-1 overflow-hidden">
                                <ChatWidget />
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </Suspense>
    );
};

export default ChatApp;
