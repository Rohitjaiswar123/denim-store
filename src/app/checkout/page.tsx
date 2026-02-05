'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, CreditCard, Lock, Truck, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/cart-context';

const steps = [
    { id: 1, name: 'Information', icon: User },
    { id: 2, name: 'Shipping', icon: Truck },
    { id: 3, name: 'Payment', icon: CreditCard },
];

export default function CheckoutPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: 'United States',
        phone: '',
        shippingMethod: 'standard',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: '',
    });

    const { items, totalPrice, clearCart } = useCart();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            // Simulate order placement
            alert('Order placed successfully! (This is a demo)');
            clearCart();
            window.location.href = '/';
        }
    };

    const shippingCost = totalPrice >= 100 ? 0 : formData.shippingMethod === 'express' ? 19.99 : 9.99;
    const tax = totalPrice * 0.08;
    const orderTotal = totalPrice + shippingCost + tax;

    if (items.length === 0) {
        return (
            <div className="pt-24 pb-20 min-h-[80vh] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
                    <Button asChild>
                        <Link href="/shop">Continue Shopping</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Button variant="ghost" asChild className="mb-4 gap-2">
                        <Link href="/cart">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Cart
                        </Link>
                    </Button>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Checkout</h1>
                </motion.div>

                {/* Progress Steps */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-center">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex items-center">
                                <div
                                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${currentStep >= step.id
                                        ? 'bg-indigo-600 border-indigo-600 text-white'
                                        : 'border-gray-300 text-gray-400'
                                        }`}
                                >
                                    {currentStep > step.id ? (
                                        <Check className="h-5 w-5" />
                                    ) : (
                                        <step.icon className="h-5 w-5" />
                                    )}
                                </div>
                                <span
                                    className={`ml-2 text-sm font-medium hidden sm:block ${currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
                                        }`}
                                >
                                    {step.name}
                                </span>
                                {index < steps.length - 1 && (
                                    <div
                                        className={`w-12 sm:w-24 h-0.5 mx-2 sm:mx-4 ${currentStep > step.id ? 'bg-indigo-600' : 'bg-gray-300'
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>

                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="your@email.com"
                                            required
                                            className="mt-1"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input
                                                id="lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="+1 (555) 000-0000"
                                            className="mt-1"
                                        />
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Shipping Address</h2>

                                    <div>
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder="123 Main Street"
                                            required
                                            className="mt-1"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="city">City</Label>
                                            <Input
                                                id="city"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="state">State</Label>
                                            <Input
                                                id="state"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="zip">ZIP Code</Label>
                                            <Input
                                                id="zip"
                                                name="zip"
                                                value={formData.zip}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="country">Country</Label>
                                            <Input
                                                id="country"
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>

                                    <Separator className="my-6" />

                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Shipping Method</h2>
                                    <div className="space-y-3">
                                        <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${formData.shippingMethod === 'standard' ? 'border-indigo-600 bg-indigo-50' : 'hover:border-gray-400'}`}>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="shippingMethod"
                                                    value="standard"
                                                    checked={formData.shippingMethod === 'standard'}
                                                    onChange={handleInputChange}
                                                    className="w-4 h-4 text-indigo-600"
                                                />
                                                <div>
                                                    <p className="font-medium">Standard Shipping</p>
                                                    <p className="text-sm text-gray-500">5-7 business days</p>
                                                </div>
                                            </div>
                                            <span className="font-medium">{totalPrice >= 100 ? 'Free' : '$9.99'}</span>
                                        </label>
                                        <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${formData.shippingMethod === 'express' ? 'border-indigo-600 bg-indigo-50' : 'hover:border-gray-400'}`}>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="shippingMethod"
                                                    value="express"
                                                    checked={formData.shippingMethod === 'express'}
                                                    onChange={handleInputChange}
                                                    className="w-4 h-4 text-indigo-600"
                                                />
                                                <div>
                                                    <p className="font-medium">Express Shipping</p>
                                                    <p className="text-sm text-gray-500">2-3 business days</p>
                                                </div>
                                            </div>
                                            <span className="font-medium">$19.99</span>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="space-y-6">
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Payment Details</h2>

                                    <div>
                                        <Label htmlFor="cardName">Name on Card</Label>
                                        <Input
                                            id="cardName"
                                            name="cardName"
                                            value={formData.cardName}
                                            onChange={handleInputChange}
                                            required
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="cardNumber">Card Number</Label>
                                        <Input
                                            id="cardNumber"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleInputChange}
                                            placeholder="1234 5678 9012 3456"
                                            required
                                            className="mt-1"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="expiryDate">Expiry Date</Label>
                                            <Input
                                                id="expiryDate"
                                                name="expiryDate"
                                                value={formData.expiryDate}
                                                onChange={handleInputChange}
                                                placeholder="MM/YY"
                                                required
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="cvv">CVV</Label>
                                            <Input
                                                id="cvv"
                                                name="cvv"
                                                value={formData.cvv}
                                                onChange={handleInputChange}
                                                placeholder="123"
                                                required
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 sm:gap-2 p-4 bg-gray-50 rounded-lg">
                                        <Lock className="h-5 w-5 text-green-600" />
                                        <p className="text-sm text-gray-600">Your payment information is encrypted and secure</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-4 mt-8">
                                {currentStep > 1 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="lg"
                                        className="flex-1"
                                        onClick={() => setCurrentStep(currentStep - 1)}
                                    >
                                        Back
                                    </Button>
                                )}
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="flex-1 h-11 sm:h-14 text-base sm:text-lg bg-indigo-600 hover:bg-indigo-700"
                                >
                                    {currentStep === 3 ? 'Place Order' : 'Continue'}
                                </Button>
                            </div>
                        </form>
                    </motion.div>

                    {/* Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="bg-white rounded-xl sm:rounded-2xl border p-4 sm:p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                {items.map((item) => (
                                    <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4">
                                        <div className="relative w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover"
                                            />
                                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 truncate">{item.product.name}</p>
                                            <p className="text-sm text-gray-500">Size: {item.size} | {item.color}</p>
                                        </div>
                                        <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <Separator className="my-6" />

                            <div className="space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                            </div>

                            <Separator className="my-4" />

                            <div className="flex justify-between text-xl font-bold">
                                <span>Total</span>
                                <span className="text-indigo-600">${orderTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
