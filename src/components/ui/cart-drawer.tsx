'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, X } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/cart-context';

interface CartDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
    const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-lg flex flex-col">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5" />
                        Shopping Cart ({totalItems})
                    </SheetTitle>
                </SheetHeader>

                {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                        >
                            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                        </motion.div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                        <p className="text-gray-500 mb-6">Add some jeans to get started!</p>
                        <Button onClick={() => onOpenChange(false)} asChild>
                            <Link href="/shop">Continue Shopping</Link>
                        </Button>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="flex-1 -mx-6 px-6">
                            <div className="space-y-4 py-4">
                                {items.map((item, index) => (
                                    <motion.div
                                        key={`${item.product.id}-${item.size}-${item.color}`}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                                    >
                                        <div className="relative w-20 h-24 rounded-md overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-gray-900 truncate">
                                                {item.product.name}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                Size: {item.size} | {item.color}
                                            </p>
                                            <p className="text-sm font-semibold text-indigo-600 mt-1">
                                                ${item.product.price.toFixed(2)}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={() =>
                                                        updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)
                                                    }
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="w-8 text-center text-sm font-medium">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={() =>
                                                        updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)
                                                    }
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-gray-400 hover:text-red-500"
                                            onClick={() => removeItem(item.product.id, item.size, item.color)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </motion.div>
                                ))}
                            </div>
                        </ScrollArea>

                        <div className="pt-4 space-y-4">
                            <Separator />
                            <div className="flex items-center justify-between text-lg font-semibold">
                                <span>Total</span>
                                <span className="text-indigo-600">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="grid gap-2">
                                <Button size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700" asChild>
                                    <Link href="/checkout" onClick={() => onOpenChange(false)}>
                                        Checkout
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full"
                                    onClick={() => onOpenChange(false)}
                                >
                                    Continue Shopping
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}
