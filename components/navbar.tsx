'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { client } from '../sanity/lib/client';

const BASE_NAV_LINKS = [
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#pricing', label: 'Pricing', key: 'pricing' },
    { href: '#about', label: 'About' },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [navLinks, setNavLinks] = useState(BASE_NAV_LINKS);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // Fetch pricing visibility setting
        const fetchSettings = async () => {
            try {
                const profile = await client.fetch(`*[_type == "profile"][0]{showPricing}`);
                const showPricing = profile?.showPricing !== false; // Default to true if undefined

                if (!showPricing) {
                    setNavLinks(BASE_NAV_LINKS.filter(link => link.key !== 'pricing'));
                } else {
                    setNavLinks(BASE_NAV_LINKS);
                }
            } catch (error) {
                console.error("Failed to fetch navbar settings:", error);
            }
        };
        fetchSettings();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                'fixed top-0 z-50 w-full transition-all duration-300',
                scrolled ? 'bg-black/50 border-b border-white/5 backdrop-blur-xl' : 'bg-transparent'
            )}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
                <Link href="/" className="text-xl font-bold tracking-tighter text-white">
                    ARDA<span className="text-neutral-500">CANKAYA</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="#contact"
                        className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
                    >
                        Contact
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-16 left-0 w-full bg-black border-b border-neutral-800 p-4 md:hidden"
                >
                    <div className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-neutral-400 hover:text-white"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="#contact"
                            className="w-full text-center rounded-full bg-white px-5 py-2 text-sm font-medium text-black"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>
                    </div>
                </motion.div>
            )}
        </nav>
    );
}
