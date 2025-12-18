'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/work', label: 'Work' },
    { href: '/services', label: 'Services' },
    { href: '/more', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-6 py-4 md:py-6 flex items-center justify-between pointer-events-none">
                {/* Logo */}
                <motion.div
                    className="pointer-events-auto"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                        <h1
                            className="font-serif text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-off-white hover:text-neon-pink transition-colors duration-300"
                            style={{ lineHeight: 1 }}
                        >
                            CLICKSNMORE
                        </h1>
                    </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <motion.nav
                    className="pointer-events-auto hidden md:block"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div
                        className="flex items-center gap-1 px-2 py-2 rounded-full border border-off-white/20 bg-pure-black/80 backdrop-blur-md"
                        style={{
                            boxShadow: '0 4px 30px rgba(255, 0, 255, 0.1)',
                        }}
                    >
                        {navLinks.map((link, index) => {
                            const isActive = pathname === link.href;

                            return (
                                <Link key={link.href} href={link.href}>
                                    <motion.span
                                        className={`relative block px-3 lg:px-4 py-2 font-mono text-[10px] lg:text-xs uppercase tracking-widest transition-all duration-200 ${isActive ? 'text-neon-pink' : 'text-off-white'
                                            }`}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        whileHover={{
                                            skewX: -10,
                                            color: '#FF00FF',
                                            transition: { duration: 0.2 },
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {link.label}

                                        {/* Active indicator dot */}
                                        {isActive && (
                                            <motion.span
                                                className="absolute -bottom-1 left-1/2 w-1 h-1 bg-neon-pink rounded-full"
                                                layoutId="activeNavDot"
                                                style={{ transform: 'translateX(-50%)' }}
                                            />
                                        )}
                                    </motion.span>
                                </Link>
                            );
                        })}
                    </div>
                </motion.nav>

                {/* Mobile Menu Button */}
                <motion.button
                    className="pointer-events-auto md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    aria-label="Toggle menu"
                >
                    <motion.span
                        className="w-6 h-0.5 bg-off-white"
                        animate={{
                            rotate: isMobileMenuOpen ? 45 : 0,
                            y: isMobileMenuOpen ? 4 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                    />
                    <motion.span
                        className="w-6 h-0.5 bg-off-white"
                        animate={{
                            opacity: isMobileMenuOpen ? 0 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                    />
                    <motion.span
                        className="w-6 h-0.5 bg-off-white"
                        animate={{
                            rotate: isMobileMenuOpen ? -45 : 0,
                            y: isMobileMenuOpen ? -4 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                    />
                </motion.button>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-[99] bg-pure-black/98 backdrop-blur-lg flex flex-col items-center justify-center md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <nav className="flex flex-col items-center gap-6">
                            {navLinks.map((link, index) => {
                                const isActive = pathname === link.href;

                                return (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ delay: index * 0.08 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`font-serif text-3xl sm:text-4xl font-bold tracking-tight transition-colors duration-300 ${isActive ? 'text-neon-pink' : 'text-off-white hover:text-neon-pink'
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </nav>

                        {/* Social links */}
                        <motion.div
                            className="absolute bottom-12 flex gap-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <span className="font-mono text-[10px] tracking-widest text-off-white/40">INSTAGRAM</span>
                            <span className="font-mono text-[10px] tracking-widest text-off-white/40">TWITTER</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
