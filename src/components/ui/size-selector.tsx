'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Ruler } from 'lucide-react';

interface SizeSelectorProps {
    sizes: number[];
    selectedSize: number | null;
    onSelectSize: (size: number) => void;
}

const sizeGuideData = [
    { size: 26, waist: '26"', hip: '35"', inseam: '30"' },
    { size: 27, waist: '27"', hip: '36"', inseam: '30"' },
    { size: 28, waist: '28"', hip: '37"', inseam: '30"' },
    { size: 29, waist: '29"', hip: '38"', inseam: '31"' },
    { size: 30, waist: '30"', hip: '39"', inseam: '31"' },
    { size: 31, waist: '31"', hip: '40"', inseam: '31"' },
    { size: 32, waist: '32"', hip: '41"', inseam: '32"' },
    { size: 33, waist: '33"', hip: '42"', inseam: '32"' },
    { size: 34, waist: '34"', hip: '43"', inseam: '32"' },
    { size: 36, waist: '36"', hip: '45"', inseam: '32"' },
    { size: 38, waist: '38"', hip: '47"', inseam: '32"' },
    { size: 40, waist: '40"', hip: '49"', inseam: '32"' },
];

export function SizeSelector({ sizes, selectedSize, onSelectSize }: SizeSelectorProps) {
    const [hoveredSize, setHoveredSize] = useState<number | null>(null);

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Select Size</span>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="link" size="sm" className="text-indigo-600 p-0 h-auto">
                            <Ruler className="h-4 w-4 mr-1" />
                            Size Guide
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Size Guide</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="py-2 text-left font-medium">Size</th>
                                        <th className="py-2 text-left font-medium">Waist</th>
                                        <th className="py-2 text-left font-medium">Hip</th>
                                        <th className="py-2 text-left font-medium">Inseam</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sizeGuideData.map((row) => (
                                        <tr key={row.size} className="border-b last:border-0">
                                            <td className="py-2 font-medium">{row.size}</td>
                                            <td className="py-2 text-gray-600">{row.waist}</td>
                                            <td className="py-2 text-gray-600">{row.hip}</td>
                                            <td className="py-2 text-gray-600">{row.inseam}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                    <motion.button
                        key={size}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative h-12 w-12 rounded-lg border-2 font-medium transition-all ${selectedSize === size
                                ? 'border-indigo-600 bg-indigo-600 text-white'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-300'
                            }`}
                        onClick={() => onSelectSize(size)}
                        onMouseEnter={() => setHoveredSize(size)}
                        onMouseLeave={() => setHoveredSize(null)}
                    >
                        {size}
                        {selectedSize === size && (
                            <motion.div
                                layoutId="selectedSize"
                                className="absolute inset-0 border-2 border-indigo-600 rounded-lg"
                                style={{ zIndex: -1 }}
                            />
                        )}
                    </motion.button>
                ))}
            </div>

            {hoveredSize && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-gray-500"
                >
                    Waist: {sizeGuideData.find((s) => s.size === hoveredSize)?.waist || 'N/A'}
                </motion.p>
            )}
        </div>
    );
}
