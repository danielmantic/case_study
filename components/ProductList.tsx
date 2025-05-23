"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import CategoryFilter from "./CategoryFilter";
import { useAuth } from "./Auth";
import clsx from 'clsx';

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

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { user } = useAuth();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data: Product[] = await res.json();
        setProducts(data);

        const uniqueCategories = Array.from(new Set(data.map(p => p.category)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [user]);

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  if (loading) return <p>Načítavam...</p>;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <Link href="/login">
          <button className={clsx(
            "mt-[200px] flex justify-center p-[12px] items-center gap-2.5 flex-[1_0_0] p-3 rounded-full mb-[450px]",
            "bg-[#ff4100] text-[#ffffff] font-[600] border-none outline-none focus:outline-none focus:ring-0 hover:no-underline cursor-pointer"
          )}>
            Please log in to view the offer
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="flex flex-wrap gap-x-6 gap-y-4 justify-center">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="w-[220px] h-[260px] transition cursor-pointer flex flex-col items-center justify-start text-center p-[20px] mb-[20px] border border-transparent hover:border-[#ff4100] hover:shadow-md duration-200"
          >
            <img
              src={p.image}
              alt={p.title}
              className="w-full h-[100px] object-contain mb-2"
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
    </div>
  );
}

