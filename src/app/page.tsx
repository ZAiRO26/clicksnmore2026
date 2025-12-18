'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Collage images for scattered table effect
const collageImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600', alt: 'Portrait 1', width: 280, rotation: -5, x: '5%', y: '10%' },
  { id: 2, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600', alt: 'Landscape', width: 350, rotation: 8, x: '60%', y: '5%' },
  { id: 3, src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600', alt: 'Concert', width: 260, rotation: -12, x: '35%', y: '25%' },
  { id: 4, src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600', alt: 'Fashion', width: 300, rotation: 15, x: '75%', y: '35%' },
  { id: 5, src: 'https://images.unsplash.com/photo-1552083375-1447ce886485?w=600', alt: 'Street', width: 240, rotation: -8, x: '10%', y: '45%' },
  { id: 6, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600', alt: 'Portrait 2', width: 280, rotation: 6, x: '45%', y: '55%' },
  { id: 7, src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600', alt: 'Nature', width: 320, rotation: -4, x: '70%', y: '60%' },
  { id: 8, src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600', alt: 'Portrait 3', width: 250, rotation: 10, x: '20%', y: '70%' },
  { id: 9, src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600', alt: 'Urban', width: 290, rotation: -7, x: '55%', y: '80%' },
  { id: 10, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600', alt: 'Wedding', width: 270, rotation: 12, x: '5%', y: '85%' },
];

// Lightbox Component
function Lightbox({ image, onClose }: { image: typeof collageImages[0] | null; onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!image) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-pure-black/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Close button */}
      <motion.button
        className="absolute top-8 right-8 font-mono text-sm tracking-widest text-off-white/60 hover:text-neon-pink transition-colors z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        [ESC] CLOSE
      </motion.button>

      {/* Image */}
      <motion.div
        className="relative max-w-[85vw] max-h-[85vh]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={1200}
          height={800}
          className="object-contain max-h-[85vh] w-auto"
        />
        <motion.p
          className="absolute bottom-4 left-4 font-mono text-xs tracking-widest text-off-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {image.alt.toUpperCase()}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

// Collage Image Component
function CollageImage({
  image,
  onClick,
}: {
  image: typeof collageImages[0];
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: image.x,
        top: image.y,
        width: image.width,
        zIndex: isHovered ? 50 : 10,
      }}
      initial={{ opacity: 0, scale: 0.8, rotate: image.rotation }}
      whileInView={{ opacity: 1, scale: 1, rotate: image.rotation }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        scale: 1.15,
        rotate: 0,
        zIndex: 50,
        transition: { duration: 0.3 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative aspect-[4/5] overflow-hidden shadow-2xl">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="300px"
        />
        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-neon-pink/20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
        {/* View label */}
        <motion.div
          className="absolute bottom-4 left-4 font-mono text-xs tracking-widest text-off-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        >
          CLICK TO VIEW
        </motion.div>
      </div>
      {/* Paper shadow effect */}
      <div
        className="absolute inset-0 -z-10 bg-pure-black/30 blur-md"
        style={{ transform: 'translate(8px, 8px)' }}
      />
    </motion.div>
  );
}

export default function HomePage() {
  const [selectedImage, setSelectedImage] = useState<typeof collageImages[0] | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="min-h-screen bg-background">
      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
        )}
      </AnimatePresence>

      {/* Hero Section - Full Screen */}
      <motion.section
        ref={heroRef}
        className="h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* Background subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-pure-black via-pure-black to-deep-blue/10" />

        {/* Main Title */}
        <motion.h1
          className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold text-neon-pink tracking-tight relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          CLICKSNMORE
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="font-mono text-sm md:text-base tracking-[0.5em] text-acid-green mt-6 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          THE VIBE IS SET
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="font-mono text-xs tracking-widest text-off-white/40 mb-4">SCROLL</span>
          <motion.div
            className="w-px h-16 bg-gradient-to-b from-off-white/40 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.section>

      {/* Scattered Collage Section */}
      <section className="relative min-h-[200vh] py-32">
        {/* Section header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs tracking-[0.5em] text-acid-green mb-4">OUR WORK</p>
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-off-white">
            Moments <span className="text-neon-pink">Captured</span>
          </h2>
        </motion.div>

        {/* Scattered images container */}
        <div className="relative mx-auto max-w-7xl h-[150vh]">
          {collageImages.map((image) => (
            <CollageImage
              key={image.id}
              image={image}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-xs tracking-[0.5em] text-off-white/40 mb-6">
            READY TO CREATE?
          </p>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-off-white mb-8">
            Let&apos;s make something <br />
            <span className="text-neon-pink">extraordinary</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
            <Link
              href="/work"
              className="font-mono text-sm tracking-widest text-off-white border border-off-white/30 px-8 py-4 hover:bg-off-white hover:text-pure-black transition-all duration-300"
            >
              VIEW PORTFOLIO →
            </Link>
            <Link
              href="/contact"
              className="font-mono text-sm tracking-widest text-pure-black bg-neon-pink px-8 py-4 hover:bg-acid-green transition-all duration-300"
            >
              GET IN TOUCH
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-off-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="font-mono text-xs tracking-widest text-off-white/30">
            © 2024 CLICKSNMORE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <a href="#" className="font-mono text-xs tracking-widest text-off-white/50 hover:text-neon-pink transition-colors">
              INSTAGRAM
            </a>
            <a href="#" className="font-mono text-xs tracking-widest text-off-white/50 hover:text-neon-pink transition-colors">
              TWITTER
            </a>
            <a href="#" className="font-mono text-xs tracking-widest text-off-white/50 hover:text-neon-pink transition-colors">
              LINKEDIN
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
