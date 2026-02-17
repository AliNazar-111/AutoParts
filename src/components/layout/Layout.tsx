import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { InquiryModal } from "../product/InquiryModal";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f] text-white">
      <Navbar />
      <main className="flex-1 relative z-20">
        <Outlet />
      </main>
      <Footer />
      <InquiryModal />
    </div>
  );
}
