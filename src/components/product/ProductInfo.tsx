import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Info, Truck, MessageSquare, Phone, ShieldCheck, Zap, Package } from "lucide-react";
import { formatPkr, convertUsdToPkr } from "@/utils/currency";
import { useInquiryContext } from "@/context/InquiryContext";

interface ProductInfoProps {
    product: any;
}

export function ProductInfo({ product }: ProductInfoProps) {
    const { openInquiry } = useInquiryContext();

    const pkrPrice = convertUsdToPkr(product.price);
    const pkrMsrp = convertUsdToPkr(product.price * 1.2);

    return (
        <div className="space-y-10">
            <div>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                        <Zap className="w-3 h-3 text-primary animate-pulse" />
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Part #{product.sku || product.partNumber}</span>
                    </div>
                    <Badge variant={product.stockStatus === "In Stock" ? "success" : "warning"}>
                        {product.stockStatus}
                    </Badge>
                </div>

                <h1 className="text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter font-heading leading-none">
                    {product.name}
                </h1>

                <div className="flex items-center gap-6 mb-8 p-6 glass-stage rounded-2xl border border-white/5 inline-flex">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Industrial Valuation</span>
                        <span className="text-4xl font-black text-white font-heading">{formatPkr(pkrPrice)}</span>
                    </div>
                    <div className="w-[1px] h-10 bg-white/10" />
                    <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">MSRP Base</span>
                        <span className="text-xl font-bold text-zinc-600 line-through">{formatPkr(pkrMsrp)}</span>
                    </div>
                </div>

                <p className="text-zinc-500 text-lg leading-relaxed mb-10 font-medium max-w-xl">
                    {product.description}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {[
                    { icon: ShieldCheck, label: "OEM Precision Certified" },
                    { icon: Truck, label: "Priority Logistics Ready" },
                    { icon: Package, label: "Industrial-Grade Seal" },
                    { icon: Info, label: "12-Month Performance Bond" },
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/2 hover:border-primary/20 transition-all group">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                            <item.icon className="w-5 h-5 text-zinc-500 group-hover:text-primary transition-colors" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">{item.label}</span>
                    </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
                <Button
                    variant="default"
                    size="lg"
                    className="flex-1 h-16 text-sm font-black group"
                    onClick={() => openInquiry('general', product)}
                >
                    <Phone className="w-4 h-4 mr-3" />
                    ENGAGE ADVISOR
                </Button>
                <Button
                    variant="industrial"
                    size="lg"
                    className="flex-1 h-16 text-sm font-black"
                    onClick={() => openInquiry('quote', product)}
                >
                    <MessageSquare className="w-4 h-4 mr-3" />
                    TRANSMISSION QUOTE
                </Button>
            </div>
        </div>
    );
}
