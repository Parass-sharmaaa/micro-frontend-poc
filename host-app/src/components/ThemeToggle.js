import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check if dark mode is already set
        if (typeof window !== 'undefined') {
            return document.documentElement.classList.contains('dark');
        }
        return true; // Default to dark mode
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <div className="flex items-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <Sun className={`w-4 h-4 transition-colors ${isDarkMode ? 'text-slate-400' : 'text-amber-500'}`} />
            <Switch
                id="theme-toggle"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
            />
            <Moon className={`w-4 h-4 transition-colors ${isDarkMode ? 'text-violet-400' : 'text-slate-400'}`} />
            <Label
                htmlFor="theme-toggle"
                className="text-slate-700 dark:text-slate-100 font-medium cursor-pointer select-none"
            >
                {isDarkMode ? 'Dark' : 'Light'}
            </Label>
        </div>
    );
};

export default ThemeToggle;
