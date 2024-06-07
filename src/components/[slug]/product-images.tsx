"use client";

import { products } from "@wix/stores";
import { NextPage } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useState } from "react";

interface ProductImagesProps {
  items: products.MediaItem[] | undefined;
}

export const ProductImages: NextPage<ProductImagesProps> = ({ items }) => {
  const [index, setIndex] = useState<number>(0);

  if (!items) {
    notFound();
  }

  return (
    <div>
      <div className="relative h-[500px]">
        <Image
          src={items[index].image?.url as string}
          alt=""
          fill
          sizes="50vw"
          className="rounded-md object-cover"
          priority
        />
      </div>

      <div className="flex gap-4">
        {items.map((item: any, idx: number) => (
          <div
            className="relative mt-8 h-32 w-1/4 gap-4"
            key={item._id}
            onClick={() => setIndex(idx)}
          >
            <Image
              src={item.image.url}
              alt=""
              fill
              sizes="30vw"
              className="cursor-pointer object-cover"
            />
          </div>
        ))}
      </div>

      <div className=""></div>
    </div>
  );
};
