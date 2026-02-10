import { motion } from "motion/react";
import {
    LayoutDashboard,
    Package,
    MessageSquare,
    Settings,
    LogOut,
    ShieldCheck,
    Cpu,
    Zap
} from "lucide-react";
import { Link } from "react-router";

interface SidebarItem {
    id: string;
    label: string;
    icon: any;
    badge?: number;
}

interface AdminSidebarProps {
    activeTab: string;
    onTabChange: (id: any) => void;
    inquiriesCount: number;
}

export function AdminSidebar({ activeTab, onTabChange, inquiriesCount }: AdminSidebarProps) {
    const navItems: SidebarItem[] = [
        { id: "overview", label: "Telemetry", icon: LayoutDashboard },
        { id: "products", label: "Inventory", icon: Package },
        { id: "inquiries", label: "Transmissions", icon: MessageSquare, badge: inquiriesCount },
        { id: "settings", label: "Systems", icon: Settings },
    ];

    return (
        <aside className="w-80 bg-graphite-950 border-r border-white/5 flex flex-col h-screen sticky top-0 overflow-hidden">
            {/* Background Staging */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[radial-gradient(circle_at_0%_0%,var(--primary-glow)_0%,transparent_70%)] opacity-5 pointer-events-none" />

            <div className="p-10 relative z-10">
                <Link to="/" className="flex items-center gap-4 group mb-10">
                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30 shadow-lg shadow-primary/10 group-hover:rotate-90 transition-transform duration-500">
                        <Cpu className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <div className="text-lg font-black font-heading text-white uppercase tracking-tighter leading-none">
                            AutoPart <span className="text-primary">Pro</span>
                        </div>
                        <div className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.3em] mt-1">Admin Node v4.0</div>
                    </div>
                </Link>

                <nav className="space-y-3">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all relative group ${activeTab === item.id
                                ? "bg-primary text-white shadow-2xl shadow-primary/20"
                                : "text-zinc-600 hover:bg-white/5 hover:text-zinc-300"
                                }`}
                        >
                            <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                            <span className="font-black text-[10px] uppercase tracking-[0.2em]">{item.label}</span>

                            {item.badge ? (
                                <span className={`ml-auto px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${activeTab === item.id ? "bg-white text-primary" : "bg-primary text-white"
                                    }`}>
                                    {item.badge} New
                                </span>
                            ) : null}

                            {activeTab === item.id && (
                                <motion.div
                                    layoutId="activeTabSidebar"
                                    className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
                                />
                            )}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="mt-auto p-10 relative z-10">
                <div className="glass-stage rounded-3xl p-6 industrial-border space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden group/avatar">
                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover/avatar:opacity-100 transition-opacity" />
                            <span className="text-white font-black text-sm relative z-10">SJ</span>
                        </div>
                        <div>
                            <div className="text-xs font-black text-white uppercase tracking-widest">Steve Johnson</div>
                            <div className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.1em] mt-0.5">Systems Architect</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/2 border border-white/5">
                        <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">Auth Level: 01</span>
                    </div>

                    <button className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-white/2 hover:bg-primary/20 border border-white/5 hover:border-primary/30 text-zinc-600 hover:text-white transition-all font-black text-[10px] uppercase tracking-[0.3em]">
                        <LogOut className="w-4 h-4" />
                        Terminate
                    </button>
                </div>
            </div>
        </aside>
    );
}
