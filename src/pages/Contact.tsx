import { useState } from "react";
import { useInquiry } from "../hooks/useInquiry";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
  Car,
  MessageSquare,
  ShieldCheck,
  Zap,
  Globe
} from "lucide-react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Textarea } from "../components/ui/Textarea";

export default function Contact() {
  const { submitInquiry, loading, error, success } = useInquiry();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await submitInquiry({
      product: "general-inquiry", // Fallback for contact page
      vehicleInfo: {
        make: formData.vehicleMake,
        model: formData.vehicleModel,
        year: parseInt(formData.vehicleYear) || 0,
      },
      contactInfo: {
        phone: formData.phone,
        email: formData.email,
      },
      type: 'general',
      message: `Inquiry from ${formData.name}: ${formData.message}`
    });

    if (!error) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        vehicleMake: "",
        vehicleModel: "",
        vehicleYear: "",
        message: "",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-graphite-950 pt-32 pb-24 overflow-hidden">
      {/* Background Staging */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,var(--primary-glow)_0%,transparent_60%)] opacity-5 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Global Connectivity Hub</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter font-heading leading-none"
          >
            Direct <span className="text-primary">Transmission</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-zinc-500 leading-relaxed font-medium max-w-2xl"
          >
            Access our specialized engineering matrix. Whether for high-fidelity component verification or priority logistics orchestration, our advisors are active.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Connectivity Matrix */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-4 h-4 text-zinc-600" />
              <h2 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Communication Channels</h2>
            </div>

            {[
              { icon: Phone, label: "Technical Advisory", value: "+1 (800) AUTO-PRO", color: "red" },
              { icon: Mail, label: "Digital Correspondence", value: "ops@autopartspro.io", color: "blue" },
              { icon: MapPin, label: "Operations Center", value: "Ind. Sector A, Detroit MI 48201", color: "green" },
              { icon: Clock, label: "Synchronized Hours", value: "08:00 - 18:00 EST / MON-FRI", color: "purple" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-stage rounded-2xl p-6 flex items-center gap-6 border border-white/5 hover:border-primary/20 transition-all group cursor-default"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-white/2 group-hover:bg-primary group-hover:text-white transition-all shadow-xl">
                  <item.icon className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 group-hover:text-primary transition-colors mb-1">{item.label}</div>
                  <div className="text-white font-black text-sm uppercase tracking-widest">{item.value}</div>
                </div>
              </motion.div>
            ))}

            {/* Instant Identification (WhatsApp) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-stage rounded-[2.5rem] p-10 mt-12 overflow-hidden relative group industrial-border hover:border-green-500/30 transition-all"
            >
              <div className="absolute -top-10 -right-10 p-4 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                <MessageCircle className="w-48 h-48 text-green-500" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">Live Identification</h3>
                </div>
                <p className="text-zinc-500 text-sm mb-8 font-medium leading-relaxed">Transmit component imagery for instantaneous OEM cross-referencing and identification.</p>
                <Button className="w-full h-14 bg-green-600 hover:bg-green-500 text-white font-black uppercase text-[10px] tracking-widest border-0 rounded-2xl shadow-xl shadow-green-600/20">
                  Initialize Session
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Inquiry Transmission Interface */}
          <div className="lg:col-span-8">
            <div className="glass-stage rounded-[3rem] p-8 md:p-16 industrial-border relative group">
              <div className="absolute top-0 right-0 p-16 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-1000">
                <Send className="w-80 h-80 text-white" />
              </div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-[1.5rem] flex items-center justify-center border border-primary/20 shadow-2xl">
                      <MessageSquare className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-white uppercase tracking-tighter font-heading">Secure Inquiry</h2>
                      <p className="text-zinc-500 font-medium text-sm mt-1 flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                        Encrypted transmissionactive
                      </p>
                    </div>
                  </div>
                  <div className="px-6 py-3 rounded-2xl bg-white/2 border border-white/5">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Avg. Response Latency: <span className="text-white">120m</span></span>
                  </div>
                </div>

                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mb-12"
                    >
                      <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-8 flex items-center gap-6 shadow-2xl">
                        <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                          <div className="font-black text-white text-xl uppercase tracking-tighter">Transmission Successful</div>
                          <p className="text-zinc-500 text-sm font-medium">Data packets received. An advisor will contact shortly.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-12"
                    >
                      <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 flex items-center gap-6 shadow-2xl">
                        <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center">
                          <AlertCircle className="w-6 h-6 text-red-500" />
                        </div>
                        <div>
                          <div className="font-black text-white text-xl uppercase tracking-tighter">Transmission Error</div>
                          <p className="text-zinc-500 text-sm font-medium">{error}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-1">Operator Identity</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="AUTHENTICATED NAME"
                        required
                        className="h-12 bg-white/2 border-white/5 rounded-2xl font-bold transition-all focus-visible:bg-white/5"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-1">Transmission Email</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="COMMUNICATION@NODE.IO"
                        required
                        className="h-12 bg-white/2 border-white/5 rounded-2xl font-bold transition-all focus-visible:bg-white/5"
                      />
                    </div>
                  </div>

                  <div className="p-8 bg-white/2 rounded-[2rem] border border-white/5 space-y-8">
                    <div className="flex items-center gap-3">
                      <Car className="w-4 h-4 text-primary" />
                      <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Hardware Specifications</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Input
                        name="vehicleMake"
                        value={formData.vehicleMake}
                        onChange={handleChange}
                        placeholder="CHASSIS MAKE"
                        className="h-14 bg-graphite-950/50"
                      />
                      <Input
                        name="vehicleModel"
                        value={formData.vehicleModel}
                        onChange={handleChange}
                        placeholder="MODEL VARIANT"
                        className="h-14 bg-graphite-950/50"
                      />
                      <Input
                        name="vehicleYear"
                        value={formData.vehicleYear}
                        onChange={handleChange}
                        placeholder="MFG YEAR"
                        className="h-14 bg-graphite-950/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-1">Inquiry Parameters</label>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-700">Detailed logs preferred</span>
                    </div>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Specify technical requirements, serial identifiers or compatibility queries..."
                      required
                      rows={5}
                      className="w-full bg-white/2 border-white/5 rounded-[2rem] p-8 text-white placeholder-zinc-800 focus-visible:bg-white/5"
                    />
                  </div>

                  <div className="pt-6">
                    <Button type="submit" disabled={loading} variant="default" className="w-full h-16 text-xs font-black uppercase tracking-[0.4em] rounded-2xl shadow-premium group">
                      <Zap className="w-4 h-4 mr-4 text-white group-hover:animate-pulse" />
                      {loading ? "Transmitting..." : "Initialize Transmission"}
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

