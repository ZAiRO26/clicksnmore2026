'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navLinks = [
    { href: '/', label: 'Work' },
    { href: '/services', label: 'Services' },
    { href: '/more', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 right-0 z-[100] px-6 py-6 flex items-start justify-between pointer-events-none">
            {/* Logo - Massive Bold Serif */}
            <motion.div
                className="pointer-events-auto"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <Link href="/" data-hoverable>
                    <h1
                        className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-off-white hover:text-neon-pink transition-colors duration-300"
                        style={{ lineHeight: 1 }}
                    >
                        CLICKSNMORE
                    </h1>
                </Link>
            </motion.div>

            {/* Floating Pill Navigation */}
            <motion.nav
                className="pointer-events-auto"
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
                            <Link key={link.href} href={link.href} data-hoverable>
                                <motion.span
                                    className={`relative block px-4 py-2 font-mono text-xs sm:text-sm uppercase tracking-widest transition-all duration-200 ${isActive ? 'text-neon-pink' : 'text-off-white'
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
        </header>
    );
}
