import { motion } from "motion/react";
import {
    LayoutDashboard,
    Package,
    MessageSquare,
    Settings,
    LogOut
} from "lucide-react";

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
        { id: "overview", label: "Dashboard", icon: LayoutDashboard },
        { id: "products", label: "Inventory", icon: Package },
        { id: "inquiries", label: "Inquiries", icon: MessageSquare, badge: inquiriesCount },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    return (
        <aside className="w-72 bg-[#0a0a0f] border-r border-white/5 flex flex-col h-screen sticky top-0">
            <div className="p-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-red-600/20">
                        A
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">AutoParts <span className="text-red-500">Pro</span></span>
                </div>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest pl-1">Management Console</p>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all relative group ${activeTab === item.id
                                ? "bg-red-500 text-white shadow-xl shadow-red-500/20"
                                : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
                            }`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-bold text-sm tracking-wide">{item.label}</span>

                        {item.badge ? (
                            <span className={`ml-auto px-2 py-0.5 rounded-lg text-[10px] font-black uppercase ${activeTab === item.id ? "bg-white text-red-500" : "bg-red-500 text-white"
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

            <div className="p-6">
                <div className="bg-white/5 rounded-3xl p-4 border border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold">
                            SJ
                        </div>
                        <div className="overflow-hidden">
                            <div className="text-sm font-bold text-white truncate">Steve Johnson</div>
                            <div className="text-[10px] text-zinc-500 uppercase tracking-tighter">Senior Inventory Mgr</div>
                        </div>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-red-500/10 hover:text-red-500 text-zinc-500 transition-all font-bold text-xs uppercase tracking-widest">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </div>
        </aside>
    );
}
