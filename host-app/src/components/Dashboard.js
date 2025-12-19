import React, { Suspense } from 'react';
import { Activity, Mail, MessageSquare, Zap } from 'lucide-react';
import PageContainer from './PageContainer';
import GlassCard from './GlassCard';

// Lazy load remotes
const ChatWidget = React.lazy(() => import('chat/ChatWidget').catch(() => ({ default: () => <div className="p-4 text-red-500">Chat Widget Unavailable</div> })));
const EmailWidget = React.lazy(() => import('email/EmailWidget').catch(() => ({ default: () => <div className="p-4 text-red-500">Email Widget Unavailable</div> })));

const StatCard = ({ icon: Icon, title, value, change, color }) => (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group ring-1 ring-slate-900/5 dark:ring-white/5 flex items-center gap-3">
        <div className={`p-2 rounded-lg ${color} bg-opacity-10 dark:bg-opacity-20`}>
            <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div className="flex-1 min-w-0">
            <h3 className="text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs font-medium truncate">{title}</h3>
            <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-white leading-tight">{value}</p>
        </div>
        {change !== undefined && (
            <span className={`text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${change >= 0
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                {change > 0 ? '+' : ''}{change}%
            </span>
        )}
    </div>
);

const Dashboard = () => {
    return (
        <PageContainer title="Dashboard">
            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <StatCard
                    icon={Activity}
                    title="Total Activity"
                    value="1,284"
                    change={12.5}
                    color="bg-blue-500"
                />
                <StatCard
                    icon={MessageSquare}
                    title="New Messages"
                    value="342"
                    change={8.2}
                    color="bg-green-500"
                />
                <StatCard
                    icon={Mail}
                    title="Unread Emails"
                    value="12"
                    change={-2.4}
                    color="bg-orange-500"
                />
                <StatCard
                    icon={Zap}
                    title="System Uptime"
                    value="99.9%"
                    change={0}
                    color="bg-purple-500"
                />
            </div>

            {/* Micro-Frontends Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 flex-1 min-h-0">
                {/* Chat Application Container */}
                <GlassCard
                    className="h-[450px] sm:h-[550px]"
                    title="Chat"
                    icon={MessageSquare}
                    noPadding={true}
                    action={
                        <span className="flex h-3 w-3 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                    }
                >
                    <Suspense fallback={
                        <div className="flex items-center justify-center h-full w-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                        </div>
                    }>
                        <div className="h-full flex flex-col">
                            <div className="flex-1 overflow-hidden">
                                <ChatWidget />
                            </div>
                        </div>
                    </Suspense>
                </GlassCard>

                {/* Email Application Container */}
                <GlassCard
                    className="h-[450px] sm:h-[550px]"
                    title="Email"
                    icon={Mail}
                    noPadding={true}
                >
                    <Suspense fallback={
                        <div className="flex items-center justify-center h-full w-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                        </div>
                    }>
                        <div className="h-full flex flex-col">
                            <div className="flex-1 overflow-hidden">
                                <EmailWidget />
                            </div>
                        </div>
                    </Suspense>
                </GlassCard>
            </div>
        </PageContainer>
    );
};

export default Dashboard;
