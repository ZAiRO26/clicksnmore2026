'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { portfolioImages, PortfolioImage } from '@/lib/images';
import Lightbox from '@/components/Lightbox';

export default function ClicksPage() {
    const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    const openLightbox = (image: PortfolioImage, index: number) => {
        setSelectedImage(image);
        setSelectedIndex(index);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        setSelectedIndex(-1);
    };

    const goToPrevious = () => {
        const newIndex = selectedIndex > 0 ? selectedIndex - 1 : portfolioImages.length - 1;
        setSelectedIndex(newIndex);
        setSelectedImage(portfolioImages[newIndex]);
    };

    const goToNext = () => {
        const newIndex = selectedIndex < portfolioImages.length - 1 ? selectedIndex + 1 : 0;
        setSelectedIndex(newIndex);
        setSelectedImage(portfolioImages[newIndex]);
    };

    // Masonry column arrangement
    const getColumnClass = (index: number) => {
        const patterns = [
            'col-span-1 row-span-2', // tall
            'col-span-1 row-span-1', // small
            'col-span-2 row-span-1', // wide
            'col-span-1 row-span-1', // small
            'col-span-1 row-span-2', // tall
            'col-span-1 row-span-1', // small
        ];
        return patterns[index % patterns.length];
    };

    return (
        <div className="min-h-screen bg-background px-4 py-20 sm:px-8 md:px-16">
            {/* Page Header */}
            <motion.header
                className="mb-16 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1
                    className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold"
                    style={{
                        WebkitTextStroke: '2px var(--hot-pink)',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    THE CLICKS
                </h1>
                <motion.p
                    className="mt-4 font-mono text-sm tracking-[0.3em] text-white/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {portfolioImages.length} SHOTS
                </motion.p>
            </motion.header>

            {/* Masonry Grid */}
            <div
                className="mx-auto max-w-7xl"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gridAutoRows: '200px',
                    gap: '16px',
                }}
            >
                {portfolioImages.map((image, index) => (
                    <motion.div
                        key={image.id}
                        className={`relative group overflow-hidden ${getColumnClass(index)}`}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.08,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        onClick={() => openLightbox(image, index)}
                    >
                        <motion.div
                            className="relative h-full w-full overflow-hidden border-2 border-white/10"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            data-hoverable
                            data-cursor-text="OPEN"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />

                            {/* Hover Overlay */}
                            <motion.div
                                className="absolute inset-0 flex flex-col justify-end p-4"
                                style={{
                                    background: `linear-gradient(to top, ${image.color}CC 0%, transparent 60%)`,
                                }}
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <span className="font-mono text-xs font-bold tracking-wider text-white">
                                    {image.category.toUpperCase()}
                                </span>
                                <span className="mt-1 font-serif text-lg text-white/90 line-clamp-2">
                                    {image.alt}
                                </span>
                            </motion.div>

                            {/* Index Number */}
                            <div
                                className="absolute top-2 right-2 font-mono text-xs text-white/40"
                            >
                                {String(index + 1).padStart(2, '0')}
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox */}
            <Lightbox
                image={selectedImage}
                isOpen={!!selectedImage}
                onClose={closeLightbox}
                onPrevious={goToPrevious}
                onNext={goToNext}
            />

            {/* Bottom Spacer */}
            <div className="h-24" />
        </div>
    );
}
