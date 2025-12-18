'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface FloatingImageProps {
    src: string;
    alt: string;
    category?: string;
    href?: string;
    aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide';
    className?: string;
}

export default function FloatingImage({
    src,
    alt,
    category,
    href,
    aspectRatio = 'square',
    className = '',
}: FloatingImageProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setCursorPos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    const aspectRatioClasses = {
        square: 'aspect-square',
        portrait: 'aspect-[3/4]',
        landscape: 'aspect-[4/3]',
        wide: 'aspect-[16/9]',
    };

    const imageContent = (
        <motion.div
            ref={containerRef}
            className={`relative overflow-hidden ${aspectRatioClasses[aspectRatio]} ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{
                scale: 1.05,
                y: -10,
                zIndex: 50,
                transition: { duration: 0.3, ease: 'easeOut' }
            }}
            style={{ transformOrigin: 'center center' }}
        >
            {/* Image */}
            <Image
                src={src}
                alt={alt}
                fill
                className={`object-cover transition-all duration-500 ${isHovered ? 'grayscale-0 scale-105' : 'grayscale-[20%]'
                    }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Gradient overlay on hover */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-t from-pure-black/60 via-transparent to-transparent pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />

            {/* Category tag */}
            {category && (
                <motion.div
                    className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.3em] text-off-white/80 uppercase"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                    transition={{ duration: 0.3 }}
                >
                    {category}
                </motion.div>
            )}

            {/* Retro "View" tooltip that follows cursor */}
            <motion.div
                className="absolute pointer-events-none z-50"
                style={{
                    left: cursorPos.x,
                    top: cursorPos.y,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.8,
                    x: 15,
                    y: 15,
                }}
                transition={{ duration: 0.15 }}
            >
                <div className="bg-neon-pink text-pure-black font-mono text-xs font-bold tracking-wider px-3 py-2 whitespace-nowrap">
                    VIEW →
                </div>
            </motion.div>

            {/* Hover border glow */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    boxShadow: 'inset 0 0 0 2px rgba(255, 0, 255, 0.5)',
                }}
            />
        </motion.div>
    );

    // Conditionally wrap with Link if href is provided
    if (href) {
        return (
            <Link href={href} className="block">
                {imageContent}
            </Link>
        );
    }

    return <div className="block">{imageContent}</div>;
}
