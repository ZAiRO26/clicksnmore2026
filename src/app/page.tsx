'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

// 10 Dummy images from Unsplash
const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800',
    alt: 'Editorial portrait with bold styling',
    category: 'PORTRAIT',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000',
    alt: 'Mountain landscape dramatic lighting',
    category: 'LANDSCAPE',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    alt: 'Concert crowd raw energy',
    category: 'EVENTS',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600',
    alt: 'Fashion editorial urban',
    category: 'FASHION',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1552083375-1447ce886485?w=900',
    alt: 'Street photography nightlife',
    category: 'STREET',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
    alt: 'Portrait man natural light',
    category: 'PORTRAIT',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1000',
    alt: 'Misty nature ethereal',
    category: 'NATURE',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=700',
    alt: 'Close up portrait intimate',
    category: 'PORTRAIT',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
    alt: 'City lights urban abstract',
    category: 'URBAN',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900',
    alt: 'Documentary style raw',
    category: 'DOCUMENTARY',
  },
];

// Parallax row component
function ParallaxImage({
  image,
  index,
  onHover,
  onLeave
}: {
  image: typeof galleryImages[0];
  index: number;
  onHover: (id: number, e: React.MouseEvent) => void;
  onLeave: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Different parallax speeds based on position
  const speeds = [0.1, -0.15, 0.2, -0.1, 0.15, -0.2, 0.1, -0.15, 0.2, -0.1];
  const y = useTransform(scrollYProgress, [0, 1], [0, speeds[index % speeds.length] * 200]);

  return (
    <motion.div
      ref={ref}
      className={`scatter-item scatter-item-${index + 1} relative overflow-hidden group`}
      style={{ y }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={(e) => onHover(image.id, e)}
      onMouseLeave={onLeave}
      whileHover={{
        scale: 1.1,
        zIndex: 50,
        transition: { duration: 0.3 }
      }}
    >
      <div className="relative w-full h-full overflow-hidden border border-off-white/10">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-all duration-500 group-hover:grayscale-0 grayscale-[30%]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Overlay gradient on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Category tag */}
        <div className="absolute bottom-3 left-3 font-mono text-[10px] tracking-[0.3em] text-off-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {image.category}
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleHover = (id: number, e: React.MouseEvent) => {
    setHoveredId(id);
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (hoveredId !== null) {
      setCursorPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleLeave = () => {
    setHoveredId(null);
  };

  return (
    <div
      className="relative min-h-screen bg-background pt-32 pb-20"
      onMouseMove={handleMouseMove}
    >
      {/* Floating "View Project" cursor label */}
      <motion.div
        className="fixed pointer-events-none z-[200] font-mono text-xs tracking-widest text-neon-pink bg-black/90 px-3 py-2 border border-neon-pink/50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: hoveredId !== null ? 1 : 0,
          scale: hoveredId !== null ? 1 : 0.8,
          x: cursorPos.x + 20,
          y: cursorPos.y + 20,
        }}
        transition={{ duration: 0.15 }}
      >
        VIEW PROJECT →
      </motion.div>

      {/* Page Header */}
      <header className="px-6 md:px-12 mb-16">
        <motion.p
          className="font-mono text-xs tracking-[0.5em] text-acid-green mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          SELECTED WORK
        </motion.p>
        <motion.h2
          className="font-serif text-3xl md:text-5xl text-off-white/80 max-w-xl leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Raw moments. <br />
          <span className="text-neon-pink">Unapologetic</span> frames.
        </motion.h2>
      </header>

      {/* Scatter Grid Gallery */}
      <div className="scatter-grid px-4 md:px-8">
        {galleryImages.map((image, index) => (
          <ParallaxImage
            key={image.id}
            image={image}
            index={index}
            onHover={handleHover}
            onLeave={handleLeave}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.footer
        className="text-center mt-32 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p className="font-mono text-xs tracking-[0.4em] text-off-white/40 uppercase">
          Keep scrolling or explore →
        </p>
      </motion.footer>

      {/* Scatter Grid CSS */}
      <style jsx global>{`
        .scatter-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-auto-rows: minmax(200px, auto);
          grid-auto-flow: dense;
          gap: 8px;
          max-width: 1600px;
          margin: 0 auto;
        }

        /* Irregular sizing with nth-child - editorial chaos */
        .scatter-item-1 {
          grid-column: 1 / 6;
          grid-row: span 2;
          margin-top: 40px;
          margin-left: -20px;
        }

        .scatter-item-2 {
          grid-column: 5 / 10;
          grid-row: span 3;
          margin-top: -30px;
          z-index: 2;
        }

        .scatter-item-3 {
          grid-column: 9 / 13;
          grid-row: span 2;
          margin-top: 80px;
          margin-right: -15px;
        }

        .scatter-item-4 {
          grid-column: 1 / 5;
          grid-row: span 2;
          margin-left: 30px;
          margin-top: -60px;
          z-index: 3;
        }

        .scatter-item-5 {
          grid-column: 4 / 9;
          grid-row: span 3;
          margin-top: 20px;
        }

        .scatter-item-6 {
          grid-column: 8 / 13;
          grid-row: span 2;
          margin-top: -40px;
          margin-right: 20px;
          z-index: 2;
        }

        .scatter-item-7 {
          grid-column: 1 / 7;
          grid-row: span 3;
          margin-left: -30px;
          margin-top: 50px;
        }

        .scatter-item-8 {
          grid-column: 6 / 10;
          grid-row: span 2;
          margin-top: -80px;
          z-index: 4;
        }

        .scatter-item-9 {
          grid-column: 9 / 13;
          grid-row: span 2;
          margin-top: 30px;
        }

        .scatter-item-10 {
          grid-column: 2 / 8;
          grid-row: span 2;
          margin-top: -50px;
          margin-bottom: 40px;
        }

        /* Mobile responsive - stack vertically */
        @media (max-width: 768px) {
          .scatter-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .scatter-item-1,
          .scatter-item-2,
          .scatter-item-3,
          .scatter-item-4,
          .scatter-item-5,
          .scatter-item-6,
          .scatter-item-7,
          .scatter-item-8,
          .scatter-item-9,
          .scatter-item-10 {
            grid-column: 1 / -1;
            grid-row: span 1;
            margin: 0;
            height: 300px;
          }

          .scatter-item-2,
          .scatter-item-5,
          .scatter-item-7 {
            height: 400px;
          }
        }
      `}</style>
    </div>
  );
}
