'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Minus, Plus, Share2, Truck, RefreshCw, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { SizeSelector } from '@/components/ui/size-selector';
import { ProductCard } from '@/components/ui/product-card';
import { useCart } from '@/context/cart-context';
import { getProductBySlug, products } from '@/data/products';

export default function ProductPage() {
    const params = useParams();
    const slug = params.slug as string;
    const product = getProductBySlug(slug);

    const [selectedSize, setSelectedSize] = useState<number | null>(null);
    const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || '');
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const { addItem } = useCart();

    if (!product) {
        return (
            <div className="pt-24 pb-20 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
                <Button asChild>
                    <Link href="/shop">Back to Shop</Link>
                </Button>
            </div>
        );
    }

    const relatedProducts = products
        .filter((p) => p.id !== product.id && (p.fit === product.fit || p.wash === product.wash))
        .slice(0, 4);

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }
        addItem(product, selectedSize, selectedColor, quantity);
    };

    return (
        <div className="pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Button variant="ghost" asChild className="gap-2">
                        <Link href="/shop">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Shop
                        </Link>
                    </Button>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100">
                            <Image
                                src={product.images[selectedImage]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* Badges */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                {product.new && (
                                    <Badge className="bg-green-500">New</Badge>
                                )}
                                {product.bestseller && (
                                    <Badge className="bg-orange-500">Bestseller</Badge>
                                )}
                                {product.originalPrice && (
                                    <Badge variant="destructive">Sale</Badge>
                                )}
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative w-14 h-18 sm:w-20 sm:h-24 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${selectedImage === index ? 'border-indigo-600' : 'border-transparent hover:border-gray-300'
                                        }`}
                                >
                                    <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Product Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        {/* Title & Price */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="capitalize">{product.fit}</Badge>
                                <Badge variant="outline" className="capitalize">{product.wash} Wash</Badge>
                            </div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">{product.name}</h1>
                            <div className="flex items-center gap-3">
                                <span className="text-2xl sm:text-3xl font-bold text-indigo-600">${product.price.toFixed(2)}</span>
                                {product.originalPrice && (
                                    <span className="text-lg sm:text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                                )}
                            </div>
                        </div>

                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{product.description}</p>

                        <Separator />

                        {/* Color Selection */}
                        <div>
                            <span className="text-sm font-medium text-gray-700 mb-3 block">
                                Color: <span className="text-gray-900">{selectedColor}</span>
                            </span>
                            <div className="flex gap-2">
                                {product.colors.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color.name)}
                                        className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === color.name ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-gray-200'
                                            }`}
                                        style={{ backgroundColor: color.hex }}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <SizeSelector
                            sizes={product.sizes}
                            selectedSize={selectedSize}
                            onSelectSize={setSelectedSize}
                        />

                        {/* Quantity */}
                        <div>
                            <span className="text-sm font-medium text-gray-700 mb-3 block">Quantity</span>
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <Button
                                size="lg"
                                className="flex-1 bg-indigo-600 hover:bg-indigo-700 h-11 sm:h-14 text-sm sm:text-lg"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-11 sm:h-14"
                                onClick={() => setIsWishlisted(!isWishlisted)}
                            >
                                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                            </Button>
                            <Button size="lg" variant="outline" className="h-11 sm:h-14">
                                <Share2 className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-4 py-4">
                            <div className="text-center">
                                <Truck className="h-5 w-5 sm:h-6 sm:w-6 mx-auto text-indigo-600 mb-1 sm:mb-2" />
                                <span className="text-[10px] sm:text-xs text-gray-600">Free Shipping</span>
                            </div>
                            <div className="text-center">
                                <RefreshCw className="h-5 w-5 sm:h-6 sm:w-6 mx-auto text-indigo-600 mb-1 sm:mb-2" />
                                <span className="text-[10px] sm:text-xs text-gray-600">Easy Returns</span>
                            </div>
                            <div className="text-center">
                                <Shield className="h-5 w-5 sm:h-6 sm:w-6 mx-auto text-indigo-600 mb-1 sm:mb-2" />
                                <span className="text-[10px] sm:text-xs text-gray-600">Secure Payment</span>
                            </div>
                        </div>

                        {/* Product Details Accordion */}
                        <Accordion type="single" collapsible defaultValue="details">
                            <AccordionItem value="details">
                                <AccordionTrigger>Product Details</AccordionTrigger>
                                <AccordionContent>
                                    <ul className="space-y-2 text-gray-600">
                                        <li>• Fit: <span className="capitalize">{product.fit}</span></li>
                                        <li>• Wash: <span className="capitalize">{product.wash}</span></li>
                                        <li>• 98% Cotton, 2% Elastane</li>
                                        <li>• Mid-rise waist</li>
                                        <li>• Classic 5-pocket styling</li>
                                        <li>• Button fly closure</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="care">
                                <AccordionTrigger>Care Instructions</AccordionTrigger>
                                <AccordionContent>
                                    <ul className="space-y-2 text-gray-600">
                                        <li>• Machine wash cold, inside out</li>
                                        <li>• Do not bleach</li>
                                        <li>• Tumble dry low</li>
                                        <li>• Iron on low heat if needed</li>
                                        <li>• Do not dry clean</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="shipping">
                                <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                                <AccordionContent>
                                    <ul className="space-y-2 text-gray-600">
                                        <li>• Free standard shipping on orders over $100</li>
                                        <li>• Standard shipping: 5-7 business days</li>
                                        <li>• Express shipping: 2-3 business days</li>
                                        <li>• Free returns within 30 days</li>
                                        <li>• Items must be unworn with tags attached</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </motion.div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="mt-20">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">You May Also Like</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                            {relatedProducts.map((product, index) => (
                                <ProductCard key={product.id} product={product} index={index} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
