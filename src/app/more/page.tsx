'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// Text content for the about page
const aboutContent = {
    headline: "CLICKSNMORE",
    tagline: "BOLD. RAW. UNAPOLOGETIC.",
    paragraphs: [
        "We don't just take photos—we capture chaos, bottle lightning, and freeze moments that refuse to be ordinary.",
        "Every click is an act of rebellion against the mundane. Every frame is a statement.",
        "Based in the heart of creative disruption, Clicksnmore exists to document the moments that make you feel something.",
        "From street corners to studio lights, from intimate portraits to explosive events—we're there when it matters.",
        "This isn't pretty photography. This is photography with teeth.",
    ],
    contact: {
        email: "hello@clicksnmore.in",
        instagram: "@clicksnmore",
    },
};

function RevealText({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
        >
            {children}
        </motion.div>
    );
}

export default function MorePage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 1]);

    return (
        <div
            ref={containerRef}
            className="relative min-h-[200vh] overflow-hidden bg-background"
        >
            {/* Parallax Background Image */}
            <motion.div
                className="fixed inset-0 z-0"
                style={{ y: backgroundY }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920)',
                        filter: 'grayscale(100%) contrast(1.2)',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </motion.div>

            {/* Noise overlay */}
            <div
                className="fixed inset-0 pointer-events-none opacity-[0.05] z-[1]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Content */}
            <div className="relative z-10 px-4 py-32 sm:px-8 md:px-16 lg:px-32">
                {/* Hero Section */}
                <section className="mb-32 min-h-[60vh] flex flex-col justify-center">
                    <RevealText>
                        <h1
                            className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold leading-none"
                            style={{
                                WebkitTextStroke: '1px var(--hot-pink)',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            {aboutContent.headline}
                        </h1>
                    </RevealText>

                    <RevealText delay={0.2}>
                        <motion.p
                            className="mt-8 font-mono text-xl sm:text-2xl md:text-3xl tracking-[0.2em]"
                            style={{ opacity: textOpacity }}
                        >
                            <span style={{ color: 'var(--hot-pink)' }}>BOLD</span>.{' '}
                            <span style={{ color: 'var(--electric-blue)' }}>RAW</span>.{' '}
                            <span style={{ color: 'var(--acid-green)' }}>UNAPOLOGETIC</span>.
                        </motion.p>
                    </RevealText>
                </section>

                {/* Manifesto Section */}
                <section className="mb-32 max-w-4xl">
                    {aboutContent.paragraphs.map((paragraph, index) => (
                        <RevealText key={index} delay={index * 0.1}>
                            <p
                                className="mb-12 font-serif text-2xl sm:text-3xl md:text-4xl leading-relaxed"
                                style={{
                                    color: index % 2 === 0 ? 'var(--foreground)' : 'var(--foreground)',
                                    opacity: 0.9,
                                }}
                            >
                                {paragraph}
                            </p>
                        </RevealText>
                    ))}
                </section>

                {/* Divider */}
                <RevealText>
                    <motion.div
                        className="my-20 h-px w-full bg-gradient-to-r from-transparent via-hot-pink to-transparent"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    />
                </RevealText>

                {/* Contact Section */}
                <section className="mb-32">
                    <RevealText>
                        <h2 className="mb-12 font-mono text-sm tracking-[0.5em] text-white/50">
                            GET IN TOUCH
                        </h2>
                    </RevealText>

                    <RevealText delay={0.1}>
                        <a
                            href={`mailto:${aboutContent.contact.email}`}
                            className="mb-8 block font-serif text-4xl sm:text-5xl md:text-6xl hover:text-hot-pink transition-colors"
                            data-hoverable
                            data-cursor-text="EMAIL"
                        >
                            {aboutContent.contact.email}
                        </a>
                    </RevealText>

                    <RevealText delay={0.2}>
                        <a
                            href="#"
                            className="block font-mono text-2xl sm:text-3xl text-electric-blue hover:text-acid-green transition-colors"
                            data-hoverable
                            data-cursor-text="INSTA"
                        >
                            {aboutContent.contact.instagram}
                        </a>
                    </RevealText>
                </section>

                {/* Footer decorative element */}
                <RevealText>
                    <div className="flex items-center justify-center gap-4">
                        <motion.div
                            className="h-2 w-2 bg-hot-pink"
                            animate={{
                                scale: [1, 1.5, 1],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                        <motion.div
                            className="h-2 w-2 bg-electric-blue"
                            animate={{
                                scale: [1.5, 1, 1.5],
                                rotate: [180, 360, 180],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                        <motion.div
                            className="h-2 w-2 bg-acid-green"
                            animate={{
                                scale: [1, 1.5, 1],
                                rotate: [360, 180, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                    </div>
                </RevealText>
            </div>

            {/* Bottom spacer for navigation */}
            <div className="h-32" />
        </div>
    );
}
