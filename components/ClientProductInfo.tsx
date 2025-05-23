"use client";

import { useState } from "react";
import clsx from 'clsx';

export default function ClientProductInfo({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  
    const sizes = [
      { id: "S", name: "S" },
      { id: "M", name: "M" },
      { id: "L", name: "L" },
      { id: "XL", name: "XL" },
      { id: "XXL", name: "XXL" },
    ];

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="flex flex-col justify-start mb-[20px]">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <p className="text-2xl text-[#ff4100] font-semibold mb-4">${product.price}</p>
      <p className="mb-16 text-gray-700">{product.description}</p>

      <select
        value={size}
        onChange={(e) => setSize(e.target.value)}
        className={clsx(
          'w-[200px] flex h-[2.9em] items-center outline-none pl-[15px] rounded-full border-solid bg-[#ffffff] appearance-none',
          size ? 'border-[#ff4100]' : 'border-[#000000]'
        )}
      >
        <option value="" disabled>
          Vyberte veľkosť
        </option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
      </select>

      <div className="w-[200px] grid grid-cols-[30%_40%_30%] items-center mb-[10px]">
        <button
          onClick={decrease}
          className="h-[30px] bg-[#ff4100] text-[#ffffff] font-[600] rounded-full border-none outline-none focus:outline-none hover:bg-[#e23a00] transition"
        >
          -
        </button>
        <p className="flex justify-center items-center text-lg font-medium">{quantity}</p>
        <button
          onClick={increase}
          className="h-[30px] bg-[#ff4100] text-[#ffffff] font-[600] rounded-full border-none outline-none focus:outline-none hover:bg-[#e23a00] transition"
        >
          +
        </button>
      </div>

      <button className="w-[200px] p-[10px] bg-[#ff4100] text-[#ffffff] font-[600] rounded-full border-none outline-none focus:outline-none hover:bg-[#e23a00] transition">
        Vložiť do košíka
      </button>
    </div>
  );
}