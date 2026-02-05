'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '@/data/products';

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product, size: number, color: string, quantity?: number) => void;
    removeItem: (productId: string, size: number, color: string) => void;
    updateQuantity: (productId: string, size: number, color: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('denim-store-cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart:', e);
            }
        }
        setIsHydrated(true);
    }, []);

    // Save cart to localStorage when it changes
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem('denim-store-cart', JSON.stringify(items));
        }
    }, [items, isHydrated]);

    const addItem = (product: Product, size: number, color: string, quantity = 1) => {
        setItems(currentItems => {
            const existingIndex = currentItems.findIndex(
                item => item.product.id === product.id && item.size === size && item.color === color
            );

            if (existingIndex > -1) {
                const updated = [...currentItems];
                updated[existingIndex].quantity += quantity;
                return updated;
            }

            return [...currentItems, { product, size, color, quantity }];
        });
        setIsOpen(true);
    };

    const removeItem = (productId: string, size: number, color: string) => {
        setItems(currentItems =>
            currentItems.filter(
                item => !(item.product.id === productId && item.size === size && item.color === color)
            )
        );
    };

    const updateQuantity = (productId: string, size: number, color: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId, size, color);
            return;
        }

        setItems(currentItems =>
            currentItems.map(item =>
                item.product.id === productId && item.size === size && item.color === color
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
                isOpen,
                setIsOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
