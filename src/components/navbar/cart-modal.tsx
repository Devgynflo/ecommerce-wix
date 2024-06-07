"use client";

import { NextPage } from "next";
import Image from "next/image";

interface CartModalProps {}

export const CartModal: NextPage<CartModalProps> = ({}) => {
  const cartItems = true;

  return (
    <div className="absolute right-0 top-12 z-30 flex w-max flex-col gap-6 rounded-md bg-white p-4 shadow-xl">
      {!cartItems ? (
        <div>Cart is empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          <div className="flex flex-col gap-8">
            <div className="flex gap-4">
              <Image
                alt=""
                width={72}
                height={96}
                src={
                  "https://images.pexels.com/photos/19316511/pexels-photo-19316511/free-photo-of-mur-blanc-logo-murs.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
                className="rounded-md object-cover"
              />
              <div className="flex w-full flex-col justify-between">
                <div className="">
                  <div className="flex items-center justify-between gap-8">
                    <h3 className="font-semibold">Product Name</h3>
                    <div className="rounded-sm bg-gray-50 p-1">$49</div>
                  </div>
                  <div className="text-sm text-gray-500">Description</div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Qty: 2</span>
                  <span className="text-blue-500">Remove</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Image
                alt=""
                width={72}
                height={96}
                src={
                  "https://images.pexels.com/photos/19316511/pexels-photo-19316511/free-photo-of-mur-blanc-logo-murs.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
                className="rounded-md object-cover"
              />
              <div className="flex w-full flex-col justify-between">
                <div className="">
                  <div className="flex items-center justify-between gap-8">
                    <h3 className="font-semibold">Product Name</h3>
                    <div className="rounded-sm bg-gray-50 p-1">$49</div>
                  </div>
                  <div className="text-sm text-gray-500">Description</div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Qty: 2</span>
                  <span className="text-blue-500">Remove</span>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="flex items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">$49</span>
            </div>
            <p className="mb-4 mt-2 text-sm text-gray-500">
              Shippin and taxes calculated at checkout.
            </p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md px-4 py-3 ring-1 ring-gray-300">
                View Cart
              </button>
              <button className="rounded-md bg-black px-4 py-3 text-white">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
