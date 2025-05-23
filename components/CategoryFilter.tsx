"use client";

import React from "react";

type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="w-full bg-[#ff4100] mb-[40px]">
      <div className="flex flex-wrap gap-x-6 gap-y-4 justify-center">
        <button
          onClick={() => onCategoryChange("")}
          className={`w-[150px] p-[15px] font-[600] border-none outline-none focus:outline-none hover:bg-[#e23a00] transition ${
              selectedCategory === ""
                ? "bg-white text-[#ff4100]"
                : "bg-[#ff4100] text-[#ffffff] border-white hover:bg-white"
            }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`w-[150px] p-[15px] font-[600] border-none outline-none focus:outline-none hover:bg-[#e23a00] transition ${
              selectedCategory === category
                ? "bg-white text-[#ff4100]"
                : "bg-[#ff4100] text-[#ffffff] border-white hover:bg-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
