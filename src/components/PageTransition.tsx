'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
    children: ReactNode;
}

// Curtain wipe variants with proper typing
const curtainVariants: Variants = {
    initial: {
        scaleY: 1,
    },
    animate: {
        scaleY: 0,
        transition: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1] as const,
        },
    },
    exit: {
        scaleY: 1,
        transition: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1] as const,
        },
    },
};

const pageVariants: Variants = {
    initial: {
        opacity: 0,
        y: 20,
        filter: 'blur(10px)',
    },
    animate: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.6,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        filter: 'blur(10px)',
        transition: {
            duration: 0.4,
            ease: [0.76, 0, 0.24, 1] as const,
        },
    },
};

export default function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div key={pathname}>
                {/* Curtain Overlay */}
                <motion.div
                    className="fixed inset-0 z-[9998] origin-top bg-neon-pink"
                    variants={curtainVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                />
                <motion.div
                    className="fixed inset-0 z-[9997] origin-bottom bg-deep-blue"
                    variants={curtainVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                />

                {/* Page Content */}
                <motion.main
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    {children}
                </motion.main>
            </motion.div>
        </AnimatePresence>
    );
}
