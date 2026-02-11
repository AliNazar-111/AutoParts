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
    { path: "/products", label: "Catalog" },
    { path: "/contact", label: "Inquiry" },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "glass-stage border-b border-white/10 py-3"
          : "bg-transparent py-6"
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 md:gap-4 group py-2">
              <motion.div
                className="relative"
                whileHover={{ rotate: 90 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                <Settings className="w-8 h-8 md:w-10 md:h-10 text-primary relative z-10" />
              </motion.div>
              <div className="flex flex-col">
                <div className="text-lg md:text-xl font-black font-heading tracking-tighter text-white group-hover:text-primary transition-colors leading-none uppercase">
                  AutoPart <span className="text-primary">Pro</span>
                </div>
                <div className="text-[9px] md:text-[10px] text-zinc-500 mt-0.5 md:mt-1 uppercase tracking-[0.2em] font-medium">Precision Management</div>
              </div>
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center gap-1 bg-graphite-900/50 p-1 rounded-2xl border border-white/5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-6 py-2.5 group"
                >
                  <span className={`relative z-10 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${isActive(link.path) ? "text-white" : "text-zinc-500 group-hover:text-white"
                    }`}>
                    {link.label}
                  </span>
                  {isActive(link.path) && (
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-white/5 border border-white/10 shadow-lg"
                      layoutId="navGlow"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 md:gap-4">
              {/* Contact Button - Desktop */}
              <Link
                to="/contact"
                className="hidden md:flex btn-ember"
              >
                <Phone className="w-4 h-4" />
                GET A QUOTE
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-12 h-12 flex items-center justify-center rounded-xl bg-graphite-800 hover:bg-graphite-700 border border-white/5 transition-colors focus:ring-2 focus:ring-primary/40 outline-none"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              className="absolute top-0 right-0 w-full max-w-[85vw] h-full bg-graphite-950 border-l border-white/5 p-6 md:p-10 pt-28"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
            >
              <div className="flex flex-col h-full">
                <nav className="space-y-3">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Link
                        to={link.path}
                        className={`flex items-center justify-between h-16 px-6 rounded-2xl border transition-all ${isActive(link.path)
                          ? "bg-primary/10 border-primary/20 text-white"
                          : "text-zinc-400 border-white/5 hover:bg-white/5 hover:text-white"
                          }`}
                      >
                        <span className="font-bold tracking-tight uppercase text-xs">{link.label}</span>
                        <ChevronRight className={`w-5 h-5 ${isActive(link.path) ? "text-primary" : "text-zinc-600"}`} />
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  className="mt-auto pb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    to="/contact"
                    className="btn-ember w-full h-16 text-[10px] font-black tracking-[0.2em]"
                  >
                    <Phone className="w-5 h-5" />
                    REQUEST QUOTE
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Spacer */}
      <div className="h-24 md:h-32" />
    </>
  );
}
