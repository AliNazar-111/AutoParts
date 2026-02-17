import { fetchApi } from './api';

export interface Category {
    _id: string;
    id: string; // From virtual field
    name: string;
    slug: string;
    description?: string;
    image?: string;
    parent?: string | Category;
    subcategories?: Category[];
    active: boolean;
    productCount?: number;
}

export const categoryService = {
    getAll: async () => {
        const response = await fetchApi('/categories');
        return response.data;
    },

    getParents: async () => {
        const response = await fetchApi('/categories/parents');
        return response.data;
    },

    getOne: async (idOrSlug: string) => {
        const response = await fetchApi(`/categories/${idOrSlug}`);
        return response.data;
    }
};
