'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div key={pathname}>
                {/* Page Content - fades in after curtain */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 0.3,
                        delay: 0.5, // Wait for curtain to cover
                    }}
                >
                    {children}
                </motion.div>

                {/* Curtain Overlay - Neon Pink slide up */}
                <motion.div
                    className="fixed inset-0 z-[1000] pointer-events-none"
                    style={{ backgroundColor: '#FF00FF' }}
                    initial={{ y: '100%' }}
                    animate={{ y: '-100%' }}
                    exit={{ y: '100%' }}
                    transition={{
                        duration: 0.8,
                        ease: [0.76, 0, 0.24, 1], // Custom easing for smooth curtain
                    }}
                />

                {/* Secondary curtain for depth */}
                <motion.div
                    className="fixed inset-0 z-[999] pointer-events-none"
                    style={{ backgroundColor: '#000000' }}
                    initial={{ y: '100%' }}
                    animate={{ y: '-100%' }}
                    exit={{ y: '100%' }}
                    transition={{
                        duration: 0.8,
                        delay: 0.05,
                        ease: [0.76, 0, 0.24, 1],
                    }}
                />
            </motion.div>
        </AnimatePresence>
    );
}
