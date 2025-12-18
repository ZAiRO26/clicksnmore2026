'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
    { href: '/', label: 'HOME', icon: '◉' },
    { href: '/clicks', label: 'CLICKS', icon: '◐' },
    { href: '/more', label: 'MORE', icon: '◑' },
];

export default function Navigation() {
    const pathname = usePathname();

    return (
        <motion.nav
            className="fixed bottom-8 left-1/2 z-[1000] flex items-center gap-1 rounded-full border-2 border-white/20 bg-black/80 px-2 py-2 backdrop-blur-md"
            initial={{ y: 100, x: '-50%' }}
            animate={{ y: 0, x: '-50%' }}
            transition={{
                type: 'spring',
                damping: 20,
                stiffness: 100,
                delay: 1,
            }}
        >
            {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                    <Link key={item.href} href={item.href} data-hoverable data-cursor-text={item.label}>
                        <motion.div
                            className={`relative flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wider transition-colors ${isActive ? 'text-hot-pink' : 'text-white hover:text-acid-green'
                                }`}
                            whileHover={{
                                scale: 1.05,
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {/* Glitch effect layers */}
                            <motion.span
                                className="relative inline-block"
                                whileHover={{
                                    x: [0, -2, 2, -1, 1, 0],
                                    transition: { duration: 0.3 },
                                }}
                            >
                                <span className="relative z-10">{item.icon}</span>
                                {/* Glitch shadow */}
                                <motion.span
                                    className="absolute left-0 top-0 text-hot-pink opacity-0"
                                    whileHover={{
                                        opacity: [0, 0.8, 0, 0.5, 0],
                                        x: [0, 2, -2, 1, 0],
                                        transition: { duration: 0.3 },
                                    }}
                                >
                                    {item.icon}
                                </motion.span>
                                <motion.span
                                    className="absolute left-0 top-0 text-electric-blue opacity-0"
                                    whileHover={{
                                        opacity: [0, 0.8, 0, 0.5, 0],
                                        x: [0, -2, 2, -1, 0],
                                        transition: { duration: 0.3 },
                                    }}
                                >
                                    {item.icon}
                                </motion.span>
                            </motion.span>

                            <span className="hidden sm:inline">{item.label}</span>

                            {/* Active indicator */}
                            {isActive && (
                                <motion.div
                                    className="absolute -bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 bg-hot-pink"
                                    layoutId="activeIndicator"
                                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                                />
                            )}
                        </motion.div>
                    </Link>
                );
            })}

            {/* Decorative border glow */}
            <motion.div
                className="absolute inset-0 -z-10 rounded-full opacity-30 blur-md"
                style={{
                    background: 'linear-gradient(90deg, var(--hot-pink), var(--electric-blue), var(--acid-green))',
                }}
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </motion.nav>
    );
}
