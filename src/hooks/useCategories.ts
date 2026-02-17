import { useState, useEffect, useCallback } from 'react';
import { categoryService, Category } from '@/services/categoryService';

interface UseCategoriesResult {
    categories: Category[];
    loading: boolean;
    error: string | null;
    fetchCategories: () => Promise<void>;
}

// Simple in-memory cache
let categoriesCache: Category[] | null = null;

export function useCategories(): UseCategoriesResult {
    const [categories, setCategories] = useState<Category[]>(categoriesCache || []);
    const [loading, setLoading] = useState(!categoriesCache);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await categoryService.getAll();
            setCategories(data.categories);
            categoriesCache = data.categories;
        } catch (err: any) {
            setError(err.message || 'Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!categoriesCache) {
            fetchCategories();
        }
    }, [fetchCategories]);

    return { categories, loading, error, fetchCategories };
}
