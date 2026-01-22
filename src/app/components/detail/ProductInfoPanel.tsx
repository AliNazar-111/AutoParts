import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Info, CheckCircle2, Package, Truck, MessageSquare, Phone } from "lucide-react";

interface ProductInfoPanelProps {
    product: any;
}

export function ProductInfoPanel({ product }: ProductInfoPanelProps) {
    return (
        <div className="space-y-8">
            <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                    <Badge variant="auto-outline" className="text-[10px] uppercase tracking-wider py-1 px-3">
                        Part #{product.partNumber}
                    </Badge>
                    <Badge variant={product.stockStatus === "In Stock" ? "auto-success" : "auto-warning"}>
                        {product.stockStatus}
                    </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {product.name}
                </h1>

                <div className="flex items-baseline gap-4 mb-6">
                    <span className="text-4xl font-bold text-red-500">${product.price.toLocaleString()}</span>
                    <span className="text-zinc-500 line-through text-lg">${(product.price * 1.2).toLocaleString()}</span>
                </div>

                <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                    {product.description}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                    { icon: Package, label: "OEM Quality Guaranteed" },
                    { icon: Truck, label: "Next Day Dispatch Available" },
                    { icon: CheckCircle2, label: "Verified Compatibility" },
                    { icon: Info, label: "12-Month Warranty" },
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                        <item.icon className="w-5 h-5 text-red-500" />
                        <span className="text-sm font-medium text-white">{item.label}</span>
                    </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="auto-primary" size="lg" className="flex-1 py-7 text-lg group">
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Seller
                </Button>
                <Button variant="auto-secondary" size="lg" className="flex-1 py-7 text-lg">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Request Quote
                </Button>
            </div>
        </div>
    );
}
