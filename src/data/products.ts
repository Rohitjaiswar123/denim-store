export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number;
    description: string;
    fit: 'slim' | 'regular' | 'relaxed' | 'wide-leg';
    wash: 'light' | 'medium' | 'dark' | 'black';
    sizes: number[];
    colors: { name: string; hex: string }[];
    images: string[];
    featured: boolean;
    new: boolean;
    bestseller: boolean;
}

export interface CartItem {
    product: Product;
    size: number;
    color: string;
    quantity: number;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic Slim Fit Jeans',
        slug: 'classic-slim-fit-jeans',
        price: 89.99,
        originalPrice: 120.00,
        description: 'Our signature slim fit jeans crafted from premium Japanese selvedge denim. Features a modern tapered leg and comfortable stretch for all-day wear.',
        fit: 'slim',
        wash: 'medium',
        sizes: [28, 29, 30, 31, 32, 33, 34, 36, 38],
        colors: [
            { name: 'Indigo', hex: '#3d5a80' },
            { name: 'Stone Wash', hex: '#6b7b8c' },
        ],
        images: [
            'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
            'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80',
        ],
        featured: true,
        new: false,
        bestseller: true,
    },
    {
        id: '2',
        name: 'Vintage Dark Wash Jeans',
        slug: 'vintage-dark-wash-jeans',
        price: 109.99,
        description: 'Timeless dark wash jeans with vintage-inspired whisker details. Made from 100% organic cotton with a regular fit for classic comfort.',
        fit: 'regular',
        wash: 'dark',
        sizes: [28, 29, 30, 31, 32, 33, 34, 36],
        colors: [
            { name: 'Dark Indigo', hex: '#1a2b4a' },
            { name: 'Midnight', hex: '#0f1626' },
        ],
        images: [
            'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80',
            'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80',
        ],
        featured: true,
        new: true,
        bestseller: false,
    },
    {
        id: '3',
        name: 'Relaxed Comfort Jeans',
        slug: 'relaxed-comfort-jeans',
        price: 79.99,
        description: 'Ultimate comfort meets style with our relaxed fit jeans. Featuring extra room through the thigh and a straight leg for easy movement.',
        fit: 'relaxed',
        wash: 'light',
        sizes: [30, 31, 32, 33, 34, 36, 38, 40],
        colors: [
            { name: 'Light Wash', hex: '#a8b5c4' },
            { name: 'Bleached', hex: '#c4cdd6' },
        ],
        images: [
            'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800&q=80',
            'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80',
        ],
        featured: false,
        new: false,
        bestseller: true,
    },
    {
        id: '4',
        name: 'Modern Wide-Leg Jeans',
        slug: 'modern-wide-leg-jeans',
        price: 119.99,
        description: 'Make a statement with our wide-leg silhouette. High-rise waist with a dramatic flare that creates an elegant, elongated look.',
        fit: 'wide-leg',
        wash: 'medium',
        sizes: [26, 27, 28, 29, 30, 31, 32],
        colors: [
            { name: 'Classic Blue', hex: '#4a6fa5' },
            { name: 'Faded Blue', hex: '#7899b8' },
        ],
        images: [
            'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&q=80',
            'https://images.unsplash.com/photo-1551854838-212c50b4c184?w=800&q=80',
        ],
        featured: true,
        new: true,
        bestseller: false,
    },
    {
        id: '5',
        name: 'Black Skinny Jeans',
        slug: 'black-skinny-jeans',
        price: 94.99,
        originalPrice: 115.00,
        description: 'Sleek black skinny jeans with maximum stretch for a perfect fit. The ultimate wardrobe staple that goes with everything.',
        fit: 'slim',
        wash: 'black',
        sizes: [28, 29, 30, 31, 32, 33, 34],
        colors: [
            { name: 'Jet Black', hex: '#0a0a0a' },
            { name: 'Washed Black', hex: '#2a2a2a' },
        ],
        images: [
            'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=800&q=80',
            'https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=800&q=80',
        ],
        featured: true,
        new: false,
        bestseller: true,
    },
    {
        id: '6',
        name: 'Heritage Straight Leg',
        slug: 'heritage-straight-leg',
        price: 99.99,
        description: 'Classic American heritage style with a straight leg cut. Constructed from heavyweight denim that gets better with every wear.',
        fit: 'regular',
        wash: 'medium',
        sizes: [29, 30, 31, 32, 33, 34, 36, 38],
        colors: [
            { name: 'Vintage Indigo', hex: '#4a5568' },
        ],
        images: [
            'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=800&q=80',
            'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80',
        ],
        featured: false,
        new: false,
        bestseller: false,
    },
    {
        id: '7',
        name: 'Light Wash Boyfriend Jeans',
        slug: 'light-wash-boyfriend-jeans',
        price: 84.99,
        description: 'Effortlessly cool boyfriend jeans with a relaxed, lived-in look. Light wash with subtle distressing for casual weekend vibes.',
        fit: 'relaxed',
        wash: 'light',
        sizes: [26, 27, 28, 29, 30, 31, 32],
        colors: [
            { name: 'Sun Bleached', hex: '#b8c5d4' },
            { name: 'Sky Blue', hex: '#87a3c4' },
        ],
        images: [
            'https://images.unsplash.com/photo-1608234807905-4466023792f5?w=800&q=80',
            'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80',
        ],
        featured: false,
        new: true,
        bestseller: false,
    },
    {
        id: '8',
        name: 'Premium Selvedge Jeans',
        slug: 'premium-selvedge-jeans',
        price: 149.99,
        description: 'Crafted from premium Japanese selvedge denim. Raw, unwashed construction that molds to your body for a truly personal fit over time.',
        fit: 'slim',
        wash: 'dark',
        sizes: [28, 29, 30, 31, 32, 33, 34, 36],
        colors: [
            { name: 'Raw Indigo', hex: '#1e3a5f' },
        ],
        images: [
            'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80',
        ],
        featured: true,
        new: false,
        bestseller: true,
    },
];

export const getFeaturedProducts = () => products.filter(p => p.featured);
export const getNewProducts = () => products.filter(p => p.new);
export const getBestsellers = () => products.filter(p => p.bestseller);
export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
