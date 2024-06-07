"use client";

import { NextPage } from "next";
import { useState } from "react";

interface AddProps {
  productId: string;
  variantId: string;
  stockNumber: number;
}

export const Add: NextPage<AddProps> = ({
  productId,
  variantId,
  stockNumber,
}) => {
  const [quantity, setQuantity] = useState<number>(1);

  function handleQuantity(type: "d" | "i") {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="flex w-32 items-center justify-between rounded-3xl bg-gray-100 px-4 py-2">
            <button
              disabled={stockNumber === 0}
              onClick={() => handleQuantity("d")}
              className="cursor-pointer text-xl"
            >
              -
            </button>
            {quantity}
            <button
              disabled={stockNumber === 0}
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity("i")}
            >
              +
            </button>
          </div>

          {stockNumber >= 1 ? (
            <div className="text-xs">
              Only <span className="text-orange-500">{stockNumber} items </span>
              left!
              <br />
              Don&apos;t miss it
            </div>
          ) : (
            <div className="text-xs text-lama">Product is out of stock</div>
          )}
        </div>
        <button
          disabled={stockNumber === 0}
          className="disabled:ring-none w-36 rounded-3xl px-4 py-2 text-sm text-lama ring-1 ring-lama transition hover:bg-lama hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-0"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
