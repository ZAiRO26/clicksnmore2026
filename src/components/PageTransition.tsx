'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
    children: ReactNode;
}

// Curtain wipe variants
const curtainVariants = {
    initial: {
        scaleY: 1,
    },
    animate: {
        scaleY: 0,
        transition: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
        },
    },
    exit: {
        scaleY: 1,
        transition: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
        },
    },
};

const pageVariants = {
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
            ease: [0.16, 1, 0.3, 1],
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        filter: 'blur(10px)',
        transition: {
            duration: 0.4,
            ease: [0.76, 0, 0.24, 1],
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
                    className="fixed inset-0 z-[9998] origin-top bg-hot-pink"
                    variants={curtainVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                />
                <motion.div
                    className="fixed inset-0 z-[9997] origin-bottom bg-electric-blue"
                    variants={curtainVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    style={{ transitionDelay: '0.1s' }}
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
