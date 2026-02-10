import { Link } from "react-router";
import { Home, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-graphite-950 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary-glow)_0%,transparent_70%)] opacity-5 pointer-events-none" />

      <div className="text-center relative z-10 px-6">
        <div className="flex flex-col items-center mb-12">
          <div className="w-24 h-24 bg-primary/10 rounded-[2rem] flex items-center justify-center mb-8 border border-primary/20 shadow-2xl relative">
            <AlertTriangle className="w-10 h-10 text-primary animate-pulse" />
            <div className="absolute -inset-4 bg-primary/5 blur-2xl rounded-full" />
          </div>
          <h1 className="text-[12rem] font-black text-white/5 leading-none font-heading absolute -top-20 left-1/2 -translate-x-1/2 select-none tracking-tighter">
            404
          </h1>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter font-heading mb-4 relative">
            Transmission <span className="text-primary">Lost</span>
          </h2>
          <p className="text-zinc-500 font-medium max-w-sm mx-auto leading-relaxed">
            The requested navigation path has been interrupted or does not exist within the current system schema.
          </p>
        </div>

        <Link to="/">
          <Button variant="default" size="lg" className="h-16 px-10 font-black uppercase tracking-widest text-[10px] rounded-2xl group">
            <Home className="w-4 h-4 mr-3" />
            Reconnect to Core
            <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>

        <div className="mt-16 pt-10 border-t border-white/5">
          <p className="text-[9px] text-zinc-700 font-bold uppercase tracking-[0.4em]">Protocol Recovery v1.0.4 Active</p>
        </div>
      </div>
    </div>
  );
}
