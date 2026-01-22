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
  ArrowDownRight
} from "lucide-react";
import { mockProducts } from "../../utils/constants";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/Badge";
import { AdminSidebar } from "../../components/admin/AdminSidebar";

type TabType = "overview" | "products" | "inquiries" | "settings";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const inquiries = [
    { id: "1", customerName: "John Smith", email: "john@example.com", product: "Brembo GT Series Brakes", date: "Jan 20, 2026", status: "New" },
    { id: "2", customerName: "Sarah Johnson", email: "sarah@example.com", product: "Garrett Turbocharger", date: "Jan 19, 2026", status: "Responded" },
    { id: "3", customerName: "Mike Wilson", email: "mike@example.com", product: "Ohlins Coilover Kit", date: "Jan 18, 2026", status: "New" },
  ];

  const stats = [
    { label: "Active Inventory", value: mockProducts.length, icon: Package, color: "blue", trend: "+12%", up: true },
    { label: "Pending Inquiries", value: inquiries.filter(i => i.status === "New").length, icon: MessageSquare, color: "red", trend: "+2 today", up: true },
    { label: "High Demand items", value: 14, icon: TrendingUp, color: "green", trend: "Stable", up: true },
    { label: "System Health", value: "99%", icon: Settings, color: "purple", trend: "0 errors", up: true },
  ];

  const filteredProducts = mockProducts.filter(p =>
    searchQuery === "" ||
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.partNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#060608] flex font-sans selection:bg-red-500/30">
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        inquiriesCount={inquiries.filter(i => i.status === "New").length}
      />

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight uppercase">{activeTab}</h1>
            <div className="h-1 w-12 bg-red-600 mt-2 rounded-full" />
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/5 border border-white/5 px-4 py-2 rounded-xl text-xs font-bold text-zinc-500 uppercase tracking-widest">
              Server: <span className="text-green-500">Live</span>
            </div>
            <div className="bg-white/5 border border-white/5 px-4 py-2 rounded-xl text-xs font-bold text-zinc-500 uppercase tracking-widest">
              Sync: <span className="text-blue-500">2m ago</span>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="glass-card rounded-3xl p-6 border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform duration-500">
                      <stat.icon className="w-16 h-16" />
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-2xl bg-white/5 ${stat.color === 'blue' ? 'text-blue-500' :
                        stat.color === 'red' ? 'text-red-500' :
                          stat.color === 'green' ? 'text-green-500' : 'text-purple-500'
                        }`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{stat.label}</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-black text-white">{stat.value}</div>
                      <div className={`flex items-center gap-1 text-[10px] font-bold ${stat.up ? 'text-green-500' : 'text-red-500'}`}>
                        {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {stat.trend}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Products & Inquiries View */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card rounded-[2.5rem] p-8">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-red-500" />
                    Incoming Requests
                  </h3>
                  <div className="space-y-4">
                    {inquiries.map((inquiry) => (
                      <div key={inquiry.id} className="p-5 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between group hover:bg-white/[0.08] transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center font-bold text-white">
                            {inquiry.customerName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-white group-hover:text-red-500 transition-colors">{inquiry.customerName}</div>
                            <div className="text-xs text-zinc-500">{inquiry.product}</div>
                          </div>
                        </div>
                        <Badge variant={inquiry.status === "New" ? "auto-danger" : "auto-success"}>
                          {inquiry.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card rounded-[2.5rem] p-8">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Box className="w-5 h-5 text-blue-500" />
                    Stock Alerts
                  </h3>
                  <div className="space-y-4">
                    {mockProducts.slice(0, 3).map((product) => (
                      <div key={product.id} className="p-5 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <img src={product.image} className="w-12 h-12 rounded-xl object-cover" />
                          <div>
                            <div className="font-bold text-white">{product.name}</div>
                            <div className="text-xs font-mono text-zinc-500">{product.partNumber}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-white">${product.price}</div>
                          <div className="text-[10px] text-zinc-500 uppercase font-black">Serial Check Pass</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "products" && (
            <motion.div key="products" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                  <Input
                    placeholder="Filter by part name, SKU, or category..."
                    className="pl-12 h-14 rounded-2xl"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="auto-primary" onClick={() => setShowAddProduct(true)} className="h-14 px-8 rounded-2xl">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Part
                </Button>
              </div>

              <div className="glass-card rounded-[2rem] overflow-hidden border-white/5">
                <table className="w-full text-left">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Component</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Category</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Asset</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Status</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Valuation</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-white/[0.03] transition-colors group">
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <img src={product.image} className="w-14 h-14 rounded-2xl object-cover shadow-2xl" />
                            <div>
                              <div className="font-bold text-white group-hover:text-red-500 transition-colors uppercase tracking-tight">{product.name}</div>
                              <div className="text-[10px] font-mono text-zinc-500">{product.partNumber}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-6 font-bold text-sm text-zinc-400 capitalize">{product.category}</td>
                        <td className="p-6">
                          {product.has3D ? (
                            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-blue-500 tracking-widest">
                              <Box className="w-3 h-3" />
                              3D Mesh Active
                            </div>
                          ) : (
                            <span className="text-[10px] text-zinc-600 uppercase font-bold">2D Static Only</span>
                          )}
                        </td>
                        <td className="p-6">
                          <Badge variant={
                            product.stockStatus === "In Stock" ? "auto-success" :
                              product.stockStatus === "Low Stock" ? "auto-warning" : "auto-danger"
                          }>
                            {product.stockStatus}
                          </Badge>
                        </td>
                        <td className="p-6 font-mono font-bold text-white">${product.price.toLocaleString()}</td>
                        <td className="p-6 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all"><Edit className="w-4 h-4" /></button>
                            <button className="p-2 bg-white/5 hover:bg-red-500/20 text-red-500 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
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

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShowAddProduct(false)} />
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0d0d12] rounded-[3rem] p-10 border border-white/5 shadow-[0_0_100px_rgba(239,68,68,0.1)]"
            >
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter">New Inventory Item</h2>
                  <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mt-1">Industrial parts intake system</p>
                </div>
                <button onClick={() => setShowAddProduct(false)} className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">Component Name</label>
                    <Input placeholder="e.g. Forged Pistons V8" className="h-14 rounded-2xl" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">Price ($)</label>
                      <Input type="number" placeholder="00.00" className="h-14 rounded-2xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">Serial SKU</label>
                      <Input placeholder="AP-XXXX" className="h-14 rounded-2xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">Technical Spec</label>
                    <textarea
                      className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 resize-none h-40"
                      placeholder="Enter part details, material composition, and technical properties..."
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border-2 border-dashed border-white/5 rounded-[2.5rem] p-10 text-center group hover:border-red-500/30 transition-all bg-white/[0.02] cursor-pointer">
                    <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <Upload className="w-8 h-8 text-zinc-500 group-hover:text-red-500 transition-colors" />
                    </div>
                    <div className="font-bold text-white mb-1">Upload Render</div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">DRAG ASSETS HERE</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">3D Mesh Link (.obj / .gltf)</label>
                    <Input placeholder="https://storage.cloud.com/mesh/model.gltf" className="h-14 rounded-2xl" />
                  </div>

                  <div className="pt-6">
                    <Button variant="auto-primary" className="w-full h-16 rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_20px_50px_rgba(239,68,68,0.2)]">
                      Finalize Intake
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

