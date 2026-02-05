'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import { useCart } from '@/context/cart-context';
import { useState } from 'react';

interface ProductCardProps {
    product: Product;
    index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const { addItem } = useCart();

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // Add with default size and color
        addItem(product, product.sizes[Math.floor(product.sizes.length / 2)], product.colors[0].name);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link href={`/shop/${product.slug}`}>
                <div
                    className="group relative bg-white rounded-lg sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Overlay on hover */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            className="absolute inset-0 bg-black/20 flex items-center justify-center gap-2"
                        >
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="h-10 w-10 rounded-full bg-white/90 hover:bg-white"
                                    onClick={handleQuickAdd}
                                >
                                    <ShoppingBag className="h-4 w-4" />
                                </Button>
                            </motion.div>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                                transition={{ delay: 0.15 }}
                            >
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="h-10 w-10 rounded-full bg-white/90 hover:bg-white"
                                >
                                    <Eye className="h-4 w-4" />
                                </Button>
                            </motion.div>
                        </motion.div>

                        {/* Badges */}
                        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1 sm:gap-2">
                            {product.new && (
                                <Badge className="bg-green-500 hover:bg-green-600 text-[10px] sm:text-xs px-1.5 sm:px-2.5 py-0 sm:py-0.5">New</Badge>
                            )}
                            {product.bestseller && (
                                <Badge className="bg-orange-500 hover:bg-orange-600 text-[10px] sm:text-xs px-1.5 sm:px-2.5 py-0 sm:py-0.5">Bestseller</Badge>
                            )}
                            {product.originalPrice && (
                                <Badge variant="destructive" className="text-[10px] sm:text-xs px-1.5 sm:px-2.5 py-0 sm:py-0.5">Sale</Badge>
                            )}
                        </div>

                        {/* Wishlist Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 sm:top-3 right-2 sm:right-3 h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-white/80 hover:bg-white"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsWishlisted(!isWishlisted);
                            }}
                        >
                            <Heart
                                className={`h-3 w-3 sm:h-4 sm:w-4 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
                                    }`}
                            />
                        </Button>
                    </div>

                    {/* Details */}
                    <div className="p-2.5 sm:p-4">
                        <div className="flex items-start justify-between gap-1 sm:gap-2 mb-1.5 sm:mb-2">
                            <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1 text-xs sm:text-sm md:text-base">
                                {product.name}
                            </h3>
                        </div>

                        <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                            <Badge variant="outline" className="text-xs capitalize">
                                {product.fit}
                            </Badge>
                            <Badge variant="outline" className="text-xs capitalize">
                                {product.wash}
                            </Badge>
                        </div>

                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <span className="text-sm sm:text-base md:text-lg font-bold text-indigo-600">
                                ${product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                                <span className="text-[10px] sm:text-xs md:text-sm text-gray-400 line-through">
                                    ${product.originalPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* Color Options */}
                        <div className="hidden sm:flex items-center gap-1 mt-2 sm:mt-3">
                            {product.colors.map((color) => (
                                <div
                                    key={color.name}
                                    className="w-5 h-5 rounded-full border-2 border-gray-200"
                                    style={{ backgroundColor: color.hex }}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
