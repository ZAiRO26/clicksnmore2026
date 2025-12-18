// Sample image data for the portfolio
// Using high-quality Unsplash photography for demo

export interface PortfolioImage {
    id: string;
    src: string;
    alt: string;
    category: string;
    aspectRatio: 'portrait' | 'landscape' | 'square';
    size: 'small' | 'medium' | 'large';
    color: string;
}

export const portfolioImages: PortfolioImage[] = [
    {
        id: '1',
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        alt: 'Mountain landscape at sunset',
        category: 'nature',
        aspectRatio: 'landscape',
        size: 'large',
        color: '#FF006E',
    },
    {
        id: '2',
        src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600',
        alt: 'Portrait of woman with bold makeup',
        category: 'portrait',
        aspectRatio: 'portrait',
        size: 'medium',
        color: '#3A86FF',
    },
    {
        id: '3',
        src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600',
        alt: 'Team working on laptops',
        category: 'corporate',
        aspectRatio: 'landscape',
        size: 'medium',
        color: '#8AFF80',
    },
    {
        id: '4',
        src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600',
        alt: 'Concert crowd with stage lights',
        category: 'events',
        aspectRatio: 'landscape',
        size: 'large',
        color: '#FFFF00',
    },
    {
        id: '5',
        src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500',
        alt: 'Fashion model in urban setting',
        category: 'fashion',
        aspectRatio: 'portrait',
        size: 'small',
        color: '#FF6B35',
    },
    {
        id: '6',
        src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600',
        alt: 'Abstract technology',
        category: 'abstract',
        aspectRatio: 'square',
        size: 'medium',
        color: '#3A86FF',
    },
    {
        id: '7',
        src: 'https://images.unsplash.com/photo-1552083375-1447ce886485?w=700',
        alt: 'Street photography at night',
        category: 'street',
        aspectRatio: 'landscape',
        size: 'large',
        color: '#FF006E',
    },
    {
        id: '8',
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
        alt: 'Portrait man with beard',
        category: 'portrait',
        aspectRatio: 'portrait',
        size: 'small',
        color: '#8AFF80',
    },
    {
        id: '9',
        src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
        alt: 'Misty forest morning',
        category: 'nature',
        aspectRatio: 'landscape',
        size: 'large',
        color: '#FFFF00',
    },
    {
        id: '10',
        src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        alt: 'Product watch on surface',
        category: 'product',
        aspectRatio: 'square',
        size: 'small',
        color: '#FF6B35',
    },
    {
        id: '11',
        src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600',
        alt: 'Close up portrait',
        category: 'portrait',
        aspectRatio: 'portrait',
        size: 'medium',
        color: '#3A86FF',
    },
    {
        id: '12',
        src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700',
        alt: 'City lights at night',
        category: 'urban',
        aspectRatio: 'landscape',
        size: 'medium',
        color: '#FF006E',
    },
];

export const categories = [
    'all',
    'portrait',
    'nature',
    'fashion',
    'events',
    'street',
    'urban',
    'product',
    'corporate',
    'abstract',
];
