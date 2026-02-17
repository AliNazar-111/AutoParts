import { useState, useCallback, useRef } from 'react';
import { productService } from '@/services/productService';
import { Product } from '@/utils/constants';

interface UseProductsResult {
    products: Product[];
    total: number;
    page: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
    fetchProducts: (params?: any) => Promise<void>;
}

// Simple in-memory cache for request deduplication
const requestCache = new Map<string, Promise<any>>();

export function useProducts(): UseProductsResult {
    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const lastRequestKey = useRef<string | null>(null);

    const fetchProducts = useCallback(async (params: any = {}) => {
        const cacheKey = JSON.stringify(params);

        // Prevent duplicate simultaneous requests
        if (requestCache.has(cacheKey)) {
            const cachedPromise = requestCache.get(cacheKey);
            const result = await cachedPromise;
            setProducts(result.data.products);
            setTotal(result.total);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const requestPromise = productService.getAll(params);
            requestCache.set(cacheKey, requestPromise);

            const response = await requestPromise;
            setProducts(response.data.products);
            setTotal(response.total);
            setPage(response.page || 1);
            setTotalPages(response.pages || 1);
            lastRequestKey.current = cacheKey;
        } catch (err: any) {
            setError(err.message || 'Failed to fetch products');
        } finally {
            setLoading(false);
            // Clear cache after a short delay to allow fresh fetches later
            setTimeout(() => requestCache.delete(cacheKey), 5000);
        }
    }, []);

    return { products, total, page, totalPages, loading, error, fetchProducts };
}
