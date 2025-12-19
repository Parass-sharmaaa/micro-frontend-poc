import React from 'react';

const Button = ({ children, variant = 'primary', size = 'md', onClick, className = '', ...props }) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 active:translate-y-[1px] disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:shadow-blue-500/30",
        secondary: "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700",
        danger: "bg-gradient-to-br from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800",
        ghost: "bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs rounded-md",
        md: "px-5 py-2.5 text-sm",
        lg: "px-6 py-3 text-base"
    };

    const combinedClassName = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

    return (
        <button
            className={combinedClassName}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
