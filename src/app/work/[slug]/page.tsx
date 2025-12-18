'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

// Project data with multiple images per project
const projects = [
    {
        slug: 'urban-portraits',
        title: 'Urban Portraits',
        subtitle: 'Street Photography Series',
        year: '2024',
        description: 'A raw exploration of human connection in chaotic urban environments. Each frame captures unfiltered moments of city life.',
        images: [
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1400',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400',
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1400',
            'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=1400',
        ],
    },
    {
        slug: 'neon-nights',
        title: 'Neon Nights',
        subtitle: 'City After Dark',
        year: '2024',
        description: 'When the sun sets, the city reveals its true colors. Neon-soaked streets become stages for untold stories.',
        images: [
            'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400',
            'https://images.unsplash.com/photo-1552083375-1447ce886485?w=1400',
            'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1400',
            'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=1400',
        ],
    },
    {
        slug: 'wild-landscapes',
        title: 'Wild Landscapes',
        subtitle: 'Nature Untamed',
        year: '2023',
        description: 'Dramatic vistas and untouched wilderness. Where nature\'s power meets photographic patience.',
        images: [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400',
            'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1400',
            'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400',
            'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400',
        ],
    },
    {
        slug: 'concert-energy',
        title: 'Concert Energy',
        subtitle: 'Live Music Photography',
        year: '2023',
        description: 'Raw energy captured in split seconds. The sweat, the lights, the crowd—pure adrenaline frozen in time.',
        images: [
            'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1400',
            'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1400',
            'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1400',
            'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1400',
        ],
    },
];

function getNextProject(currentSlug: string) {
    const currentIndex = projects.findIndex(p => p.slug === currentSlug);
    const nextIndex = (currentIndex + 1) % projects.length;
    return projects[nextIndex];
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
    const project = projects.find(p => p.slug === params.slug) || projects[0];
    const nextProject = getNextProject(project.slug);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Parallax for the title section
    const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

    return (
        <div ref={containerRef} className="min-h-screen bg-background">
            {/* Hero Section with Project Title */}
            <section className="relative h-screen flex items-center">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-pure-black via-pure-black/80 to-background z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                />

                {/* Large Background Image */}
                <motion.div
                    className="absolute inset-0 z-0 opacity-40"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

                {/* Title Content */}
                <div className="relative z-10 px-6 md:px-12 lg:px-20 w-full">
                    <motion.p
                        className="font-mono text-xs tracking-[0.5em] text-acid-green mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {project.subtitle.toUpperCase()} — {project.year}
                    </motion.p>

                    <motion.h1
                        className="font-serif text-5xl md:text-7xl lg:text-9xl font-bold text-off-white leading-[0.9] max-w-4xl"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {project.title}
                    </motion.h1>

                    <motion.p
                        className="mt-8 max-w-xl text-off-white/60 text-lg leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        {project.description}
                    </motion.p>

                    {/* Scroll indicator */}
                    <motion.div
                        className="absolute bottom-12 left-6 md:left-12 lg:left-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <motion.div
                            className="flex flex-col items-center gap-2"
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <span className="font-mono text-[10px] tracking-widest text-off-white/40 uppercase">
                                Scroll to explore
                            </span>
                            <div className="w-px h-12 bg-gradient-to-b from-off-white/40 to-transparent" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content: Sticky Title + Scrolling Images */}
            <section className="relative flex flex-col lg:flex-row">
                {/* Sticky Title Section - Left Side */}
                <motion.div
                    className="lg:sticky lg:top-0 lg:h-screen lg:w-[35%] flex flex-col justify-center px-6 md:px-12 lg:px-16 py-20 lg:py-0"
                    style={{ y: titleY, opacity: titleOpacity }}
                >
                    <p className="font-mono text-xs tracking-[0.4em] text-neon-pink mb-4">
                        PROJECT
                    </p>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-off-white leading-[1.1] mb-6">
                        {project.title}
                    </h2>
                    <div className="w-16 h-px bg-off-white/20 mb-6" />
                    <p className="text-off-white/50 text-sm leading-relaxed max-w-sm">
                        {project.description}
                    </p>
                    <p className="font-mono text-xs tracking-widest text-off-white/30 mt-8">
                        {project.images.length} IMAGES
                    </p>
                </motion.div>

                {/* Scrolling Images Section - Right Side */}
                <div className="lg:w-[65%] py-8 lg:py-20">
                    {project.images.map((src, index) => (
                        <motion.div
                            key={index}
                            className="relative w-full mb-4 lg:mb-8 overflow-hidden"
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10%' }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="relative w-full aspect-[4/3] lg:aspect-[16/10]">
                                <Image
                                    src={src}
                                    alt={`${project.title} - Image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 65vw"
                                />

                                {/* Image number overlay */}
                                <div className="absolute bottom-4 right-4 font-mono text-xs tracking-widest text-off-white/50 bg-pure-black/50 px-3 py-1 backdrop-blur-sm">
                                    {String(index + 1).padStart(2, '0')} / {String(project.images.length).padStart(2, '0')}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Giant Next Project Footer - 50vh height */}
            <Link href={`/work/${nextProject.slug}`} className="block">
                <motion.section
                    className="relative h-[50vh] flex items-center justify-center cursor-pointer group overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Background image of next project */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={nextProject.images[0]}
                            alt={nextProject.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-pure-black/70 group-hover:bg-pure-black/50 transition-colors duration-500" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 text-center px-6">
                        <motion.p
                            className="font-mono text-xs tracking-[0.5em] text-off-white/50 mb-4 group-hover:text-acid-green transition-colors duration-300"
                        >
                            NEXT PROJECT
                        </motion.p>

                        <motion.h3
                            className="font-serif text-4xl md:text-6xl lg:text-8xl font-bold text-off-white group-hover:text-neon-pink transition-colors duration-300"
                            whileHover={{ skewX: -5 }}
                        >
                            {nextProject.title}
                        </motion.h3>

                        {/* Arrow indicator */}
                        <motion.div
                            className="mt-8 flex justify-center"
                            animate={{ x: [0, 20, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <svg
                                className="w-12 h-12 text-off-white/30 group-hover:text-neon-pink transition-colors duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </motion.div>
                    </div>

                    {/* Hover glow effect */}
                    <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle at center, rgba(255, 0, 255, 0.1) 0%, transparent 70%)',
                        }}
                    />
                </motion.section>
            </Link>
        </div>
    );
}
