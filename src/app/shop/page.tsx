'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductCard } from '@/components/ui/product-card';
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { products } from '@/data/products';

function ShopContent() {
    const searchParams = useSearchParams();

    // Get initial filters from URL
    const initialFit = searchParams.get('fit');
    const initialNew = searchParams.get('new');

    const [selectedFits, setSelectedFits] = useState<string[]>(initialFit ? [initialFit] : []);
    const [selectedWashes, setSelectedWashes] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
    const [sortBy, setSortBy] = useState('featured');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const clearFilters = () => {
        setSelectedFits([]);
        setSelectedWashes([]);
        setSelectedSizes([]);
        setPriceRange([0, 200]);
    };

    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Filter by new arrivals
        if (initialNew === 'true') {
            result = result.filter((p) => p.new);
        }

        // Filter by fit
        if (selectedFits.length > 0) {
            result = result.filter((p) => selectedFits.includes(p.fit));
        }

        // Filter by wash
        if (selectedWashes.length > 0) {
            result = result.filter((p) => selectedWashes.includes(p.wash));
        }

        // Filter by size
        if (selectedSizes.length > 0) {
            result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
        }

        // Filter by price
        result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

        // Sort
        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                result.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
                break;
            case 'bestseller':
                result.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
                break;
        }

        return result;
    }, [selectedFits, selectedWashes, selectedSizes, priceRange, sortBy, initialNew]);

    return (
        <div className="pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        {initialNew === 'true' ? 'New Arrivals' : 'All Jeans'}
                    </h1>
                    <p className="text-gray-600">
                        {filteredProducts.length} products
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                    {/* Filter Sidebar */}
                    <FilterSidebar
                        selectedFits={selectedFits}
                        setSelectedFits={setSelectedFits}
                        selectedWashes={selectedWashes}
                        setSelectedWashes={setSelectedWashes}
                        selectedSizes={selectedSizes}
                        setSelectedSizes={setSelectedSizes}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        clearFilters={clearFilters}
                    />

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 bg-white p-3 sm:p-4 rounded-xl shadow-sm">
                            <div className="flex items-center gap-2">
                                <Button
                                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                                    size="icon"
                                    onClick={() => setViewMode('grid')}
                                    className={viewMode === 'grid' ? 'bg-indigo-600' : ''}
                                >
                                    <Grid className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                                    size="icon"
                                    onClick={() => setViewMode('list')}
                                    className={viewMode === 'list' ? 'bg-indigo-600' : ''}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>

                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="featured">Featured</SelectItem>
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="bestseller">Bestseller</SelectItem>
                                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Products Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className={`grid gap-3 sm:gap-4 lg:gap-6 ${viewMode === 'grid'
                                ? 'grid-cols-2 sm:grid-cols-2 xl:grid-cols-3'
                                : 'grid-cols-1'
                                }`}>
                                {filteredProducts.map((product, index) => (
                                    <ProductCard key={product.id} product={product} index={index} />
                                ))}
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20"
                            >
                                <p className="text-gray-500 text-lg mb-4">No products match your filters</p>
                                <Button variant="outline" onClick={clearFilters}>
                                    Clear Filters
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={
            <div className="pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="h-10 bg-gray-200 rounded w-48 mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded w-24 mb-8"></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-gray-200 rounded-xl aspect-[3/4]"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        }>
            <ShopContent />
        </Suspense>
    );
}
