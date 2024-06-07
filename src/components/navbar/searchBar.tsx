"use client";

import SearchImg from "@@/public/search.png";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SearchBarProps {}

export const SearchBar: NextPage<SearchBarProps> = ({}) => {
  const router = useRouter();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    if (name) {
      router.push(`/list?name=${name}`);
    }
  }
  return (
    <form
      className="flex flex-1 items-center justify-between gap-4 rounded-md bg-gray-100 p-2"
      onSubmit={handleSearch}
    >
      <input
        name="name"
        type="text"
        placeholder="Search"
        className="flex-1 bg-transparent outline-none"
      />
      <button className="cursor-pointer">
        <Image src={SearchImg} alt="" width={16} height={16} />
      </button>
    </form>
  );
};
