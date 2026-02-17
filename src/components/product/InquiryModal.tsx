import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, ShieldCheck, Zap, Car, CheckCircle, Info } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { useInquiry } from '@/hooks/useInquiry';
import { useInquiryContext } from '@/context/InquiryContext';

export function InquiryModal() {
    const { isOpen, type, product, closeInquiry } = useInquiryContext();
    const { submitInquiry, loading, error, success, resetStatus } = useInquiry();
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        year: '',
        vin: '',
        phone: '',
        email: '',
        message: ''
    });

    useEffect(() => {
        if (isOpen) {
            setFormData(prev => ({
                ...prev,
                message: type === 'quote' ? `Requesting industrial quote for ${product?.name || 'selected component'}.` : ''
            }));
            resetStatus();
        }
    }, [isOpen, type, product, resetStatus]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await submitInquiry({
            product: product?._id || product?.id || 'general',
            vehicleInfo: {
                make: formData.make,
                model: formData.model,
                year: parseInt(formData.year),
                vin: formData.vin
            },
            contactInfo: {
                phone: formData.phone,
                email: formData.email
            },
            type,
            message: formData.message
        });
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[1000] flex justify-center items-start overflow-y-auto pt-24 pb-12 px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeInquiry}
                    className="fixed inset-0 bg-zinc-950/90 backdrop-blur-xl"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 40 }}
                    className="relative w-full max-w-lg bg-graphite-900 border border-white/10 rounded-[2rem] shadow-premium overflow-hidden z-[1001] my-auto md:my-0"
                >
                    <div className="p-6 md:p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                                    <Zap className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-white uppercase tracking-tighter">
                                        {type === 'quote' ? 'Secure Quote Request' : 'Technical Consultation'}
                                    </h2>
                                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                                        Project: {product?.name || 'OE Specification'}
                                    </p>
                                </div>
                            </div>
                            <button onClick={closeInquiry} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {success ? (
                            <div className="py-8 text-center">
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                                >
                                    <CheckCircle className="w-8 h-8 text-green-500" />
                                </motion.div>
                                <h3 className="text-xl font-black text-white uppercase mb-4 tracking-tighter">Transmission Confirmed</h3>
                                <p className="text-zinc-500 text-sm font-medium mb-10">An industrial advisor has been prioritized for your inquiry.</p>
                                <Button onClick={closeInquiry} className="w-full h-14 rounded-xl font-black uppercase tracking-widest text-[9px]">
                                    Close Terminal
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">Contact Email</label>
                                        <Input name="email" value={formData.email} onChange={handleChange} required placeholder="STATION@OPS.IO" className="h-12 text-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">Secure Phone</label>
                                        <Input name="phone" value={formData.phone} onChange={handleChange} required placeholder="+1 (000) 000-0000" className="h-12 text-sm" />
                                    </div>
                                </div>

                                <div className="p-5 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Car className="w-3.5 h-3.5 text-primary" />
                                        <span className="text-[9px] font-black text-white uppercase tracking-widest">Hardware Profile</span>
                                    </div>
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                        <Input name="make" value={formData.make} onChange={handleChange} required placeholder="MAKE" className="bg-graphite-950/50 h-10 text-xs px-3" />
                                        <Input name="model" value={formData.model} onChange={handleChange} required placeholder="MODEL" className="bg-graphite-950/50 h-10 text-xs px-3" />
                                        <Input name="year" value={formData.year} onChange={handleChange} required placeholder="YEAR" className="bg-graphite-950/50 h-10 text-xs px-3" />
                                        <Input name="vin" value={formData.vin} onChange={handleChange} placeholder="VIN" className="bg-graphite-950/50 h-10 text-xs px-3" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">Transmission Message</label>
                                    <Textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={3}
                                        className="w-full bg-white/5 border-white/10 rounded-xl p-4 text-white placeholder-zinc-700 focus-visible:bg-white/10 text-sm"
                                        placeholder="Specify technical constraints or deployment requirements..."
                                    />
                                </div>

                                {error && (
                                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-3">
                                        <Info className="w-3.5 h-3.5" />
                                        {error}
                                    </div>
                                )}

                                <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl font-black uppercase tracking-[0.2em] text-[11px] group">
                                    <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    {loading ? 'Transmitting...' : 'Initialize Inquiry'}
                                </Button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
