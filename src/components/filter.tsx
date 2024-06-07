"use client";

import { NextPage } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface FilterProps {}

export const Filter: NextPage<FilterProps> = ({}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex justify-between">
      <div className="flex flex-wrap gap-6">
        <select
          name="type"
          id=""
          className="rounded-2xl bg-[#EBEDED] px-4 py-2 text-xs font-medium"
          onChange={handleFilterChange}
        >
          <option>Type</option>
          <option value="physical">Physical</option>
          <option value="digital">Digital</option>
        </select>
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="w-24 rounded-2xl pl-2 text-xs ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="w-24 rounded-2xl pl-2 text-xs ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />
        {/* <select
          name="size"
          id=""
          className="rounded-2xl bg-[#EBEDED] px-4 py-2 text-xs font-medium"
        >
          <option>Size</option>
          <option value="">Size</option>
        </select>
        <select
          name="color"
          id=""
          className="rounded-2xl bg-[#EBEDED] px-4 py-2 text-xs font-medium"
        >
          <option>Color</option>
          <option value="">Test</option>
        </select> */}
        <select
          name="cat"
          id=""
          className="rounded-2xl bg-[#EBEDED] px-4 py-2 text-xs font-medium"
          onChange={handleFilterChange}
        >
          <option>Category</option>
          <option value="new">New Arrival</option>
          <option value="popular">Popular</option>
        </select>
        <select
          name="type"
          id=""
          className="rounded-2xl bg-[#EBEDED] px-4 py-2 text-xs font-medium"
        >
          <option>All Filters</option>
          <option value="">Test</option>
        </select>
      </div>
      <div className="">
        <select
          onChange={handleFilterChange}
          name="sort"
          id=""
          className="rounded-2xl bg-white px-4 py-2 text-xs font-medium ring-1 ring-gray-400"
        >
          <option>Sort by</option>
          <option value="asc price">Price (low to high)</option>
          <option value="desc price">Price (high to low)</option>
          <option value="asc lastUpdated">Newest</option>
          <option value="desc lastUpdated">Oldest</option>
        </select>
      </div>
    </div>
  );
};