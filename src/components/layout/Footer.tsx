import { Link } from "react-router";
import { motion } from "motion/react";
import { Settings, Phone, Mail, MapPin, MessageCircle, ArrowUp, Github, Twitter, Linkedin, ShieldCheck } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Inventory", path: "/products" },
    { label: "Technical Support", path: "/contact" },
    { label: "Terms of Service", path: "/terms" },
    { label: "Privacy Protocol", path: "/privacy" },
  ];

  const categories = [
    { label: "Drivetrain Systems", path: "/products?category=engine" },
    { label: "Braking Precision", path: "/products?category=brakes" },
    { label: "Suspension Matrix", path: "/products?category=suspension" },
    { label: "Energy & Electronics", path: "/products?category=electrical" },
  ];

  return (
    <footer className="relative bg-graphite-950 border-t border-white/5 pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden">
      {/* Industrial Context Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,var(--primary-glow)_0%,transparent_50%)] opacity-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 lg:gap-24">
          {/* Brand Staging */}
          <div className="space-y-6 md:space-y-8">
            <Link to="/" className="flex items-center gap-4 group">
              <motion.div
                className="relative"
                whileHover={{ rotate: 90 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                <Settings className="w-10 h-10 text-primary relative z-10" />
              </motion.div>
              <div className="flex flex-col">
                <div className="text-xl font-black font-heading tracking-tighter text-white uppercase leading-none">
                  AutoPart <span className="text-primary">Pro</span>
                </div>
                <div className="text-[10px] text-zinc-500 mt-1 font-bold uppercase tracking-[0.2em]">Precision Systems</div>
              </div>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed font-medium max-w-sm">
              The premier industrial platform for certified automotive components. Engineering trust through high-fidelity visualization and expert logistics.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Github].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 flex items-center justify-center text-zinc-400 hover:text-primary transition-all shadow-lg"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Operational Links */}
          <div className="sm:pl-4 md:pl-0">
            <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-6 md:mb-8 font-heading">Operations</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-3 group font-medium py-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Catalog Segments */}
          <div className="sm:pl-4 md:pl-0">
            <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-6 md:mb-8 font-heading">Taxonomy</h4>
            <ul className="space-y-4">
              {categories.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-3 group font-medium py-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Matrix */}
          <div className="sm:pl-4 md:pl-0">
            <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-6 md:mb-8 font-heading">Connectivity</h4>
            <ul className="space-y-5 md:space-y-6">
              {[
                { icon: Phone, text: "+1 (800) AUTO-PRO" },
                { icon: Mail, text: "hq@autopartspro.io" },
                { icon: MapPin, text: "Industrial Zone A, Detroit MI" },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0 transition-all group-hover:border-primary/20">
                    <item.icon className="w-4 h-4 text-zinc-400 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-sm text-zinc-500 group-hover:text-zinc-300 transition-colors font-medium mt-2 leading-tight">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Global Footer Bar */}
        <div className="border-t border-white/5 mt-16 md:mt-24 pt-8 md:pt-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest leading-none">
              © {new Date().getFullYear()} AutoPart Pro Systems Global.
            </p>
            <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/2 cursor-default shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">Enterprise Encrypted Baseline</span>
            </div>
          </div>

          <div className="flex items-center gap-6 md:gap-8">
            <div className="flex items-center gap-4 md:gap-6">
              <Link to="/legal" className="text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors font-bold uppercase tracking-widest">Regulatory</Link>
              <Link to="/compliance" className="text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors font-bold uppercase tracking-widest">Compliance</Link>
            </div>
            <motion.button
              onClick={scrollToTop}
              className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 flex items-center justify-center text-zinc-400 hover:text-primary transition-all shadow-xl"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
