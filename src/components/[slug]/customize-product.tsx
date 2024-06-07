"use client";

import { products } from "@wix/stores";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Add } from "../add";

interface CustomizeProductProps {
  variants: products.Variant[];
  productOptions: products.ProductOption[];
  productId: string;
}

export const CustomizeProduct: NextPage<CustomizeProductProps> = ({
  variants,
  productOptions,
  productId,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<products.Variant>();
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    const variant = variants.find((v) => {
      const variantChoices = v.choices;

      if (!variantChoices) return false;

      return Object.entries(selectedOptions).every(
        ([key, value]) => variantChoices[key] === value,
      );
    });

    setSelectedVariant(variant);
  }, [variants, selectedOptions]);

  function handleOptionSelect(optionType: string, choice: string) {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
  }

  function isVariantInStock(choices: { [key: string]: string }) {
    return variants.some((variant) => {
      const variantChoices = variant.choices;

      if (!variantChoices) return false;

      return (
        Object.entries(choices).every(
          ([key, value]) => variantChoices[key] === value,
        ) &&
        variant.stock?.inStock &&
        variant.stock?.quantity &&
        variant.stock.quantity > 0
      );
    });
  }

  return (
    <div>
      {productOptions.map((item) => (
        <div className="flex flex-col gap-4" key={item.name}>
          <h4 className="font-medium">Choose a {item.name}</h4>
          <ul className="flex items-center gap-3">
            {item.choices?.map((choice) => {
              const disabled = !isVariantInStock({
                ...selectedOptions,
                [item.name!]: choice.description!,
              });

              const selected =
                selectedOptions[item.name!] === choice.description;

              const clickHandler = disabled
                ? undefined
                : () => handleOptionSelect(item.name!, choice.description!);

              return item.name === "color" ? (
                <li
                  onClick={clickHandler}
                  key={choice.description}
                  className="relative size-8 rounded-full ring-1 ring-gray-300"
                  style={{
                    backgroundColor: choice.value,
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                >
                  {selected && (
                    <div className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2" />
                  )}
                  {disabled && (
                    <div className="absolute left-1/2 top-1/2 h-[2px] w-10 -translate-x-1/2 -translate-y-1/2 rotate-45 transform rounded-full bg-red-400" />
                  )}
                </li>
              ) : (
                <li
                  onClick={clickHandler}
                  className="rounded-md px-4 py-1 text-sm text-lama ring-1 ring-lama"
                  key={choice.description}
                  style={{
                    cursor: disabled ? "not-allowed" : "pointer",
                    backgroundColor: selected
                      ? "#f35c7a"
                      : disabled
                        ? "#FBCFE8"
                        : "white",
                    color: selected || disabled ? "white" : "#f35c7a",
                    boxShadow: disabled ? "none" : "",
                  }}
                >
                  {choice.description}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <Add
        productId={productId}
        variantId={
          selectedVariant?._id || process.env.NEXT_PUBLIC_DEFAULT_VARIANT_ID!
        }
        stockNumber={selectedVariant?.stock?.quantity!}
      />
    </div>
  );
};
