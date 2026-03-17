"use client";

import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

export default function ProductCarousel({ products }: { products: Product[] }) {
  // Raddoppiamo i prodotti per il loop infinito
  const duplicatedProducts = [...products, ...products];

  return (
    <div className="relative w-full overflow-hidden py-10 pause-on-hover">
      {/* Sfumature Luxury laterali */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

      {/* Il nastro che scorre */}
      <div className="animate-marquee">
        {duplicatedProducts.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="w-[260px] md:w-[320px] px-4 flex-shrink-0"
          >
            <ProductCard prodotto={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
