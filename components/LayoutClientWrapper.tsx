"use client"; // Qui lo stato è ammesso!

import { useState } from "react";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";
import { CartProvider } from "@/context/CartContext";
import { ToastContainer } from "react-toastify"; // Importa il contenitore
import "react-toastify/dist/ReactToastify.css"; // Importa gli stili base
import Footer from "./Footer";

export default function LayoutClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <CartProvider>
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <main>{children}</main>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Footer />
      </CartProvider>
    </>
  );
}
