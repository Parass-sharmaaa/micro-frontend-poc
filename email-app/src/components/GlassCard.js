import React from 'react';

const GlassCard = ({ children, className = '', title, icon: Icon, action, noPadding = false }) => {
    return (
        <div className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 ring-1 ring-slate-900/5 dark:ring-white/10 flex flex-col ${className}`}>
            {(title || Icon) && (
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        {Icon && (
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                <Icon size={20} />
                            </div>
                        )}
                        {title && <h3 className="font-bold text-slate-800 dark:text-white">{title}</h3>}
                    </div>
                    {action}
                </div>
            )}
            <div className={`flex-1 overflow-auto relative ${noPadding ? 'p-0' : 'p-6'}`}>
                {children}
            </div>
        </div>
    );
};

export default GlassCard;
