import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const footerLinks = {
    shop: [
        { label: 'All Jeans', href: '/shop' },
        { label: 'Slim Fit', href: '/shop?fit=slim' },
        { label: 'Relaxed Fit', href: '/shop?fit=relaxed' },
        { label: 'Wide Leg', href: '/shop?fit=wide-leg' },
        { label: 'New Arrivals', href: '/shop?new=true' },
    ],
    help: [
        { label: 'Size Guide', href: '#' },
        { label: 'Shipping & Returns', href: '#' },
        { label: 'FAQ', href: '#' },
        { label: 'Contact Us', href: '#' },
    ],
    company: [
        { label: 'About Us', href: '#' },
        { label: 'Sustainability', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press', href: '#' },
    ],
};

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10 sm:py-16">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
                    {/* Brand & Newsletter */}
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="inline-block mb-3 sm:mb-4">
                            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                                DENIM
                            </span>
                        </Link>
                        <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 max-w-sm">
                            Premium quality jeans crafted with care. Discover the perfect fit that moves with you.
                        </p>
                        <div className="space-y-3">
                            <p className="text-xs sm:text-sm font-medium text-white">Subscribe to our newsletter</p>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 text-sm"
                                />
                                <Button className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto text-sm">
                                    Subscribe
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Shop</h3>
                        <ul className="space-y-2 sm:space-y-3">
                            {footerLinks.shop.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="hover:text-indigo-400 transition-colors text-xs sm:text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Help</h3>
                        <ul className="space-y-2 sm:space-y-3">
                            {footerLinks.help.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="hover:text-indigo-400 transition-colors text-xs sm:text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h3>
                        <ul className="space-y-2 sm:space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="hover:text-indigo-400 transition-colors text-xs sm:text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Separator className="my-6 sm:my-8 bg-gray-800" />

                {/* Bottom */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                    <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
                        © {new Date().getFullYear()} DENIM Store. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-4">
                        <a href="#" className="hover:text-indigo-400 transition-colors">
                            <Facebook className="h-5 w-5" />
                        </a>
                        <a href="#" className="hover:text-indigo-400 transition-colors">
                            <Instagram className="h-5 w-5" />
                        </a>
                        <a href="#" className="hover:text-indigo-400 transition-colors">
                            <Twitter className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
