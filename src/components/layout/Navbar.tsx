import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Settings, Phone, Menu, X, ChevronRight } from "lucide-react";

export default function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-[#0a0a0f] border-b border-white/5 py-3 shadow-2xl"
          : "bg-[#0a0a0f] border-b border-white/5 py-5"
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                className="relative"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full" />
                <Settings className="w-10 h-10 text-red-500 relative z-10" />
              </motion.div>
              <div className="flex flex-col">
                <div className="text-[20px] font-bold text-white group-hover:text-red-500 transition-colors leading-none">
                  AutoParts <span className="text-red-500">Pro</span>
                </div>
                <div className="text-[12px] text-zinc-400 mt-1">Premium Auto Components For Toyota</div>
              </div>
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-6 py-2 group flex items-center justify-center"
                >
                  <span className={`relative z-10 text-sm font-bold transition-all duration-300 ${isActive(link.path) ? "text-white" : "text-zinc-500 group-hover:text-white"
                    }`}>
                    {link.label}
                  </span>
                  {isActive(link.path) && (
                    <motion.div
                      className="absolute inset-x-0 inset-y-0 border border-red-500/40 rounded-lg bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                      layoutId="activeNavIndicator"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <motion.span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-red-500 rounded-full transition-all duration-300 ${isActive(link.path) ? "w-1/2 opacity-100" : "w-0 group-hover:w-1/2 opacity-0 group-hover:opacity-100"}`}
                    style={{ bottom: '-4px' }}
                  />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {/* Contact Button - Desktop */}
              <Link
                to="/contact"
                className="hidden md:flex bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-red-600/20 items-center gap-2 transition-all active:scale-95"
              >
                <Phone className="w-4 h-4" />
                Contact Us
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="absolute top-0 right-0 w-80 h-full bg-[#0a0a0f] border-l border-white/10 p-6 pt-24"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <nav className="space-y-2">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center justify-between p-4 rounded-xl transition-colors ${isActive(link.path)
                        ? "bg-red-500/20 text-red-400"
                        : "text-white hover:bg-white/5"
                        }`}
                    >
                      <span className="font-medium">{link.label}</span>
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  to="/contact"
                  className="btn-primary w-full flex items-center justify-center gap-2 py-4"
                >
                  <Phone className="w-5 h-5" />
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  );
}
