import { fetchApi } from './api';
import { Product } from '@/utils/constants';

export interface GetProductsParams {
    category?: string;
    make?: string;
    search?: string;
    page?: number;
    limit?: number;
    sort?: string;
}

export interface ProductsResponse {
    status: string;
    results: number;
    total: number;
    page: number;
    pages: number;
    data: {
        products: Product[];
    };
}

export const productService = {
    getAll: (params: GetProductsParams = {}): Promise<ProductsResponse> => {
        const query = new URLSearchParams();
        if (params.category && params.category !== 'all') query.append('category', params.category);
        if (params.make && params.make !== 'all') query.append('make', params.make);
        if (params.search) query.append('search', params.search);
        if (params.page) query.append('page', params.page.toString());
        if (params.limit) query.append('limit', params.limit.toString());
        if (params.sort) query.append('sort', params.sort);

        return fetchApi(`/products?${query.toString()}`);
    },

    getOne: (id: string): Promise<{ status: string, data: { product: Product } }> => {
        return fetchApi(`/products/${id}`);
    }
};
