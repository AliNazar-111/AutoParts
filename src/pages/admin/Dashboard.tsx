import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Package,
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  Search,
  Upload,
  Eye,
  TrendingUp,
  Box,
  X,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Database,
  ShieldCheck,
  Cpu,
  Zap,
  Maximize2
} from "lucide-react";
import { mockProducts } from "../../utils/constants";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { AdminSidebar } from "../../components/admin/AdminSidebar";

type TabType = "overview" | "products" | "inquiries" | "settings";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const inquiries = [
    { id: "1", customerName: "John Smith", email: "john@example.com", product: "Brembo GT Series Brakes", date: "Jan 20, 2026", status: "New" },
    { id: "2", customerName: "Sarah Johnson", email: "sarah@example.com", product: "Garrett Turbocharger", date: "Jan 19, 2026", status: "Responded" },
    { id: "3", customerName: "Mike Wilson", email: "mike@example.com", product: "Ohlins Coilover Kit", date: "Jan 18, 2026", status: "New" },
  ];

  const stats = [
    { label: "Active Inventory", value: mockProducts.length, icon: Package, color: "red", trend: "+12%", up: true },
    { label: "Latency Packets", value: inquiries.filter(i => i.status === "New").length, icon: Activity, color: "red", trend: "+2 active", up: true },
    { label: "Asset Velocity", value: 14, icon: TrendingUp, color: "red", trend: "Optimized", up: true },
    { label: "Matrix Integrity", value: "99.9%", icon: ShieldCheck, color: "red", trend: "Secure", up: true },
  ];

  const filteredProducts = mockProducts.filter(p =>
    searchQuery === "" ||
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.partNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setIsSidebarOpen(false);
        }}
        inquiriesCount={inquiries.filter(i => i.status === "New").length}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Mobile Management Header */}
      <header className="lg:hidden h-20 bg-graphite-950 border-b border-white/5 px-6 flex items-center justify-between shrink-0 relative z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
            <Cpu className="w-6 h-6 text-primary" />
          </div>
          <div className="text-lg font-black font-heading text-white uppercase tracking-tighter">
            Pro <span className="text-primary">Admin</span>
          </div>
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white"
        >
          <Activity className="w-5 h-5 text-primary" />
        </button>
      </header>

      {/* Main Content Stage */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto relative no-scrollbar">
        {/* Background Ambience */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_0%,var(--primary-glow)_0%,transparent_50%)] opacity-[0.03] pointer-events-none" />

        <header className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Database className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Administrative Node</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase font-heading leading-none">{activeTab}</h1>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
            <div className="flex items-center gap-6 md:gap-8 px-6 md:px-8 py-3 md:py-4 rounded-2xl bg-white/2 border border-white/5 shadow-2xl w-full sm:w-auto">
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-1">Grid Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest leading-none">Live Operational</span>
                </div>
              </div>
              <div className="flex flex-col border-l border-white/5 pl-6 md:pl-8">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-1">Transmission</span>
                <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-primary" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest leading-none">Sync 0.2ms</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12 relative z-10">
              {/* Telemetry Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="glass-stage rounded-3xl p-6 md:p-8 border border-white/5 relative overflow-hidden group hover:border-primary/20 transition-all cursor-default">
                    <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:scale-125 transition-transform duration-700">
                      <stat.icon className="w-24 h-24" />
                    </div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-2xl bg-white/2 border border-white/5 text-zinc-500 group-hover:text-primary transition-colors">
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">{stat.label}</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <div className="text-3xl md:text-4xl font-black text-white font-heading tracking-tighter">{stat.value}</div>
                      <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${stat.up ? 'text-primary' : 'text-zinc-600'}`}>
                        {stat.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                        {stat.trend}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Data Orchestration Segments */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-12 xl:col-span-7 glass-stage rounded-[3rem] p-10 industrial-border">
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter font-heading flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <MessageSquare className="w-5 h-5 text-primary" />
                      </div>
                      Active Inbound Transmissions
                    </h3>
                    <Button variant="outline" size="sm" className="h-10 text-[9px] font-black uppercase tracking-widest">Archive Metadata</Button>
                  </div>
                  <div className="space-y-4">
                    {inquiries.map((inquiry) => (
                      <div key={inquiry.id} className="p-6 bg-white/2 rounded-2xl border border-white/5 flex items-center justify-between group hover:bg-white/5 transition-all cursor-pointer">
                        <div className="flex items-center gap-6">
                          <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-black text-white text-lg font-heading shadow-xl">
                            {inquiry.customerName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-black text-white uppercase tracking-tight text-sm group-hover:text-primary transition-colors">{inquiry.customerName}</div>
                            <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-1">{inquiry.product}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="hidden md:block text-right">
                            <div className="text-[10px] text-zinc-700 font-black uppercase tracking-widest mb-1">Time Stamp</div>
                            <div className="text-xs text-zinc-500 font-bold">{inquiry.date}</div>
                          </div>
                          <Badge className="h-10 px-6 font-black uppercase tracking-[0.2em]" variant={inquiry.status === "New" ? "destructive" : "default"}>
                            {inquiry.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-12 xl:col-span-5 glass-stage rounded-[3rem] p-10 industrial-border">
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter font-heading flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Box className="w-5 h-5 text-primary" />
                      </div>
                      Asset Inventory Matrix
                    </h3>
                    <Button variant="outline" size="sm" className="h-10 text-[9px] font-black uppercase tracking-widest">Detailed Logs</Button>
                  </div>
                  <div className="space-y-4">
                    {mockProducts.slice(0, 3).map((product) => (
                      <div key={product.id} className="p-5 bg-white/2 rounded-2xl border border-white/5 flex items-center justify-between hover:bg-white/5 transition-all group">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
                            <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div>
                            <div className="font-black text-white uppercase tracking-tight text-sm">{product.name}</div>
                            <div className="text-[10px] font-black font-mono text-zinc-700 tracking-[0.2em] mt-1">{product.partNumber}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-black text-white font-heading">${product.price.toLocaleString()}</div>
                          <div className="text-[9px] text-primary uppercase font-black tracking-widest mt-1 animate-pulse">Mesh Active</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "products" && (
            <motion.div key="products" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10 relative z-10">
              <div className="flex flex-col md:flex-row gap-6 mb-12">
                <div className="relative flex-1 group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-700 group-hover:text-primary transition-colors" />
                  <Input
                    placeholder="SCANNING INVENTORY FOR PART IDENTIFIER / SERIAL SKU..."
                    className="pl-16 h-16 rounded-2xl bg-white/2 border border-white/10 font-bold focus-visible:bg-white/5 uppercase text-[10px] tracking-widest transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button onClick={() => setShowAddProduct(true)} className="h-16 px-12 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-premium">
                  <Plus className="w-4 h-4 mr-3" />
                  Asset Intake
                </Button>
              </div>

              <div className="glass-stage rounded-[2.5rem] border border-white/5 shadow-2xl overflow-x-auto no-scrollbar">
                <table className="w-full text-left min-w-[1000px]">
                  <thead className="bg-white/2 border-b border-white/5">
                    <tr>
                      <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Part Telemetry</th>
                      <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Taxonomy</th>
                      <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Asset Mesh</th>
                      <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Availability</th>
                      <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Equity</th>
                      <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 text-right">Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/2">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-white/[0.04] transition-all group cursor-default">
                        <td className="p-8">
                          <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shadow-2xl ring-0 group-hover:ring-2 ring-primary/20 transition-all">
                              <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div>
                              <div className="font-black text-white group-hover:text-primary transition-colors uppercase tracking-tight text-base font-heading leading-tight">{product.name}</div>
                              <div className="text-[10px] font-black font-mono text-zinc-600 tracking-[0.2em] mt-1">{product.partNumber}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-8">
                          <span className="px-4 py-2 rounded-xl bg-white/2 border border-white/5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">{product.category}</span>
                        </td>
                        <td className="p-8">
                          {product.has3D ? (
                            <div className="inline-flex items-center gap-2.5 text-[9px] font-black uppercase text-primary tracking-[0.2em] animate-pulse">
                              <Box className="w-3.5 h-3.5" />
                              Mesh Synchronized
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-2.5 text-[9px] font-black uppercase text-zinc-700 tracking-[0.2em]">
                              <Maximize2 className="w-3.5 h-3.5" />
                              Static Capture Only
                            </div>
                          )}
                        </td>
                        <td className="p-8">
                          <Badge className="font-black uppercase tracking-[0.2em] px-4 py-1.5" variant={
                            product.stockStatus === "In Stock" ? "success" :
                              product.stockStatus === "Low Stock" ? "warning" : "destructive"
                          }>
                            {product.stockStatus}
                          </Badge>
                        </td>
                        <td className="p-8 font-black font-heading text-white tracking-tighter text-lg">${product.price.toLocaleString()}</td>
                        <td className="p-8 text-right">
                          <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                            <button className="w-11 h-11 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl flex items-center justify-center transition-all"><Edit className="w-4 h-4" /></button>
                            <button className="w-11 h-11 bg-white/5 hover:bg-primary/20 border border-white/10 text-zinc-500 hover:text-primary rounded-xl flex items-center justify-center transition-all"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Asset Intake Interface */}
      <AnimatePresence>
        {showAddProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-graphite-950/95 backdrop-blur-2xl" onClick={() => setShowAddProduct(false)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="relative w-full max-w-2xl bg-white/2 rounded-[3.5rem] p-12 border border-white/10 shadow-[0_0_150px_rgba(239,68,68,0.15)] industrial-border"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-[1.5rem] flex items-center justify-center border border-primary/20 shadow-2xl">
                    <Cpu className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter font-heading">Asset Component Intake</h2>
                    <p className="text-zinc-600 font-bold uppercase tracking-[0.3em] text-[10px] mt-1 flex items-center gap-2">
                      <Activity className="w-3 h-3" />
                      Telemetry Verification sequence active
                    </p>
                  </div>
                </div>
                <button onClick={() => setShowAddProduct(false)} className="w-14 h-14 rounded-2xl bg-white/2 hover:bg-white/5 border border-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-zinc-600 tracking-[0.3em] ml-1">Component Identifier</label>
                    <Input placeholder="E.G. TITANIUM FORGED ROTORS" className="h-16 rounded-2xl bg-white/2 border-white/5 font-bold uppercase text-[11px] tracking-widest focus-visible:bg-white/5" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-zinc-600 tracking-[0.3em] ml-1">Capital Equity ($)</label>
                      <Input type="number" placeholder="0000.00" className="h-16 rounded-2xl bg-white/2 border-white/5 font-bold focus-visible:bg-white/5" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-zinc-600 tracking-[0.3em] ml-1">Transmission SKU</label>
                      <Input placeholder="AP-XXX-01" className="h-16 rounded-2xl bg-white/2 border-white/5 font-bold uppercase text-[11px] focus-visible:bg-white/5" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase text-zinc-600 tracking-[0.3em] ml-1">Technical Schematics</label>
                      <span className="text-[9px] text-zinc-800 font-black">Markdown Support</span>
                    </div>
                    <textarea
                      className="w-full bg-white/2 border border-white/5 rounded-[2rem] p-8 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20 resize-none h-44 transition-all"
                      placeholder="Specify material nodes, mechanical tolerances, and industrial compliance metadata..."
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="border-2 border-dashed border-white/5 rounded-[3rem] p-12 text-center group hover:border-primary/20 transition-all bg-white/[0.01] cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-24 h-24 bg-white/2 border border-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform relative z-10 shadow-2xl">
                      <Upload className="w-10 h-10 text-zinc-700 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="font-black text-white mb-2 uppercase tracking-tighter text-lg relative z-10">Asset Transmission</div>
                    <p className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.4em] relative z-10">DROP 8K RENDER SOURCE</p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-zinc-600 tracking-[0.3em] ml-1">3D Mesh Node Link (.OBJ / .GLB)</label>
                    <Input placeholder="HTTPS://MESH.CENTRAL.IO/ASSET_X.GLB" className="h-16 rounded-2xl bg-white/2 border-white/5 font-bold text-[11px] focus-visible:bg-white/5" />
                  </div>

                  <div className="pt-8">
                    <Button className="w-full h-20 rounded-[1.5rem] font-black uppercase tracking-[0.4em] text-xs shadow-premium group">
                      <Zap className="w-4 h-4 mr-4 text-white group-hover:animate-pulse" />
                      Finalize Inventory Integration
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

