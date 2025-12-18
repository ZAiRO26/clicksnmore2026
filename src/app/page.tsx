'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Collage images for scattered table effect
const collageImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600', alt: 'Portrait 1' },
  { id: 2, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600', alt: 'Landscape' },
  { id: 3, src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600', alt: 'Concert' },
  { id: 4, src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600', alt: 'Fashion' },
  { id: 5, src: 'https://images.unsplash.com/photo-1552083375-1447ce886485?w=600', alt: 'Street' },
  { id: 6, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600', alt: 'Portrait 2' },
  { id: 7, src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600', alt: 'Nature' },
  { id: 8, src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600', alt: 'Portrait 3' },
  { id: 9, src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600', alt: 'Urban' },
  { id: 10, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600', alt: 'Wedding' },
];

// Desktop scatter positions
const desktopPositions = [
  { rotation: -5, x: '5%', y: '10%', width: 280 },
  { rotation: 8, x: '60%', y: '5%', width: 350 },
  { rotation: -12, x: '35%', y: '25%', width: 260 },
  { rotation: 15, x: '75%', y: '35%', width: 300 },
  { rotation: -8, x: '10%', y: '45%', width: 240 },
  { rotation: 6, x: '45%', y: '55%', width: 280 },
  { rotation: -4, x: '70%', y: '60%', width: 320 },
  { rotation: 10, x: '20%', y: '70%', width: 250 },
  { rotation: -7, x: '55%', y: '80%', width: 290 },
  { rotation: 12, x: '5%', y: '85%', width: 270 },
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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-pure-black/95 backdrop-blur-md p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Close button */}
      <motion.button
        className="absolute top-4 right-4 md:top-8 md:right-8 font-mono text-xs md:text-sm tracking-widest text-off-white/60 hover:text-neon-pink transition-colors z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        ✕ CLOSE
      </motion.button>

      {/* Image */}
      <motion.div
        className="relative w-full max-w-[90vw] max-h-[80vh] md:max-w-[85vw] md:max-h-[85vh]"
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
          className="object-contain w-full h-auto max-h-[80vh]"
        />
        <motion.p
          className="absolute bottom-2 left-2 md:bottom-4 md:left-4 font-mono text-[10px] md:text-xs tracking-widest text-off-white/60"
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

// Mobile Collage Grid Component
function MobileCollageGrid({ images, onImageClick }: { images: typeof collageImages; onImageClick: (img: typeof collageImages[0]) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3 px-4">
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          className="relative aspect-[4/5] overflow-hidden cursor-pointer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05, duration: 0.5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onImageClick(image)}
          style={{
            transform: `rotate(${(index % 2 === 0 ? -2 : 2)}deg)`,
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pure-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
        </motion.div>
      ))}
    </div>
  );
}

// Desktop Collage Image Component
function DesktopCollageImage({
  image,
  position,
  onClick,
}: {
  image: typeof collageImages[0];
  position: typeof desktopPositions[0];
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute cursor-pointer hidden md:block"
      style={{
        left: position.x,
        top: position.y,
        width: position.width,
        zIndex: isHovered ? 50 : 10,
      }}
      initial={{ opacity: 0, scale: 0.8, rotate: position.rotation }}
      whileInView={{ opacity: 1, scale: 1, rotate: position.rotation }}
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
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Check for mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
        )}
      </AnimatePresence>

      {/* Hero Section - Full Screen */}
      <motion.section
        ref={heroRef}
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* Background subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-pure-black via-pure-black to-deep-blue/10" />

        {/* Main Title - Responsive sizing */}
        <motion.h1
          className="font-serif text-[clamp(2rem,12vw,12rem)] font-bold text-neon-pink tracking-tight relative z-10 text-center leading-none"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          CLICKSNMORE
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="font-mono text-[10px] sm:text-xs md:text-base tracking-[0.3em] sm:tracking-[0.5em] text-acid-green mt-4 md:mt-6 relative z-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          THE VIBE IS SET
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="font-mono text-[10px] md:text-xs tracking-widest text-off-white/40 mb-3 md:mb-4">SCROLL</span>
          <motion.div
            className="w-px h-10 md:h-16 bg-gradient-to-b from-off-white/40 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.section>

      {/* Collage Section */}
      <section className="relative py-16 md:py-32">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 md:mb-24 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] text-acid-green mb-2 md:mb-4">OUR WORK</p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-off-white">
            Moments <span className="text-neon-pink">Captured</span>
          </h2>
        </motion.div>

        {/* Mobile: Grid layout */}
        {isMobile ? (
          <MobileCollageGrid images={collageImages} onImageClick={setSelectedImage} />
        ) : (
          /* Desktop: Scattered layout */
          <div className="relative mx-auto max-w-7xl h-[150vh]">
            {collageImages.map((image, index) => (
              <DesktopCollageImage
                key={image.id}
                image={image}
                position={desktopPositions[index]}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-32 px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] text-off-white/40 mb-4 md:mb-6">
            READY TO CREATE?
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold text-off-white mb-6 md:mb-8 leading-tight">
            Let&apos;s make something <br className="hidden sm:block" />
            <span className="text-neon-pink">extraordinary</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mt-8 md:mt-12">
            <Link
              href="/work"
              className="w-full sm:w-auto font-mono text-xs md:text-sm tracking-widest text-off-white border border-off-white/30 px-6 md:px-8 py-3 md:py-4 hover:bg-off-white hover:text-pure-black transition-all duration-300 text-center"
            >
              VIEW PORTFOLIO →
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto font-mono text-xs md:text-sm tracking-widest text-pure-black bg-neon-pink px-6 md:px-8 py-3 md:py-4 hover:bg-acid-green transition-all duration-300 text-center"
            >
              GET IN TOUCH
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-16 px-4 md:px-8 border-t border-off-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <p className="font-mono text-[10px] md:text-xs tracking-widest text-off-white/30 text-center md:text-left">
            © 2024 CLICKSNMORE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 md:gap-8">
            <a href="#" className="font-mono text-[10px] md:text-xs tracking-widest text-off-white/50 hover:text-neon-pink transition-colors">
              INSTAGRAM
            </a>
            <a href="#" className="font-mono text-[10px] md:text-xs tracking-widest text-off-white/50 hover:text-neon-pink transition-colors">
              TWITTER
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
