"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "react-toastify";
import { ShoppingCart } from "lucide-react";

// 1. Definiamo il tipo Prodotto (coerente con il tuo JSON)
export interface Product {
  id: string; // Nel JSON l'id è tra virgolette "1"
  name: string;
  category: string;
  price: string; // Nel JSON è stringa "22.50"
  image: string;
  isNew: boolean;
  isPromo: boolean;
}

// 2. Definiamo l'oggetto nel carrello (qui convertiamo i dati per i calcoli)
export interface CartItem {
  id: string; // Deve essere stringa come l'originale
  name: string;
  price: number; // Diventa numero per fare totalPrice
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
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

      // IMPORTANTE: Convertiamo il prezzo da stringa a numero qui
      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          price: parseFloat(product.price), // Da "22.50" a 22.50
          image: product.image,
          quantity: 1,
        },
      ];
    });

    toast.success(`${product.name} aggiunto!`, {
      position: "bottom-right",
      autoClose: 2000,
      icon: <ShoppingCart size={20} />,
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
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

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart deve essere usato dentro un CartProvider");
  return context;
};
