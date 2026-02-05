'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/cart-context';

export default function CartPage() {
    const { items, removeItem, updateQuantity, totalPrice } = useCart();

    if (items.length === 0) {
        return (
            <div className="pt-24 pb-20 min-h-[80vh] flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <ShoppingBag className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
                    <p className="text-gray-500 mb-8">Looks like you haven&apos;t added any items yet.</p>
                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700" asChild>
                        <Link href="/shop">Start Shopping</Link>
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Button variant="ghost" asChild className="mb-4 gap-2">
                        <Link href="/shop">
                            <ArrowLeft className="h-4 w-4" />
                            Continue Shopping
                        </Link>
                    </Button>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Shopping Cart</h1>
                    <p className="text-gray-600 mt-2">{items.length} item{items.length > 1 ? 's' : ''} in your cart</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item, index) => (
                            <motion.div
                                key={`${item.product.id}-${item.size}-${item.color}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 md:p-6 bg-white rounded-xl sm:rounded-2xl shadow-sm"
                            >
                                <div className="relative w-20 h-26 sm:w-24 sm:h-32 md:w-32 md:h-40 rounded-lg overflow-hidden flex-shrink-0">
                                    <Image
                                        src={item.product.images[0]}
                                        alt={item.product.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start gap-2">
                                        <div>
                                            <Link
                                                href={`/shop/${item.product.slug}`}
                                                className="font-semibold text-gray-900 hover:text-indigo-600 line-clamp-1 text-sm sm:text-base"
                                            >
                                                {item.product.name}
                                            </Link>
                                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                                Size: {item.size} | Color: {item.color}
                                            </p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-gray-400 hover:text-red-500"
                                            onClick={() => removeItem(item.product.id, item.size, item.color)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() =>
                                                    updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)
                                                }
                                            >
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() =>
                                                    updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)
                                                }
                                            >
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                        </div>
                                        <p className="text-base sm:text-lg font-semibold text-indigo-600">
                                            ${(item.product.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 sticky top-24">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Order Summary</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>{totalPrice >= 100 ? 'Free' : '$9.99'}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span>${(totalPrice * 0.08).toFixed(2)}</span>
                                </div>
                            </div>

                            <Separator className="my-4" />

                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span className="text-indigo-600">
                                    ${(totalPrice + (totalPrice < 100 ? 9.99 : 0) + totalPrice * 0.08).toFixed(2)}
                                </span>
                            </div>

                            {totalPrice < 100 && (
                                <p className="text-sm text-gray-500 mt-4">
                                    Add ${(100 - totalPrice).toFixed(2)} more for free shipping!
                                </p>
                            )}

                            <Button
                                size="lg"
                                className="w-full mt-4 sm:mt-6 bg-indigo-600 hover:bg-indigo-700 h-12 sm:h-14 text-base sm:text-lg"
                                asChild
                            >
                                <Link href="/checkout">Proceed to Checkout</Link>
                            </Button>

                            {/* Promo Code */}
                            <div className="mt-6">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Promo code"
                                        className="flex-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <Button variant="outline">Apply</Button>
                                </div>
                            </div>

                            {/* Security Badges */}
                            <div className="mt-6 pt-6 border-t">
                                <p className="text-xs text-gray-500 text-center">
                                    🔒 Secure checkout powered by Stripe
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
