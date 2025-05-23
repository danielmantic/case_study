"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

function truncateTitle(title: string, maxLength: number) {
  return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
}

export default function ProductsCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 250;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="flex flex-col mt-[100px] mb-[50px] items-center px-12"> {/* posunutie vonkajšieho obsahu */}
      <div className="grid grid-cols-[5%_90%_5%] w-full max-w-[1200px]">
    <div>
      <button
        onClick={() => scroll("left")}
        className="h-full bg-[#000000] text-[#ffffff] border-none outline-none focus:outline-none hover:bg-[#e23a00] transition"
      >
        ◀
      </button>
    </div>
    <div
      ref={carouselRef}
      className="overflow-x-auto no-scrollbar flex gap-4 scroll-smooth"
    >
      {products.map((p) => (
        <div
          key={p.id}
          className="min-w-[190px] h-[240px] transition cursor-pointer flex flex-col items-center justify-start text-center p-[20px] border border-transparent hover:border-[#ff4100] hover:shadow-md duration-200"
        >
          <img
            src={p.image}
            alt={p.title}
            className="w-full h-[80px] object-contain mb-2"
          />
          <p className="text-[#000000]">{truncateTitle(p.title, 22)}</p>
          <p className="text-[#ff4100] font-[600] mb-2">${p.price}</p>
          <Link href={`/detail/${p.id}`}>
            <button className="bg-[#ff4100] font-[600] text-[#ffffff] p-[10px] border-none outline-none focus:outline-none hover:bg-[#e23a00] transition">
              Detail
            </button>
          </Link>
        </div>
      ))}
    </div>
    <div>
      <button
        onClick={() => scroll("right")}
        className="h-full bg-[#000000] text-[#ffffff] border-none outline-none focus:outline-none hover:bg-[#e23a00] transition"
      >
        ▶
      </button>
    </div>
  </div>
</div>
  );
}

