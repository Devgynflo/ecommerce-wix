"use client";

import cartImg from "@@/public/cart.png";
import notificationImg from "@@/public/notification.png";
import profileImg from "@@/public/profile.png";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CartModal } from "./cart-modal";

interface NavIconsProps {}

export const NavIcons: NextPage<NavIconsProps> = ({}) => {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  /* TEMP */
  const isLoggedIn = false;

  function handleProfile() {
    if (!isLoggedIn) {
      router.push("/login");
    }

    setIsProfileOpen((prev) => !prev);
  }

  return (
    <div className="relative flex items-center gap-4 xl:gap-6">
      <Image
        alt=""
        src={profileImg}
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={handleProfile}
      />
      {isProfileOpen && (
        <div className="absolute left-0 top-12 z-20 flex flex-col gap-3 rounded-md p-4 text-sm shadow-xl">
          <Link href={"/profile"}>Profile</Link>
          <Link href={"/logout"}>Logout</Link>
        </div>
      )}
      <Image
        alt=""
        src={notificationImg}
        width={22}
        height={22}
        className="cursor-pointer"
      />
      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <Image alt="" src={cartImg} width={22} height={22} />
        <div className="absolute -right-4 -top-4 flex size-6 items-center justify-center rounded-full bg-lama text-sm text-white">
          2
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
};
