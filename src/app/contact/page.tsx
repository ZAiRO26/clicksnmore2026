'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Grain/static noise effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        let animationId: number;

        const drawNoise = () => {
            const imageData = ctx.createImageData(canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const noise = Math.random() * 30;
                data[i] = noise;     // R
                data[i + 1] = noise; // G
                data[i + 2] = noise; // B
                data[i + 3] = 20;    // Alpha (very subtle)
            }

            ctx.putImageData(imageData, 0, 0);
            animationId = requestAnimationFrame(drawNoise);
        };

        drawNoise();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="relative min-h-screen bg-background flex items-center justify-center overflow-hidden">
            {/* Animated grain background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 pointer-events-none opacity-60"
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-pure-black via-transparent to-neon-pink/5 z-0" />
            <div className="absolute inset-0 bg-gradient-to-tr from-deep-blue/10 via-transparent to-transparent z-0" />

            {/* Main Content */}
            <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 py-32">
                <motion.div
                    className="max-w-6xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {/* Header */}
                    <motion.p
                        className="font-mono text-xs tracking-[0.5em] text-acid-green mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        LET&apos;S TALK
                    </motion.p>

                    {/* Massive Typography */}
                    <div className="space-y-12 md:space-y-16">
                        {/* Inquiries */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="font-mono text-xs tracking-[0.4em] text-off-white/40 block mb-4">
                                INQUIRIES
                            </span>
                            <a
                                href="mailto:hello@clicksnmore.in"
                                className="group inline-block font-serif text-4xl md:text-6xl lg:text-8xl font-bold text-off-white hover:text-neon-pink transition-colors duration-300 leading-tight"
                            >
                                hello@clicksnmore.in
                                <motion.span
                                    className="block h-1 bg-neon-pink mt-2 origin-left"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.4 }}
                                />
                            </a>
                        </motion.div>

                        {/* Commercial */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="font-mono text-xs tracking-[0.4em] text-off-white/40 block mb-4">
                                COMMERCIAL
                            </span>
                            <a
                                href="tel:+919354785960"
                                className="group inline-block font-serif text-4xl md:text-6xl lg:text-8xl font-bold text-off-white hover:text-neon-pink transition-colors duration-300 leading-tight"
                            >
                                +91-9354785960
                                <motion.span
                                    className="block h-1 bg-neon-pink mt-2 origin-left"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.4 }}
                                />
                            </a>
                        </motion.div>

                        {/* Social */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="font-mono text-xs tracking-[0.4em] text-off-white/40 block mb-4">
                                FOLLOW
                            </span>
                            <div className="flex flex-wrap gap-6 md:gap-12">
                                {['Instagram', 'Twitter', 'LinkedIn'].map((social, index) => (
                                    <motion.a
                                        key={social}
                                        href="#"
                                        className="font-serif text-2xl md:text-4xl font-bold text-off-white/60 hover:text-acid-green transition-colors duration-300"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.8 + index * 0.1 }}
                                    >
                                        {social}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Based In */}
                    <motion.div
                        className="mt-24 md:mt-32"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        <span className="font-mono text-xs tracking-[0.4em] text-off-white/40 block mb-2">
                            BASED IN
                        </span>
                        <p className="font-serif text-xl md:text-2xl text-off-white/60">
                            New York City, NY
                        </p>
                        <p className="font-mono text-xs text-off-white/30 mt-2">
                            Available worldwide for projects
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            {/* Decorative elements */}
            <motion.div
                className="absolute bottom-8 right-8 font-mono text-xs tracking-widest text-off-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                © 2024 CLICKSNMORE
            </motion.div>

            {/* Floating accent lines */}
            <motion.div
                className="absolute top-1/4 left-0 w-32 h-px bg-gradient-to-r from-neon-pink to-transparent"
                initial={{ width: 0 }}
                animate={{ width: 128 }}
                transition={{ delay: 0.8, duration: 1 }}
            />
            <motion.div
                className="absolute bottom-1/3 right-0 w-48 h-px bg-gradient-to-l from-acid-green to-transparent"
                initial={{ width: 0 }}
                animate={{ width: 192 }}
                transition={{ delay: 1, duration: 1 }}
            />
        </div>
    );
}
