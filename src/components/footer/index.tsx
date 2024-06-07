import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import fbImg from "@@/public/facebook.png";
import itImg from "@@/public/instagram.png";
import ptImg from "@@/public/pinterest.png";
import xImg from "@@/public/x.png";
import ytImg from "@@/public/youtube.png";

interface FooterProps {}

export const Footer: NextPage<FooterProps> = ({}) => {
  return (
    <footer className="mt-24 bg-gray-100 px-4 py-24 text-sm md:px-8 xl:px-32 2xl:px-64">
      <div className="flex flex-col justify-between gap-24 md:flex-row">
        <div className="flex w-full flex-col gap-8 md:w-1/2 lg:w-1/4">
          <Link href="/">
            <div className="text-2xl tracking-wide">LAMA</div>
          </Link>
          <p>19 rue pablo Neruda, 69800 Saint Priest</p>
          <span className="font-semibold">gynflo@gmail.com</span>
          <span className="font-semibold">+33768692728</span>
          <div className="flex gap-6">
            <Image src={fbImg} alt="" width={16} height={16} />
            <Image src={itImg} alt="" width={16} height={16} />
            <Image src={ytImg} alt="" width={16} height={16} />
            <Image src={ptImg} alt="" width={16} height={16} />
            <Image src={xImg} alt="" width={16} height={16} />
          </div>
        </div>
        <div className="hidden w-1/2 justify-between lg:flex">
          <div className="flex flex-col justify-between">
            <h3 className="text-lg font-medium uppercase">Company</h3>
            <div className="flex flex-col gap-6">
              <Link href={""}>About Us</Link>
              <Link href={""}>Carreers</Link>
              <Link href={""}>Affilliates</Link>
              <Link href={""}>Blog</Link>
              <Link href={""}>Contact Us</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h3 className="text-lg font-medium uppercase">Shop</h3>
            <div className="flex flex-col gap-6">
              <Link href={""}>New Arrivals</Link>
              <Link href={""}>Accessories</Link>
              <Link href={""}>Men</Link>
              <Link href={""}>Women</Link>
              <Link href={""}>All Products</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h3 className="text-lg font-medium uppercase">Help</h3>
            <div className="flex flex-col gap-6">
              <Link href={""}>Customer Service</Link>
              <Link href={""}>My Account</Link>
              <Link href={""}>Find a Store</Link>
              <Link href={""}>Legal & Privacy</Link>
              <Link href={""}>Gift Card</Link>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-8 md:w-1/2 lg:w-1/4">
          <h2 className="text-lg font-medium uppercase">Subscribe</h2>
          <p>
            Be the first to get the latest news about trneds, promotions, and
            much more!
          </p>
          <div className="flex">
            <input
              type="text"
              placeholder="Email address"
              className="w-3/4 p-4"
            />
            <button className="w-1/4 bg-lama text-white">JOIN</button>
          </div>
          <span>Secure payments</span>
          <div className="flex justify-between">
            <Image src={"/discover.png"} alt="" width={40} height={20} />
            <Image src={"/skrill.png"} alt="" width={40} height={20} />
            <Image src={"/paypal.png"} alt="" width={40} height={20} />
            <Image src={"/mastercard.png"} alt="" width={40} height={20} />
            <Image src={"/visa.png"} alt="" width={40} height={20} />
          </div>
        </div>
      </div>
      <div className="mt-16 flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-lama">Lama Shop</span>
        </div>
        <div>
          <span className="mr-4 text-gray-500">Language</span>
          <span className="font-medium">United States | English</span>
        </div>
        <div>
          <span className="mr-4 text-gray-500">Currency</span>
          <span className="font-medium">$ USD</span>
        </div>
      </div>
    </footer>
  );
};
