import { createBrowserRouter } from "react-router";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetails from "@/pages/ProductDetails";
import Contact from "@/pages/Contact";
import Dashboard from "@/pages/admin/Dashboard";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "products", Component: Products },
      { path: "products/:id", Component: ProductDetails },
      { path: "contact", Component: Contact },
      { path: "admin", Component: Dashboard },
      { path: "*", Component: NotFound },
    ],
  },
]);
