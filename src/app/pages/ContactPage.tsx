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
  Car,
  MessageSquare
} from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

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
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Get in <span className="text-gradient-red">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-zinc-500 leading-relaxed"
          >
            Have technical questions about compatibility or parts? Our expert automotive engineers are ready to assist you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-8">Contact Info</h2>
            {[
              { icon: Phone, label: "Customer Support", value: "+1 (555) 123-4567", color: "red" },
              { icon: Mail, label: "General Inquiries", value: "info@autopartspro.com", color: "blue" },
              { icon: MapPin, label: "Showroom Location", value: "123 Detroit Auto St, MI 48201", color: "green" },
              { icon: Clock, label: "Business Hours", value: "Mon-Fri: 8AM - 6PM", color: "purple" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card rounded-2xl p-6 flex items-center gap-6 border-white/5 hover:border-white/10 transition-colors group"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-white/5 group-hover:scale-110 transition-transform ${item.color === 'red' ? 'text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]' :
                  item.color === 'blue' ? 'text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)]' :
                    item.color === 'green' ? 'text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.1)]' : 'text-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.1)]'
                  }`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">{item.label}</div>
                  <div className="text-white font-semibold">{item.value}</div>
                </div>
              </motion.div>
            ))}

            {/* WhatsApp Integration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-600/10 border border-green-500/20 rounded-3xl p-8 mt-12 overflow-hidden relative group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-700">
                <MessageCircle className="w-32 h-32" />
              </div>
              <h3 className="text-2xl font-bold text-green-500 mb-4 flex items-center gap-3">
                <MessageCircle className="w-6 h-6" />
                Live WhatsApp
              </h3>
              <p className="text-green-500/80 text-sm mb-6">Need a quote now? Send us pictures of your old part for instant identification.</p>
              <Button className="w-full bg-green-600 hover:bg-green-500 text-white border-0 h-14 text-lg">
                Message Us
              </Button>
            </motion.div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Send className="w-64 h-64" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">Send Message</h2>
                    <p className="text-zinc-500">We usually respond in under 2 hours</p>
                  </div>
                </div>

                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-8"
                    >
                      <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 flex items-center gap-4">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                        <div>
                          <div className="font-bold text-white text-lg">Message Sent Successully!</div>
                          <p className="text-zinc-500 text-sm">One of our specialists will touch base with you shortly.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-zinc-500 uppercase ml-1">Full Name</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="h-14"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-zinc-500 uppercase ml-1">Email Address</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="h-14"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-zinc-500 uppercase ml-1">Phone Number</label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        required
                        className="h-14"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                      <div className="flex items-center gap-2 text-blue-500 font-bold text-sm uppercase">
                        <Car className="w-4 h-4" />
                        Vehicle Specs
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          name="vehicleMake"
                          value={formData.vehicleMake}
                          onChange={handleChange}
                          placeholder="Make"
                          className="h-12"
                        />
                        <Input
                          name="vehicleYear"
                          value={formData.vehicleYear}
                          onChange={handleChange}
                          placeholder="Year"
                          className="h-12"
                        />
                      </div>
                      <Input
                        name="vehicleModel"
                        value={formData.vehicleModel}
                        onChange={handleChange}
                        placeholder="Model / Chassis"
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-zinc-500 uppercase ml-1">Your Inquiry</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about the part you need..."
                        required
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 pt-4">
                    <Button type="submit" variant="auto-primary" className="w-full h-16 text-lg font-bold">
                      <Send className="w-5 h-5 mr-2" />
                      Send Inquiry
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

