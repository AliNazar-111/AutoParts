import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  Settings,
  Plus,
  Edit,
  Trash2,
  Search,
  Upload,
  Eye,
  TrendingUp,
  Users,
  Box,
  X,
  ChevronRight
} from "lucide-react";
import { mockProducts } from "../data/mockData";

type TabType = "overview" | "products" | "inquiries" | "settings";

function AnimatedCounter({ value }: { value: number }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-3xl font-bold text-white"
    >
      {value}
    </motion.span>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const inquiries = [
    {
      id: "1",
      customerName: "John Smith",
      email: "john@example.com",
      product: "Premium Brake Pad Set",
      date: "2026-01-20",
      status: "New",
    },
    {
      id: "2",
      customerName: "Sarah Johnson",
      email: "sarah@example.com",
      product: "Engine Oil Filter",
      date: "2026-01-19",
      status: "Responded",
    },
    {
      id: "3",
      customerName: "Mike Wilson",
      email: "mike@example.com",
      product: "LED Headlight Assembly",
      date: "2026-01-18",
      status: "New",
    },
  ];

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "inquiries", label: "Inquiries", icon: MessageSquare, badge: inquiries.filter(i => i.status === "New").length },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const stats = [
    { label: "Total Products", value: mockProducts.length, icon: Package, color: "blue", change: "+2 this week" },
    { label: "New Inquiries", value: inquiries.filter(i => i.status === "New").length, icon: MessageSquare, color: "red", change: "Today" },
    { label: "In Stock", value: mockProducts.filter(p => p.stockStatus === "In Stock").length, icon: Box, color: "green", change: "Products" },
    { label: "Low Stock", value: mockProducts.filter(p => p.stockStatus === "Low Stock").length, icon: TrendingUp, color: "yellow", change: "Needs attention" },
  ];

  const filteredProducts = mockProducts.filter(p =>
    searchQuery === "" ||
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.partNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Sidebar */}
      <aside className="w-64 glass-dark border-r border-white/5 p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white">Admin Panel</h2>
          <p className="text-sm text-zinc-500">AutoParts Pro</p>
        </div>

        <nav className="space-y-2 flex-1">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative ${activeTab === item.id
                ? "bg-red-500 text-white"
                : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
              {item.badge && item.badge > 0 && (
                <motion.span
                  className={`ml-auto px-2 py-0.5 rounded-full text-xs font-semibold ${activeTab === item.id
                    ? "bg-white text-red-500"
                    : "bg-red-500 text-white"
                    }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  {item.badge}
                </motion.span>
              )}
              {activeTab === item.id && (
                <motion.div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"
                  layoutId="activeIndicator"
                />
              )}
            </motion.button>
          ))}
        </nav>

        {/* User info */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-semibold">
              A
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Admin User</div>
              <div className="text-xs text-zinc-500">admin@autoparts.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    className="glass-card rounded-2xl p-6 hover-lift cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-zinc-400">{stat.label}</span>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color === 'blue' ? 'bg-blue-500/20' :
                        stat.color === 'red' ? 'bg-red-500/20' :
                          stat.color === 'green' ? 'bg-green-500/20' : 'bg-yellow-500/20'
                        }`}>
                        <stat.icon className={`w-5 h-5 ${stat.color === 'blue' ? 'text-blue-400' :
                          stat.color === 'red' ? 'text-red-400' :
                            stat.color === 'green' ? 'text-green-400' : 'text-yellow-400'
                          }`} />
                      </div>
                    </div>
                    <AnimatedCounter value={stat.value} />
                    <div className={`text-xs mt-1 ${stat.color === 'green' ? 'text-green-400' :
                      stat.color === 'red' ? 'text-red-400' :
                        stat.color === 'yellow' ? 'text-yellow-400' : 'text-zinc-500'
                      }`}>
                      {stat.change}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Inquiries */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Recent Inquiries</h2>
                  <button
                    onClick={() => setActiveTab("inquiries")}
                    className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1"
                  >
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  {inquiries.map((inquiry, idx) => (
                    <motion.div
                      key={inquiry.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-white font-semibold">
                          {inquiry.customerName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{inquiry.customerName}</div>
                          <div className="text-sm text-zinc-500">{inquiry.product}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-zinc-500 mb-1">{inquiry.date}</div>
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-semibold ${inquiry.status === "New"
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : "bg-green-500/20 text-green-400 border border-green-500/30"
                            }`}
                        >
                          {inquiry.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Product Management</h1>
                <motion.button
                  onClick={() => setShowAddProduct(true)}
                  className="btn-primary flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus className="w-5 h-5" />
                  Add Product
                </motion.button>
              </div>

              {/* Search */}
              <div className="mb-6 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search products by name or part number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 glass-card rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                />
              </div>

              {/* Product Table */}
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-400">Product</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-400">Category</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-400">Price</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-400">Stock</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-400">3D Model</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product, idx) => (
                        <motion.tr
                          key={product.id}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div>
                                <div className="font-semibold text-white">{product.name}</div>
                                <div className="text-xs text-zinc-500 font-mono">{product.partNumber}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-zinc-300">{product.category}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-white">${product.price.toFixed(2)}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`text-xs px-2.5 py-1 rounded-full font-semibold ${product.stockStatus === "In Stock"
                                ? "bg-green-500/20 text-green-400"
                                : product.stockStatus === "Low Stock"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-red-500/20 text-red-400"
                                }`}
                            >
                              {product.stockStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {product.has3D ? (
                              <span className="text-xs text-green-400 font-semibold flex items-center gap-1">
                                <Box className="w-3 h-3" />
                                Available
                              </span>
                            ) : (
                              <span className="text-xs text-zinc-500">Not uploaded</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1">
                              <motion.button
                                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                whileHover={{ scale: 1.1 }}
                              >
                                <Eye className="w-4 h-4 text-blue-400" />
                              </motion.button>
                              <motion.button
                                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                whileHover={{ scale: 1.1 }}
                              >
                                <Edit className="w-4 h-4 text-zinc-400" />
                              </motion.button>
                              <motion.button
                                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                whileHover={{ scale: 1.1 }}
                              >
                                <Trash2 className="w-4 h-4 text-red-400" />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add Product Modal */}
              <AnimatePresence>
                {showAddProduct && (
                  <motion.div
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowAddProduct(false)}
                  >
                    <motion.div
                      className="glass-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 20 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white">Add New Product</h2>
                        <button
                          onClick={() => setShowAddProduct(false)}
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <X className="w-5 h-5 text-zinc-400" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-zinc-300 mb-2">Product Name</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 glass-card rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                            placeholder="Enter product name"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-zinc-300 mb-2">Category</label>
                            <select className="w-full px-4 py-3 glass-card rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 cursor-pointer">
                              <option className="bg-zinc-900">Engine</option>
                              <option className="bg-zinc-900">Brakes</option>
                              <option className="bg-zinc-900">Suspension</option>
                              <option className="bg-zinc-900">Electrical</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-zinc-300 mb-2">Price</label>
                            <input
                              type="number"
                              className="w-full px-4 py-3 glass-card rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                              placeholder="0.00"
                              step="0.01"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-zinc-300 mb-2">Description</label>
                          <textarea
                            className="w-full px-4 py-3 glass-card rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 resize-none"
                            rows={4}
                            placeholder="Enter product description"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-zinc-300 mb-2">Upload Image</label>
                          <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-red-500/50 transition-colors cursor-pointer">
                            <Upload className="w-12 h-12 text-zinc-500 mx-auto mb-2" />
                            <p className="text-sm text-zinc-400">Click to upload or drag and drop</p>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-zinc-300 mb-2">3D Model Link</label>
                          <input
                            type="url"
                            className="w-full px-4 py-3 glass-card rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                            placeholder="https://example.com/3d-model"
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 mt-8">
                        <button
                          onClick={() => setShowAddProduct(false)}
                          className="flex-1 btn-secondary"
                        >
                          Cancel
                        </button>
                        <button className="flex-1 btn-primary">
                          Add Product
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Inquiries Tab */}
          {activeTab === "inquiries" && (
            <motion.div
              key="inquiries"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h1 className="text-3xl font-bold text-white mb-8">Customer Inquiries</h1>

              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-400">Customer</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-400">Email</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-400">Product</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-400">Date</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-400">Status</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.map((inquiry, idx) => (
                        <motion.tr
                          key={inquiry.id}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-white font-semibold">
                                {inquiry.customerName.charAt(0)}
                              </div>
                              <span className="font-semibold text-white">{inquiry.customerName}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-zinc-400">{inquiry.email}</td>
                          <td className="px-6 py-4 text-sm text-zinc-300">{inquiry.product}</td>
                          <td className="px-6 py-4 text-sm text-zinc-400">{inquiry.date}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`text-xs px-2.5 py-1 rounded-full font-semibold ${inquiry.status === "New"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-green-500/20 text-green-400"
                                }`}
                            >
                              {inquiry.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-sm text-blue-400 hover:text-blue-300 font-semibold">
                              View Details
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

              <div className="glass-card rounded-2xl p-8">
                <p className="text-zinc-400">Settings configuration would be displayed here.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
