import { Outlet } from "react-router";
import Header from "../app/components/Header";
import Footer from "../app/components/Footer";

export default function Root() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f] text-white">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
