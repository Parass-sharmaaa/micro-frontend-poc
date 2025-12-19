import React, { useState, useEffect, Suspense } from 'react';
import { Mail, Send, PenBox, Users, Info } from 'lucide-react';

// Local Imports
import Button from './components/Button';
import Input from './components/Input';

const EmailWidget = () => {
    const [activeTab, setActiveTab] = useState('inbox');
    const [inboxEmails, setInboxEmails] = useState([
        { id: 1, subject: 'Project Update', from: 'manager@company.com', body: 'The project is going well.', time: '10:30 AM' },
        { id: 2, subject: 'Meeting Notes', from: 'team@company.com', body: 'Please review the attached notes.', time: 'Yesterday' },
    ]);
    const [sentEmails, setSentEmails] = useState([]);

    // Compose State
    const [draftSubject, setDraftSubject] = useState('');
    const [draftBody, setDraftBody] = useState('');
    const [draftTo, setDraftTo] = useState('');

    useEffect(() => {
        // Load sent emails
        const savedSent = localStorage.getItem('email:sent');
        if (savedSent) {
            setSentEmails(JSON.parse(savedSent));
        }

        // Check for pending transcript in localStorage (for cross-page persistence)
        const pendingTranscript = localStorage.getItem('chat:transcript');
        if (pendingTranscript) {
            try {
                const messages = JSON.parse(pendingTranscript);
                if (messages && messages.length > 0) {
                    const transcript = messages.map(m => `${m.sender}: ${m.text}`).join('\n');
                    setDraftSubject('Chat Transcript');
                    setDraftBody(transcript);
                    setActiveTab('compose');
                    // Clear it so it doesn't re-populate on every mount
                    localStorage.removeItem('chat:transcript');
                }
            } catch (e) {
                console.error("Failed to parse pending transcript", e);
            }
        }

        // Handle Chat Transcript live event (for dashboard view)
        const handleChatTranscript = (event) => {
            if (event.detail && event.detail.messages) {
                const transcript = event.detail.messages.map(m => `${m.sender}: ${m.text}`).join('\n');
                setDraftSubject('Chat Transcript');
                setDraftBody(transcript);
                setActiveTab('compose');
            }
        };

        window.addEventListener('chat:email-transcript', handleChatTranscript);
        return () => window.removeEventListener('chat:email-transcript', handleChatTranscript);
    }, []);

    const handleSend = () => {
        if (!draftSubject && !draftBody) return;
        const newEmail = {
            id: Date.now(),
            subject: draftSubject,
            to: draftTo || 'recipient@example.com',
            body: draftBody,
            date: new Date().toLocaleString(),
            time: 'Just now'
        };

        const updatedSent = [newEmail, ...sentEmails];
        setSentEmails(updatedSent);
        localStorage.setItem('email:sent', JSON.stringify(updatedSent));

        setDraftSubject('');
        setDraftBody('');
        setDraftTo('');
        setActiveTab('sent');
        alert('Email Sent Successfully!');
    };

    const tabs = [
        { id: 'inbox', label: 'Inbox' },
        { id: 'sent', label: 'Sent' },
        { id: 'compose', label: 'Compose' }
    ];

    return (
        <Suspense fallback={<div className="p-4 text-slate-500 animate-pulse">Loading Email Components...</div>}>
            <div className="flex flex-col h-full bg-transparent overflow-hidden">
                {/* Slim & Minimal Tab Bar */}
                <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 px-4">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 flex items-center justify-center py-2.5 transition-all duration-200 relative group
                                    hover:bg-slate-100 dark:hover:bg-slate-800/60`}
                            >
                                <span className={`text-sm font-semibold transition-colors duration-200 ${isActive
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-slate-600 dark:text-slate-400'
                                    }`}>
                                    {tab.label}
                                </span>
                                {isActive && (
                                    <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Content Area - Unified px-6 Padding */}
                <div className="flex-1 overflow-hidden h-full flex flex-col">
                    {activeTab === 'inbox' && (
                        <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-4 ">
                            {inboxEmails.map(email => (
                                <div key={email.id} className="group p-4 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-800/40 hover:border-blue-300 dark:hover:border-blue-900 shadow-sm hover:shadow-md transition-all cursor-pointer">
                                    <div className="flex justify-between items-start mb-1">
                                        <div className="font-bold text-slate-800 dark:text-slate-100">{email.from}</div>
                                        <div className="text-[10px] font-medium text-slate-400">{email.time}</div>
                                    </div>
                                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">{email.subject}</div>
                                    <div className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{email.body}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'sent' && (
                        <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-4">
                            {sentEmails.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-2 opacity-60">
                                    <div className="text-sm font-medium">No sent messages yet</div>
                                </div>
                            ) : (
                                sentEmails.map(email => (
                                    <div key={email.id} className="p-4 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-800/40 shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-800/60">
                                        <div className="flex justify-between items-start mb-1">
                                            <div className="font-bold text-slate-800 dark:text-slate-100 italic">To: {email.to}</div>
                                            <div className="text-[10px] font-medium text-slate-400">{email.time}</div>
                                        </div>
                                        <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">{email.subject}</div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{email.body}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {activeTab === 'compose' && (
                        <div className="flex-1 flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 duration-300 overflow-hidden">
                            <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-4 flex flex-col">
                                <Input
                                    placeholder="To: recipient@example.com"
                                    value={draftTo}
                                    onChange={(e) => setDraftTo(e.target.value)}
                                    className="w-full"
                                />
                                <Input
                                    placeholder="Subject"
                                    value={draftSubject}
                                    onChange={(e) => setDraftSubject(e.target.value)}
                                    className="w-full font-semibold"
                                />
                                <textarea
                                    className="flex-1 w-half p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-2xl min-h-[150px] focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none shadow-inner"
                                    placeholder="Write your message here..."
                                    value={draftBody}
                                    onChange={(e) => setDraftBody(e.target.value)}
                                />
                            </div>
                            <div
                                className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md"
                                style={{ flexShrink: 0 }}
                            >
                                <div className="flex gap-2 justify-end items-end mb-10">
                                    <Button
                                        onClick={handleSend}
                                        size="sm"
                                        className="bg-blue-600 hover:bg-blue-700 text-white shrink-0 h-9 px-6 rounded-xl font-semibold shadow-lg shadow-blue-500/20 active:scale-95 transition-all align-right"
                                    >
                                        Send Email
                                    </Button>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </Suspense>
    );
};

export default EmailWidget;
{/* Fixed Footer Area - Height roughly 130px */ }
