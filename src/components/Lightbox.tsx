'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioImage } from '@/lib/images';

interface LightboxProps {
    image: PortfolioImage | null;
    isOpen: boolean;
    onClose: () => void;
    onPrevious?: () => void;
    onNext?: () => void;
}

export default function Lightbox({
    image,
    isOpen,
    onClose,
    onPrevious,
    onNext
}: LightboxProps) {
    // Keyboard navigation
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isOpen) return;

        switch (e.key) {
            case 'Escape':
                onClose();
                break;
            case 'ArrowLeft':
                onPrevious?.();
                break;
            case 'ArrowRight':
                onNext?.();
                break;
        }
    }, [isOpen, onClose, onPrevious, onNext]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Prevent scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && image && (
                <motion.div
                    className="fixed inset-0 z-[2000] flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* OS Window Container */}
                    <motion.div
                        className="relative z-10 w-[90vw] max-w-4xl bg-[#c0c0c0] shadow-2xl"
                        style={{
                            border: '2px solid #fff',
                            boxShadow: 'inset -1px -1px 0 #808080, inset 1px 1px 0 #fff, 4px 4px 0 rgba(0,0,0,0.5)',
                        }}
                        initial={{ scale: 0.8, y: 50, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.8, y: 50, opacity: 0 }}
                        transition={{
                            type: 'spring',
                            damping: 25,
                            stiffness: 300
                        }}
                    >
                        {/* Title Bar - Mac OS 9 Style */}
                        <div
                            className="flex items-center justify-between px-2 py-1"
                            style={{
                                background: 'linear-gradient(180deg, #000080 0%, #1084d0 100%)',
                            }}
                        >
                            {/* Window Controls */}
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={onClose}
                                    className="flex h-4 w-4 items-center justify-center bg-[#c0c0c0] text-xs font-bold leading-none"
                                    style={{
                                        border: '1px solid #fff',
                                        boxShadow: 'inset -1px -1px 0 #808080, inset 1px 1px 0 #fff',
                                    }}
                                    data-hoverable
                                    data-cursor-text="CLOSE"
                                >
                                    ×
                                </button>
                            </div>

                            {/* Title */}
                            <span className="font-mono text-xs font-bold text-white tracking-wider">
                                {image.category.toUpperCase()}.jpg
                            </span>

                            {/* Minimize/Maximize */}
                            <div className="flex items-center gap-1">
                                <div
                                    className="h-4 w-4 bg-[#c0c0c0]"
                                    style={{
                                        border: '1px solid #fff',
                                        boxShadow: 'inset -1px -1px 0 #808080, inset 1px 1px 0 #fff',
                                    }}
                                />
                            </div>
                        </div>

                        {/* Menu Bar */}
                        <div
                            className="flex items-center gap-4 px-2 py-1 font-mono text-xs"
                            style={{
                                background: '#c0c0c0',
                                borderBottom: '1px solid #808080',
                            }}
                        >
                            <span className="underline">File</span>
                            <span className="underline">Edit</span>
                            <span className="underline">View</span>
                            <span className="underline">Help</span>
                        </div>

                        {/* Image Container */}
                        <div className="relative bg-black p-2">
                            <div className="relative aspect-[4/3] w-full overflow-hidden">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-contain"
                                    priority
                                />

                                {/* Scanlines */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-10"
                                    style={{
                                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)',
                                    }}
                                />
                            </div>

                            {/* Navigation Arrows */}
                            {onPrevious && (
                                <button
                                    onClick={onPrevious}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center bg-white/10 font-mono text-2xl text-white backdrop-blur-sm transition-all hover:bg-white/20"
                                    data-hoverable
                                    data-cursor-text="PREV"
                                >
                                    ←
                                </button>
                            )}
                            {onNext && (
                                <button
                                    onClick={onNext}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center bg-white/10 font-mono text-2xl text-white backdrop-blur-sm transition-all hover:bg-white/20"
                                    data-hoverable
                                    data-cursor-text="NEXT"
                                >
                                    →
                                </button>
                            )}
                        </div>

                        {/* Status Bar */}
                        <div
                            className="flex items-center justify-between px-2 py-1 font-mono text-[10px]"
                            style={{
                                background: '#c0c0c0',
                                borderTop: '1px solid #fff',
                            }}
                        >
                            <span>{image.alt}</span>
                            <span style={{ color: image.color }}>●</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
