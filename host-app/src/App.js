import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PageContainer from './components/PageContainer';
import './index.css';

import Dashboard from './components/Dashboard';

// Lazy load Widgets directly instead of full Apps
const ChatWidget = React.lazy(() => import('chat/ChatWidget').catch(() => ({ default: () => <div className="p-4 text-red-500">Chat Widget Unavailable</div> })));
const EmailWidget = React.lazy(() => import('email/EmailWidget').catch(() => ({ default: () => <div className="p-4 text-red-500">Email Widget Unavailable</div> })));
const GlassCard = React.lazy(() => import('./components/GlassCard').then(module => ({ default: module.default })));

// Home Component - Updated to use standard styling primitives but custom layout
const Home = () => (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300">
        <div className="fixed inset-0 z-0 pointer-events-none">
            {/* Re-using Background3D via PageContainer concept or directly if needed, but keeping simple for now */}
            <React.Suspense fallback={null}>
                {React.createElement(React.lazy(() => import('./components/Background3D')))}
            </React.Suspense>
        </div>
        <div className="relative z-10 text-center max-w-4xl px-6 animate-in zoom-in-95 duration-500">
            <h1 className="text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                Micro-Frontend POC
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                Experience the power of dashboard created using micro-frontend architecture by Paras Sharma.
            </p>
            <div className="flex gap-4 justify-center">
                <Link
                    to="/dashboard"
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
                >
                    Go to Dashboard
                </Link>
                <Link
                    to="/chat"
                    className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-white rounded-xl font-bold text-lg shadow-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:scale-105 active:scale-95"
                >
                    Open Chat
                </Link>
            </div>
        </div>
    </div>
);

// Wrapper for Chat Page to center the widget
const ChatPage = () => (
    <PageContainer title="Chat Application">
        <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-2xl h-[75vh]">
                <Suspense fallback={<div>Loading GlassCard...</div>}>
                    <GlassCard title="Support Chat" className="h-full">
                        <div className="h-full flex flex-col">
                            <div className="flex-1 overflow-hidden">
                                <ChatWidget />
                            </div>
                        </div>
                    </GlassCard>
                </Suspense>
            </div>
        </div>
    </PageContainer>
);

// Wrapper for Email Page
const EmailPage = () => (
    <PageContainer title="Email Application">
        <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-2xl h-[75vh]">
                <Suspense fallback={<div>Loading GlassCard...</div>}>
                    <GlassCard title="All Mails" className="h-full">
                        <div className="h-full flex flex-col">
                            <div className="flex-1 overflow-hidden">
                                <EmailWidget />
                            </div>
                        </div>
                    </GlassCard>
                </Suspense>
            </div>
        </div>
    </PageContainer>
);

const App = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background text-foreground">Loading App...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* Dashboard manages its own layout, but we could wrap it later if needed. For now keeping as is but ensuring tokens match */}
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* Consolidated layouts for standalone pages */}
                    <Route path="/chat/*" element={<ChatPage />} />
                    <Route path="/email/*" element={<EmailPage />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;
