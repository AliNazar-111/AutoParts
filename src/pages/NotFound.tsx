import { Link } from "react-router";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-zinc-900 mb-4">404</h1>
        <p className="text-xl text-zinc-600 mb-8">Page not found</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
