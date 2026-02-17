import React, { createContext, useContext, useState, ReactNode } from 'react';

type InquiryType = 'general' | 'quote';

interface InquiryContextType {
    isOpen: boolean;
    type: InquiryType;
    product: any;
    openInquiry: (type: InquiryType, product?: any) => void;
    closeInquiry: () => void;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export function InquiryProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState<InquiryType>('general');
    const [product, setProduct] = useState<any>(null);

    const openInquiry = (newType: InquiryType, newProduct: any = null) => {
        setType(newType);
        setProduct(newProduct || { name: 'Automotive Systems' });
        setIsOpen(true);
    };

    const closeInquiry = () => {
        setIsOpen(false);
    };

    return (
        <InquiryContext.Provider value={{ isOpen, type, product, openInquiry, closeInquiry }}>
            {children}
        </InquiryContext.Provider>
    );
}

export function useInquiryContext() {
    const context = useContext(InquiryContext);
    if (context === undefined) {
        throw new Error('useInquiryContext must be used within an InquiryProvider');
    }
    return context;
}
