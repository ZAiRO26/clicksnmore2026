'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioImages, PortfolioImage } from '@/lib/images';

interface CollageItemProps {
    image: PortfolioImage;
    index: number;
}

function CollageItem({ image, index }: CollageItemProps) {
    const [isHovered, setIsHovered] = useState(false);

    // Random rotations and offsets for chaotic feel
    const rotations = [-5, 3, -2, 4, -3, 2, -4, 3, -1, 5, -3, 2];
    const rotation = rotations[index % rotations.length];

    // Grid placement patterns for overlap effect
    const gridPlacements = [
        { gridColumn: '1 / 3', gridRow: '1 / 3' },      // Large top-left
        { gridColumn: '3 / 4', gridRow: '1 / 2' },      // Small top-right
        { gridColumn: '4 / 6', gridRow: '1 / 3' },      // Large top-right
        { gridColumn: '2 / 4', gridRow: '2 / 4' },      // Medium center (overlaps)
        { gridColumn: '1 / 2', gridRow: '3 / 4' },      // Small left
        { gridColumn: '4 / 5', gridRow: '3 / 4' },      // Small right
        { gridColumn: '5 / 6', gridRow: '2 / 4' },      // Medium right edge
        { gridColumn: '1 / 3', gridRow: '4 / 5' },      // Medium bottom-left
        { gridColumn: '3 / 5', gridRow: '4 / 6' },      // Large bottom-center
        { gridColumn: '5 / 6', gridRow: '4 / 5' },      // Small bottom-right
        { gridColumn: '1 / 2', gridRow: '5 / 6' },      // Small bottom-left corner
        { gridColumn: '2 / 4', gridRow: '5 / 6' },      // Medium bottom
    ];

    const placement = gridPlacements[index % gridPlacements.length];
    const zIndex = isHovered ? 50 : 10 + index;

    return (
        <motion.div
            className="relative group"
            style={{
                ...placement,
                zIndex,
            }}
            initial={{ opacity: 0, scale: 0.8, rotate: rotation * 2 }}
            animate={{
                opacity: 1,
                scale: 1,
                rotate: rotation,
                transition: {
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link
                href="/clicks"
                data-hoverable
                data-cursor-text="VIEW"
                className="block"
            >
                <motion.div
                    className="relative overflow-hidden border-4 border-white/10 bg-black"
                    style={{
                        boxShadow: isHovered
                            ? `0 20px 60px ${image.color}40, 0 0 0 2px ${image.color}`
                            : '0 10px 30px rgba(0,0,0,0.5)',
                    }}
                    animate={{
                        scale: isHovered ? 1.08 : 1,
                        rotate: isHovered ? 0 : rotation,
                    }}
                    transition={{
                        type: 'spring',
                        damping: 20,
                        stiffness: 300,
                    }}
                >
                    {/* Image */}
                    <div className="relative aspect-square sm:aspect-auto sm:h-full sm:min-h-[200px]">
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover transition-transform duration-700"
                            style={{
                                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                            }}
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />

                        {/* Color Overlay on Hover */}
                        <motion.div
                            className="absolute inset-0"
                            style={{ backgroundColor: image.color }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 0.2 : 0 }}
                            transition={{ duration: 0.3 }}
                        />

                        {/* Scanline Effect */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-20"
                            style={{
                                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
                            }}
                        />
                    </div>

                    {/* Retro Tooltip */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                className="absolute -bottom-2 left-1/2 z-10 px-3 py-1 font-mono text-xs tracking-wider text-black"
                                style={{
                                    backgroundColor: image.color,
                                    transform: 'translateX(-50%)',
                                }}
                                initial={{ opacity: 0, y: 10, x: '-50%' }}
                                animate={{ opacity: 1, y: 0, x: '-50%' }}
                                exit={{ opacity: 0, y: 10, x: '-50%' }}
                                transition={{ duration: 0.2 }}
                            >
                                {image.category.toUpperCase()}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Floating decorative elements */}
                <motion.div
                    className="absolute -top-2 -right-2 w-4 h-4"
                    style={{ backgroundColor: image.color }}
                    animate={{
                        scale: isHovered ? [1, 1.5, 1] : 1,
                        rotate: isHovered ? 180 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                />
            </Link>
        </motion.div>
    );
}

export default function HeroCollage() {
    return (
        <section className="relative min-h-screen px-4 py-20 sm:px-8 md:px-16">
            {/* Background Grid Lines */}
            <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(90deg, white 1px, transparent 1px),
            linear-gradient(white 1px, transparent 1px)
          `,
                    backgroundSize: '100px 100px',
                }}
            />

            {/* Title */}
            <motion.div
                className="relative z-10 mb-12 flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <h1
                    className="font-serif text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight"
                    style={{
                        background: 'linear-gradient(135deg, var(--hot-pink), var(--electric-blue), var(--acid-green))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                >
                    CLICKS
                </h1>
                <motion.p
                    className="mt-4 font-mono text-sm tracking-[0.3em] text-white/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    + MORE
                </motion.p>
            </motion.div>

            {/* Collage Grid */}
            <div
                className="relative mx-auto max-w-7xl"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gridTemplateRows: 'repeat(6, minmax(120px, 1fr))',
                    gap: '12px',
                }}
            >
                {portfolioImages.map((image, index) => (
                    <CollageItem key={image.id} image={image} index={index} />
                ))}
            </div>

            {/* Floating accent shapes */}
            <motion.div
                className="absolute top-20 left-10 w-20 h-20 border-4 border-hot-pink/30 rotate-45"
                animate={{
                    rotate: [45, 135, 45],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
            <motion.div
                className="absolute bottom-40 right-20 w-16 h-16 bg-acid-green/20 rounded-full"
                animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute top-1/2 right-10 w-2 h-32 bg-electric-blue/40"
                animate={{
                    scaleY: [1, 1.5, 1],
                    opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </section>
    );
}
