import { createBrowserRouter } from "react-router";
import Root from "@/app/Root";
import LandingPage from "@/app/pages/LandingPage";
import ProductListingPage from "@/app/pages/ProductListingPage";
import ProductDetailPage from "@/app/pages/ProductDetailPage";
import ContactPage from "@/app/pages/ContactPage";
import AdminDashboard from "@/app/pages/AdminDashboard";
import NotFound from "@/app/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: LandingPage },
      { path: "products", Component: ProductListingPage },
      { path: "products/:id", Component: ProductDetailPage },
      { path: "contact", Component: ContactPage },
      { path: "admin", Component: AdminDashboard },
      { path: "*", Component: NotFound },
    ],
  },
]);
