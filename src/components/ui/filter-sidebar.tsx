'use client';

import { X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

const fits = ['slim', 'regular', 'relaxed', 'wide-leg'] as const;
const washes = ['light', 'medium', 'dark', 'black'] as const;
const sizes = [26, 27, 28, 29, 30, 31, 32, 33, 34, 36, 38, 40];

interface FilterSidebarProps {
    selectedFits: string[];
    setSelectedFits: (fits: string[]) => void;
    selectedWashes: string[];
    setSelectedWashes: (washes: string[]) => void;
    selectedSizes: number[];
    setSelectedSizes: (sizes: number[]) => void;
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
    clearFilters: () => void;
}

function FilterContent({
    selectedFits,
    setSelectedFits,
    selectedWashes,
    setSelectedWashes,
    selectedSizes,
    setSelectedSizes,
    priceRange,
    setPriceRange,
    clearFilters,
}: FilterSidebarProps) {
    const toggleFit = (fit: string) => {
        setSelectedFits(
            selectedFits.includes(fit)
                ? selectedFits.filter((f) => f !== fit)
                : [...selectedFits, fit]
        );
    };

    const toggleWash = (wash: string) => {
        setSelectedWashes(
            selectedWashes.includes(wash)
                ? selectedWashes.filter((w) => w !== wash)
                : [...selectedWashes, wash]
        );
    };

    const toggleSize = (size: number) => {
        setSelectedSizes(
            selectedSizes.includes(size)
                ? selectedSizes.filter((s) => s !== size)
                : [...selectedSizes, size]
        );
    };

    const hasFilters =
        selectedFits.length > 0 ||
        selectedWashes.length > 0 ||
        selectedSizes.length > 0 ||
        priceRange[0] > 0 ||
        priceRange[1] < 200;

    return (
        <div className="space-y-6">
            {/* Clear Filters */}
            {hasFilters && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                    <X className="h-4 w-4 mr-2" />
                    Clear All Filters
                </Button>
            )}

            {/* Fit Filter */}
            <div>
                <Label className="text-sm font-semibold mb-3 block">Fit</Label>
                <div className="flex flex-wrap gap-2">
                    {fits.map((fit) => (
                        <Badge
                            key={fit}
                            variant={selectedFits.includes(fit) ? 'default' : 'outline'}
                            className={`cursor-pointer capitalize transition-all ${selectedFits.includes(fit)
                                    ? 'bg-indigo-600 hover:bg-indigo-700'
                                    : 'hover:bg-indigo-50 hover:text-indigo-600'
                                }`}
                            onClick={() => toggleFit(fit)}
                        >
                            {fit}
                        </Badge>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Wash Filter */}
            <div>
                <Label className="text-sm font-semibold mb-3 block">Wash</Label>
                <div className="flex flex-wrap gap-2">
                    {washes.map((wash) => (
                        <Badge
                            key={wash}
                            variant={selectedWashes.includes(wash) ? 'default' : 'outline'}
                            className={`cursor-pointer capitalize transition-all ${selectedWashes.includes(wash)
                                    ? 'bg-indigo-600 hover:bg-indigo-700'
                                    : 'hover:bg-indigo-50 hover:text-indigo-600'
                                }`}
                            onClick={() => toggleWash(wash)}
                        >
                            {wash}
                        </Badge>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Size Filter */}
            <div>
                <Label className="text-sm font-semibold mb-3 block">Size</Label>
                <div className="grid grid-cols-4 gap-2">
                    {sizes.map((size) => (
                        <Button
                            key={size}
                            variant={selectedSizes.includes(size) ? 'default' : 'outline'}
                            size="sm"
                            className={`h-9 ${selectedSizes.includes(size)
                                    ? 'bg-indigo-600 hover:bg-indigo-700'
                                    : ''
                                }`}
                            onClick={() => toggleSize(size)}
                        >
                            {size}
                        </Button>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Price Range */}
            <div>
                <Label className="text-sm font-semibold mb-3 block">Price Range</Label>
                <Slider
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    min={0}
                    max={200}
                    step={10}
                    className="my-4"
                />
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>
        </div>
    );
}

export function FilterSidebar(props: FilterSidebarProps) {
    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24 bg-white rounded-xl p-6 shadow-sm border">
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <SlidersHorizontal className="h-5 w-5" />
                        Filters
                    </h3>
                    <FilterContent {...props} />
                </div>
            </div>

            {/* Mobile Sheet */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden flex items-center gap-2">
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                    <SheetHeader>
                        <SheetTitle className="flex items-center gap-2">
                            <SlidersHorizontal className="h-5 w-5" />
                            Filters
                        </SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                        <FilterContent {...props} />
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
