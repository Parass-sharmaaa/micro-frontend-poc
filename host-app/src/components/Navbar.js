import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import ThemeToggle from './ThemeToggle';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/chat', label: 'Chat Only' },
        { href: '/email', label: 'Email Only' },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
                <div className="flex items-center">
                    <Link to="/" className="mr-8 font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs">GO</div>
                        <span className="hidden sm:inline">MFE POC</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:block">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {navLinks.map((link) => (
                                    <NavigationMenuItem key={link.href}>
                                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                            <Link to={link.href} className={cn(location.pathname === link.href && "text-blue-600 dark:text-blue-400 font-bold")}>
                                                {link.label}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="hidden sm:block">
                        <ThemeToggle />
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={toggleMenu}
                        className="p-2 rounded-md lg:hidden text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="lg:hidden animate-in slide-in-from-top duration-300 mx-4 mb-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-6 space-y-4 shadow-2xl relative z-50">
                    <div className="flex flex-col space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={cn(
                                    "px-4 py-3 rounded-xl text-base font-semibold transition-all",
                                    location.pathname === link.href
                                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-center sm:hidden">
                        <ThemeToggle />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
