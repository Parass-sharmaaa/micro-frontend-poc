import React, { useState, useEffect, useRef, Suspense } from 'react';

// Local Imports
import Button from './components/Button';
import Input from './components/Input';

const ChatWidget = () => {
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem('chat:messages');
        return saved ? JSON.parse(saved) : [
            { id: 1, text: 'Hello! I am the developer. How can I help you today?', sender: 'Developer' },
            { id: 2, text: 'I am testing the new WhatsApp styling!', sender: 'You' },
        ];
    });
    const [newMessage, setNewMessage] = useState('');
    const scrollRef = useRef(null);

    // Persist messages
    useEffect(() => {
        localStorage.setItem('chat:messages', JSON.stringify(messages));
        // Auto scroll to bottom
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (newMessage.trim()) {
            const newMsg = { id: Date.now(), text: newMessage, sender: 'You' };
            setMessages(prev => [...prev, newMsg]);
            setNewMessage('');
        }
    };

    const handleDeveloperReply = () => {
        const replies = [
            "That looks great!",
            "I'm working on the email section next.",
            "Thanks for the feedback!",
            "Checking the logs now...",
            "The micro-frontend architecture is quite flexible."
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        const replyMsg = { id: Date.now(), text: randomReply, sender: 'Developer' };
        setMessages(prev => [...prev, replyMsg]);
    };

    const handleEmailTranscript = () => {
        localStorage.setItem('chat:transcript', JSON.stringify(messages));
        const event = new CustomEvent('chat:email-transcript', {
            detail: { messages },
        });
        window.dispatchEvent(event);
        alert('Transcript ready! Head over to the Email application to send it.');
    };

    return (
        <Suspense fallback={<div className="p-4 text-slate-500 animate-pulse">Loading Chat Components...</div>}>
            <div className="flex flex-col h-full bg-transparent overflow-hidden" style={{ height: '100%' }}>
                {/* Scrollable Message Area */}
                <div
                    ref={scrollRef}
                    className="flex-1 p-4 space-y-4 scroll-smooth"
                    style={{
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        maxHeight: 'calc(100% - 130px)',
                        minHeight: '0',
                    }}
                >
                    {messages.map((msg) => {
                        const isMe = msg.sender === 'You';
                        return (
                            <div
                                key={msg.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: isMe ? 'flex-end' : 'flex-start',
                                    width: '100%',
                                    marginBottom: '1rem'
                                }}
                            >
                                <div
                                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl shadow-sm relative transition-all hover:shadow-md ${isMe
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-none'
                                        }`}
                                >
                                    {!isMe && (
                                        <div className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-50 text-blue-600 dark:text-blue-400">
                                            {msg.sender}
                                        </div>
                                    )}
                                    <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.text}</div>
                                    <div className={`text-[9px] mt-1 opacity-40 text-right ${isMe ? 'text-blue-100' : 'text-slate-500'}`}>
                                        {new Date(msg.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Fixed Footer Area - Height roughly 130px */}
                <div
                    className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md"
                    style={{ flexShrink: 0 }}
                >



                    <div className="flex gap-2 items-center mb-3">
                        <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type a message..."
                            className="flex-1"
                        />
                        <Button
                            onClick={handleSend}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white shrink-0 h-9 px-6 rounded-xl font-semibold shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                        >
                            Send
                        </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleEmailTranscript}
                            className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700"
                        >
                            Export Transcript
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleDeveloperReply}
                            className="bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-lg border border-indigo-100 dark:border-indigo-800/50"
                        >
                            Simulate Reply
                        </Button>
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default ChatWidget;
