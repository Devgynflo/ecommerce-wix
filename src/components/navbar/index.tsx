import LogoImg from "@@/public/logo.png";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { MenuMobileNavbar } from "./menu-navbar";
import { NavIcons } from "./nav-icons";
import { SearchBar } from "./searchBar";

interface NavbarProps {}

export const Navbar: NextPage<NavbarProps> = ({}) => {
  return (
    <nav className="lg:px16 relative h-20 px-4 md:px-8 xl:px-32 2xl:px-64">
      <div className="flex h-full items-center justify-between md:hidden">
        {/* Mobile Navbar */}
        <Link href="/">
          <div className="text-2xl tracking-wide">LAMA</div>
        </Link>
        <MenuMobileNavbar />
      </div>

      {/* BIGGER SCREENS */}
      <div className="hidden h-full items-center justify-between gap-8 md:flex">
        {/* LEFT */}
        <div className="flex w-1/3 items-center gap-12 xl:w-1/2">
          <Link href={"/"} className="flex items-center gap-3">
            <Image src={LogoImg} alt="" width={24} height={24} />
            <div className="text-2xl tracking-wide">LAMA</div>
          </Link>
          <div className="hidden gap-4 xl:flex">
            <Link href={"/"}>Homepage</Link>
            <Link href={"/"}>Shop</Link>
            <Link href={"/"}>Deals</Link>
            <Link href={"/"}>About</Link>
            <Link href={"/"}>Contact</Link>
          </div>
        </div>
        {/* RIGHT */}
        <div className="xl:w1/2 flex w-2/3 items-center justify-between gap-8">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </nav>
  );
};
