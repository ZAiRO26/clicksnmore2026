'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Service items with hover images
const services = [
    {
        id: 'editorial',
        title: 'Editorial',
        description: 'Magazine covers, fashion spreads, and visual storytelling for print and digital publications.',
        image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800',
    },
    {
        id: 'commercial',
        title: 'Commercial',
        description: 'Brand campaigns, product photography, and advertising that captures attention.',
        image: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=800',
    },
    {
        id: 'events',
        title: 'Events',
        description: 'Concerts, parties, and live moments frozen in time with raw energy.',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    },
    {
        id: 'portraits',
        title: 'Portraits',
        description: 'Personal and professional portraits that reveal character and authenticity.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800',
    },
    {
        id: 'documentary',
        title: 'Documentary',
        description: 'Real stories, real people. Long-form visual journalism and storytelling.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    },
    {
        id: 'creative',
        title: 'Creative Direction',
        description: 'Full creative vision from concept to execution. Art direction for brands.',
        image: 'https://images.unsplash.com/photo-1552083375-1447ce886485?w=800',
    },
    {
        id: 'prewedding',
        title: 'Pre-wedding Sessions',
        description: 'Romantic couple photography sessions that celebrate your love story. Perfect for save-the-dates and engagement announcements.',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    },
    {
        id: 'fashion',
        title: 'Fashion Photography',
        description: 'High-end fashion shoots for models, designers, and brands. Creative direction and professional styling included.',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800',
    },
    {
        id: 'portrait-sessions',
        title: 'Portrait Sessions',
        description: 'Professional headshots and personal branding photography. Perfect for professionals, artists, and entrepreneurs.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    },
    {
        id: 'event-photography',
        title: 'Event Photography',
        description: 'Corporate events, parties, and special occasions captured with professional expertise and creative flair.',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    },
    {
        id: 'fineart',
        title: 'Fine Art Sessions',
        description: 'Artistic and conceptual photography for personal expression and creative projects. Fully customized experiences.',
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800',
    },
];

export default function ServicesPage() {
    const [hoveredService, setHoveredService] = useState<string | null>(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const currentService = services.find(s => s.id === hoveredService);

    return (
        <div
            ref={containerRef}
            className="min-h-screen bg-background"
            onMouseMove={handleMouseMove}
        >
            {/* Floating image that follows cursor */}
            <AnimatePresence>
                {hoveredService && currentService && (
                    <motion.div
                        className="fixed pointer-events-none z-50"
                        style={{
                            left: cursorPos.x + 20,
                            top: cursorPos.y - 100,
                        }}
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 5 }}
                        exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="relative w-64 h-80 overflow-hidden border-2 border-neon-pink/50 shadow-2xl">
                            <Image
                                src={currentService.image}
                                alt={currentService.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-pure-black/40 to-transparent" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Split Screen Layout */}
            <div className="flex flex-col lg:flex-row min-h-screen">
                {/* Left Side - Fixed Title */}
                <div className="lg:sticky lg:top-0 lg:h-screen lg:w-[40%] flex flex-col justify-center px-8 md:px-16 lg:px-20 py-32 lg:py-0 border-b lg:border-b-0 lg:border-r border-off-white/10">
                    <motion.p
                        className="font-mono text-xs tracking-[0.5em] text-acid-green mb-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        SERVICES
                    </motion.p>

                    <motion.h1
                        className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-off-white leading-[0.95]"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        What
                        <br />
                        We
                        <br />
                        <span className="text-neon-pink">Do</span>
                    </motion.h1>

                    <motion.div
                        className="mt-12 w-20 h-px bg-off-white/30"
                        initial={{ width: 0 }}
                        animate={{ width: 80 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    />

                    <motion.p
                        className="mt-8 text-off-white/50 text-sm leading-relaxed max-w-xs font-mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        Hover over services to preview our work in that area.
                    </motion.p>
                </div>

                {/* Right Side - Scrollable Services */}
                <div className="lg:w-[60%] py-20 lg:py-32">
                    <div className="px-8 md:px-16">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                className="group border-b border-off-white/10 py-12 cursor-pointer"
                                onMouseEnter={() => setHoveredService(service.id)}
                                onMouseLeave={() => setHoveredService(null)}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                            >
                                <div className="flex items-start justify-between gap-8">
                                    <div className="flex-1">
                                        <motion.span
                                            className="font-mono text-xs tracking-widest text-off-white/30 block mb-2"
                                        >
                                            {String(index + 1).padStart(2, '0')}
                                        </motion.span>

                                        <motion.h2
                                            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-off-white group-hover:text-neon-pink transition-colors duration-300"
                                            whileHover={{ x: 20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {service.title}
                                        </motion.h2>

                                        <motion.p
                                            className="mt-4 text-off-white/50 text-sm max-w-md font-mono leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        >
                                            {service.description}
                                        </motion.p>
                                    </div>

                                    {/* Arrow */}
                                    <motion.div
                                        className="text-off-white/20 group-hover:text-acid-green transition-colors duration-300 mt-4"
                                        initial={{ x: 0, opacity: 0.5 }}
                                        whileHover={{ x: 10, opacity: 1 }}
                                    >
                                        <svg
                                            className="w-8 h-8"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <motion.div
                        className="mt-20 px-8 md:px-16"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="font-mono text-xs tracking-[0.4em] text-off-white/30">
                            READY TO COLLABORATE?
                        </p>
                        <a
                            href="/contact"
                            className="inline-block mt-4 font-serif text-2xl text-neon-pink hover:text-acid-green transition-colors"
                        >
                            Get in touch →
                        </a>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
