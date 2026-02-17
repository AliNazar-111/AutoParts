import { useState, useCallback } from 'react';
import { inquiryService, InquiryData } from '@/services/inquiryService';

export function useInquiry() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const submitInquiry = useCallback(async (data: InquiryData) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);

            await inquiryService.create(data);

            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Failed to transmit inquiry packet.');
        } finally {
            setLoading(false);
        }
    }, []);

    const resetStatus = useCallback(() => {
        setSuccess(false);
        setError(null);
    }, []);

    return {
        submitInquiry,
        loading,
        error,
        success,
        resetStatus
    };
}
