import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  CheckCircle,
  User,
  Car,
  MessageSquare
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        vehicleMake: "",
        vehicleModel: "",
        vehicleYear: "",
        message: "",
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero Section */}
      <div className="gradient-mesh py-20 relative overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          className="absolute top-20 right-20 w-40 h-40 border border-red-500/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-10 left-20 w-32 h-32 border border-blue-500/10 rounded-xl"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Get in <span className="text-gradient-red">Touch</span>
            </h1>
            <p className="text-xl text-zinc-400">
              Have questions about our parts or need help with compatibility?
              Our expert team is here to assist you.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Send us a Message</h2>
              </div>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 bg-green-500/20 border border-green-500/30 rounded-xl p-4 flex items-center gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <div>
                      <p className="font-semibold text-green-400">Thank you for your inquiry!</p>
                      <p className="text-sm text-green-400/70">We'll get back to you within 24 hours.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'name' || formData.name
                          ? 'top-2 text-xs text-red-400'
                          : 'top-4 text-sm text-zinc-500'
                        }`}
                    >
                      Full Name *
                    </label>
                    <div className="absolute left-4 top-4 text-zinc-500">
                      <User className={`w-4 h-4 transition-opacity ${focusedField === 'name' || formData.name ? 'opacity-0' : 'opacity-0'}`} />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 pt-6 pb-3 glass-card rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
                    />
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="email"
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'email' || formData.email
                          ? 'top-2 text-xs text-red-400'
                          : 'top-4 text-sm text-zinc-500'
                        }`}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 pt-6 pb-3 glass-card rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="phone"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'phone' || formData.phone
                        ? 'top-2 text-xs text-red-400'
                        : 'top-4 text-sm text-zinc-500'
                      }`}
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 pt-6 pb-3 glass-card rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
                  />
                </div>

                {/* Vehicle Details */}
                <div className="border-t border-white/10 pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Car className="w-5 h-5 text-blue-400" />
                    <h3 className="font-semibold text-white">Vehicle Details (Optional)</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <label
                        htmlFor="vehicleMake"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'vehicleMake' || formData.vehicleMake
                            ? 'top-2 text-xs text-blue-400'
                            : 'top-4 text-sm text-zinc-500'
                          }`}
                      >
                        Make
                      </label>
                      <input
                        type="text"
                        id="vehicleMake"
                        name="vehicleMake"
                        value={formData.vehicleMake}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('vehicleMake')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 pt-6 pb-3 glass-card rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      />
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="vehicleModel"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'vehicleModel' || formData.vehicleModel
                            ? 'top-2 text-xs text-blue-400'
                            : 'top-4 text-sm text-zinc-500'
                          }`}
                      >
                        Model
                      </label>
                      <input
                        type="text"
                        id="vehicleModel"
                        name="vehicleModel"
                        value={formData.vehicleModel}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('vehicleModel')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 pt-6 pb-3 glass-card rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      />
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="vehicleYear"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'vehicleYear' || formData.vehicleYear
                            ? 'top-2 text-xs text-blue-400'
                            : 'top-4 text-sm text-zinc-500'
                          }`}
                      >
                        Year
                      </label>
                      <input
                        type="text"
                        id="vehicleYear"
                        name="vehicleYear"
                        value={formData.vehicleYear}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('vehicleYear')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 pt-6 pb-3 glass-card rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <label
                    htmlFor="message"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'message' || formData.message
                        ? 'top-2 text-xs text-red-400'
                        : 'top-4 text-sm text-zinc-500'
                      }`}
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={6}
                    className="w-full px-4 pt-6 pb-3 glass-card rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full btn-primary py-4 rounded-xl flex items-center justify-center gap-3 text-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5" />
                  Send Inquiry
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Contact Info Card */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-5">
                {[
                  { icon: Phone, label: "Phone", lines: ["+1 (555) 123-4567", "Toll Free: 1-800-AUTO-PRO"], color: "red" },
                  { icon: Mail, label: "Email", lines: ["info@autopartspro.com", "support@autopartspro.com"], color: "blue" },
                  { icon: MapPin, label: "Address", lines: ["123 Auto Street", "Detroit, MI 48201", "United States"], color: "green" },
                  { icon: Clock, label: "Business Hours", lines: ["Mon-Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 4:00 PM", "Sun: Closed"], color: "purple" },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color === 'red' ? 'bg-red-500/20' :
                        item.color === 'blue' ? 'bg-blue-500/20' :
                          item.color === 'green' ? 'bg-green-500/20' : 'bg-purple-500/20'
                      }`}>
                      <item.icon className={`w-5 h-5 ${item.color === 'red' ? 'text-red-400' :
                          item.color === 'blue' ? 'text-blue-400' :
                            item.color === 'green' ? 'text-green-400' : 'text-purple-400'
                        }`} />
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-1">{item.label}</div>
                      {item.lines.map((line, i) => (
                        <div key={i} className="text-sm text-zinc-400">{line}</div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* WhatsApp */}
            <motion.div
              className="relative overflow-hidden rounded-2xl"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative p-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle className="w-6 h-6" />
                  <h3 className="text-lg font-bold">WhatsApp Support</h3>
                </div>
                <p className="text-sm text-green-100 mb-4">
                  Get instant answers to your questions via WhatsApp
                </p>
                <a
                  href="#"
                  className="block w-full bg-white text-green-600 text-center py-3 rounded-xl hover:bg-green-50 transition-colors font-semibold"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Map Placeholder */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 h-48 flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }}
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MapPin className="w-12 h-12 text-red-400" />
                </motion.div>
              </div>
              <div className="p-4">
                <p className="text-sm text-zinc-400">Visit our showroom to see our parts in person</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
