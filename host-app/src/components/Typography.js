import React from 'react';

export const Heading = ({ children, level = 1, className = '' }) => {
    const Tag = `h${level}`;
    const baseClasses = {
        1: 'text-4xl font-extrabold tracking-tight',
        2: 'text-3xl font-bold tracking-tight',
        3: 'text-2xl font-bold',
        4: 'text-xl font-bold',
    };
    return (
        <Tag className={`${baseClasses[level] || baseClasses[1]} text-slate-900 dark:text-white ${className}`}>
            {children}
        </Tag>
    );
};

export const Text = ({ children, className = '' }) => (
    <p className={`text-slate-600 dark:text-slate-400 leading-relaxed ${className}`}>
        {children}
    </p>
);

export default { Heading, Text };
