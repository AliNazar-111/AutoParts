import { Link } from "react-router";
import { motion } from "motion/react";
import { Settings, Phone, Mail, MapPin, MessageCircle, ArrowUp, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#0a0a0f] border-t border-white/5">
      {/* Gradient overlay */}
      <div className="absolute inset-0 gradient-mesh opacity-30" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <motion.div
                className="relative"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-red-500/30 blur-xl rounded-full" />
                <Settings className="w-10 h-10 text-red-500 relative" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                  AutoParts Pro
                </h3>
                <p className="text-xs text-zinc-500">Premium Auto Components</p>
              </div>
            </Link>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
              Your trusted source for genuine auto parts with 3D visualization and expert support.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Github, href: "#" },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-zinc-400 hover:text-red-400 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", path: "/" },
                { label: "Products", path: "/products" },
                { label: "Contact", path: "/contact" },
                { label: "Admin", path: "/admin" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-zinc-400 hover:text-red-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-red-500 group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-6">Categories</h4>
            <ul className="space-y-3">
              {[
                { label: "Engine Parts", path: "/products?category=engine" },
                { label: "Brakes", path: "/products?category=brakes" },
                { label: "Suspension", path: "/products?category=suspension" },
                { label: "Electrical", path: "/products?category=electrical" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-zinc-400 hover:text-red-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-red-500 group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              {[
                { icon: Phone, text: "+1 (555) 123-4567" },
                { icon: Mail, text: "info@autopartspro.com" },
                { icon: MapPin, text: "123 Auto Street, Detroit, MI 48201" },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-zinc-400 group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-red-500/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <item.icon className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="pt-1.5">{item.text}</span>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} AutoParts Pro. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
          </div>

          <motion.button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-zinc-400 hover:text-red-400 transition-colors"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
