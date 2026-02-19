"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "react-toastify";
import { ShoppingCart } from "lucide-react";
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
} // 1. Definiamo com'è fatto un prodotto nel carrello
//
export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
}

// Nel CartContextType, cambiamo la firma della funzione
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void; // <--- Sostituito any con Product
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} aggiunto al carrello!`, {
      position: "bottom-right",
      autoClose: 2000,
      icon: <ShoppingCart size={20} />, // Icona di Shopping Cart,
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizzato per usare il carrello facilmente
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart deve essere usato dentro un CartProvider");
  return context;
};
