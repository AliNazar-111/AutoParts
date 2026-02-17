import { fetchApi } from './api';

export interface InquiryData {
    product: string;
    vehicleInfo: {
        make: string;
        model: string;
        year: number;
        vin?: string;
    };
    contactInfo: {
        phone: string;
        email: string;
    };
    type: 'general' | 'quote';
    message: string;
}

export const inquiryService = {
    create: (data: InquiryData): Promise<any> => {
        // Retrieve token from localStorage if implementing auth-based inquiries
        const token = localStorage.getItem('token');

        return fetchApi('/inquiries', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
        });
    },

    getMyInquiries: (): Promise<any> => {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Authentication required');

        return fetchApi('/inquiries/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
};
