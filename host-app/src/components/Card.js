import React from 'react';

const Card = ({ children, title, className = '' }) => {
    return (
        <div className={`border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-slate-100 ${className}`}>
            {title && <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">{title}</h3>}
            {children}
        </div>
    );
};

export default Card;
